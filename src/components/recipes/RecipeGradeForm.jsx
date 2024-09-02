import { Button, Form, Modal, Table, Alert } from "react-bootstrap"; // Import Alert component
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import {AlertContext} from "../../context/AlertContext";


function  RecipeGradeForm({ ingredientList, show, setAddRecipeShow, reloadRecipes }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imgUri: "",
        ingredients: [
            {
                id: "",
                amount: 0,
                unit: ""
            }
        ]
    });

    const [validated, setValidated] = useState(false);

    const { setAlertMessage, setShowAlert } = useContext(AlertContext);

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
                { id: "", amount: 0, unit: "" }
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

        const recipeData = {
            name: formData.name,
            description: formData.description,
            imgUri: formData.imgUri,
            ingredients: formData.ingredients.map((ingredient) => ({
                id: ingredient.id,
                amount: parseFloat(ingredient.amount),
                unit: ingredient.unit
            }))
        };

        try {
            const response = await axios.post('http://localhost:3000/recipe/create', recipeData);

            if (response.status === 200 || response.status === 201) {
                console.log("Recipe successfully created:", response.data);
                setAlertMessage("Recept byl úspěšně vytvořen!");
                setShowAlert(true);
                setValidated(false);
                handleClose();

                reloadRecipes(); // Call reloadRecipes after successful recipe creation
            } else {
                console.error("Failed to create recipe. Response:", response);
                setAlertMessage("Recept se nepodařilo vytvořit. Více informací v konzoli prohlížeče.");
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error creating recipe:", error);
            setAlertMessage("Při vytváření receptu došlo k chybě. Více informací v konzoli prohlížeče.");
            setShowAlert(true);
        }
    };

    return (
        <>


            {/* Set a custom width for the modal */}
            <Modal show={show} onHide={handleClose} dialogClassName="wide-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Přidat nový recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add noValidate to disable native HTML validation and manage it manually */}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formRecipeName">
                            <Form.Label>Název receptu</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required // HTML Validator: required
                            />
                            <Form.Control.Feedback type="invalid">
                                Název receptu je povinný.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formRecipeDescription">
                            <Form.Label>Postup receptu</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                maxLength={800} // HTML Validator: maxLength
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Zadejte popis s maximální délkou 800 znaků.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label>Ingredience</Form.Label>
                        <Table bordered>
                            <thead>
                            <tr>
                                <th style={{ width: "65%" }}>Ingredience</th>
                                <th style={{ width: "15%" }}>Množství</th>
                                <th style={{ width: "10%" }}>Jednotka</th>
                                <th style={{ width: "10%" }}>Akce</th>
                            </tr>
                            </thead>
                            <tbody>
                            {formData.ingredients.map((ingredient, index) => (
                                <tr key={index}>
                                    <td>
                                        <Form.Group controlId={`formIngredientId${index}`}>
                                            <Form.Control
                                                as="select"
                                                name="id"
                                                value={ingredient.id}
                                                onChange={(e) => handleIngredientChange(index, e)}
                                                required // HTML Validator: required
                                            >
                                                {/* Default option prompting the user to select an ingredient */}
                                                <option value="" disabled>
                                                    Vyberte ingredienci
                                                </option>
                                                {ingredientList.length > 0 ? (
                                                    ingredientList.map((ing) => (
                                                        <option key={ing.id} value={ing.id}>
                                                            {ing.name}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">
                                                        Žádné ingredience nejsou dostupné
                                                    </option>
                                                )}
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Vyberte ingredienci.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId={`formIngredientAmount${index}`}>
                                            <Form.Control
                                                type="number"
                                                name="amount"
                                                value={ingredient.amount}
                                                onChange={(e) => handleIngredientChange(index, e)}
                                                min={1} // HTML Validator: min
                                                max={1000} // HTML Validator: max
                                                required // HTML Validator: required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Zadejte množství mezi 1 a 1000.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId={`formIngredientUnit${index}`}>
                                            <Form.Control
                                                type="text"
                                                name="unit"
                                                value={ingredient.unit}
                                                onChange={(e) => handleIngredientChange(index, e)}
                                                maxLength={10}
                                                required // HTML Validator: required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Zadejte jednotku o maximální délce 10 znaků.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => removeIngredient(index)}>
                                            Smazat
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button variant="primary" onClick={addIngredient} className="mb-3">
                            Přidat další ingredienci
                        </Button>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Zavřít
                            </Button>
                            <Button variant="primary" type="submit">
                                Uložit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RecipeGradeForm;
