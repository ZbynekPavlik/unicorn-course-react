import React, { useContext, useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { AlertContext } from '../../context/AlertContext';

function RecipeGradeForm({ ingredientList, show, setAddRecipeShow, reloadRecipes, recipeData }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        imgUri: '',
        ingredients: [{ id: '', amount: 0, unit: '' }]
    });
    const [validated, setValidated] = useState(false);
    const { setAlertMessage, setShowAlert } = useContext(AlertContext);

    useEffect(() => {
        if (recipeData) {
            setFormData({
                ...recipeData
            });
        } else {
            setFormData({
                id: '',
                name: '',
                description: '',
                imgUri: '',
                ingredients: [{ id: '', amount: 0, unit: '' }]
            });
        }
    }, [recipeData]);

    const handleClose = () => setAddRecipeShow(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const newIngredients = [...formData.ingredients];
        newIngredients[index][name] = value;
        setFormData({
            ...formData,
            ingredients: newIngredients
        });
    };

    const addIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [
                ...formData.ingredients,
                { id: '', amount: 0, unit: '' }
            ]
        });
    };

    const removeIngredient = (index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            ingredients: newIngredients
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        try {
            if (formData.id) {
                // Update existing recipe
                const response = await axios.post(`http://localhost:3000/recipe/update`, formData);
                if (response.status === 200) {
                    console.log("Recipe successfully updated:", response.data);
                    setAlertMessage("Recept byl úspěšně aktualizován!");
                }
            } else {
                // Create new recipe
                const response = await axios.post('http://localhost:3000/recipe/create', formData);
                if (response.status === 200 || response.status === 201) {
                    console.log("Recipe successfully created:", response.data);
                    setAlertMessage("Recept byl úspěšně vytvořen!");
                }
            }

            setShowAlert(true);
            setValidated(false);
            handleClose();
            reloadRecipes(); // Call reloadRecipes after successful recipe creation/update
        } catch (error) {
            console.error("Error creating/updating recipe:", error);
            setAlertMessage("Při vytváření/aktualizaci receptu došlo k chybě. Více informací v konzoli prohlížeče.");
            setShowAlert(true);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="wide-modal">
            <Modal.Header closeButton>
                <Modal.Title>{formData.id ? 'Upravit recept' : 'Přidat nový recept'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Název</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Prosím, zadejte název receptu.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formDescription">
                        <Form.Label>Popis</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Prosím, zadejte popis receptu.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formImgUri">
                        <Form.Label>Obrázek</Form.Label>
                        <Form.Control
                            type="text"
                            name="imgUri"
                            value={formData.imgUri}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Label>Suroviny</Form.Label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="ingredient-row">
                            <Form.Group controlId={`ingredientId${index}`}>
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id"
                                    value={ingredient.id}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                >
                                    <option value="">Vyberte surovinu</option>
                                    {ingredientList.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId={`ingredientAmount${index}`}>
                                <Form.Label>Množství</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={ingredient.amount}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                />
                            </Form.Group>

                            <Form.Group controlId={`ingredientUnit${index}`}>
                                <Form.Label>Jednotka</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="unit"
                                    value={ingredient.unit}
                                    onChange={(e) => handleIngredientChange(index, e)}
                                />
                            </Form.Group>

                            <Button variant="danger" onClick={() => removeIngredient(index)}>
                                Odebrat
                            </Button>
                        </div>
                    ))}

                    <Button variant="secondary" onClick={addIngredient}>
                        Přidat surovinu
                    </Button>

                    <Button variant="primary" type="submit">
                        Uložit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RecipeGradeForm;
