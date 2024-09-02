import {Button, Form, Modal, Table} from "react-bootstrap";
import {useState} from "react";

function RecipeGradeForm({ingredientList, show, setAddRecipeShow}) {
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

    const handleClose = () => setAddRecipeShow(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleIngredientChange = (index, e) => {
        const {name, value} = e.target;
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
                {id: "", amount: 0, unit: ""}
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

    // Updated handleSubmit function to process data for the server API
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Prepare the data in the required JSON format
        const recipeData = {
            name: formData.name,
            description: formData.description,
            imgUri: formData.imgUri,
            ingredients: formData.ingredients.map(ingredient => ({
                id: ingredient.id,
                amount: parseFloat(ingredient.amount), // Ensure amount is a number
                unit: ingredient.unit
            }))
        };

        // Log the JSON object to the console
        console.log("Submitting recipe data:", recipeData);


        // Close the modal after submission
        handleClose();
    };

    return (
        <>
            {/* Set a custom width for the modal */}
            <Modal show={show} onHide={handleClose} dialogClassName="wide-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Přidat nový recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formRecipeName">
                            <Form.Label>Název receptu</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRecipeDescription">
                            <Form.Label>Postup receptu</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </Form.Group>


                        <Form.Label>Ingredience</Form.Label>
                        <Table bordered>
                            <thead>
                            <tr>
                                <th style={{width: '65%'}}>Ingredience</th>
                                <th style={{width: '18%'}}>Množství</th>
                                <th style={{width: '7%'}}>Jednotka</th>
                                <th style={{width: '10%'}}>Akce</th>
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
                                                    <option value="">Žádné ingredience nejsou dostupné</option>
                                                )}
                                            </Form.Control>
                                        </Form.Group>

                                    </td>
                                    <td>
                                        <Form.Group controlId={`formIngredientAmount${index}`}>
                                            <Form.Control
                                                type="number"
                                                name="amount"
                                                value={ingredient.amount}
                                                onChange={(e) => handleIngredientChange(index, e)}
                                            />
                                        </Form.Group>
                                    </td>
                                    <td>
                                        <Form.Group controlId={`formIngredientUnit${index}`}>
                                            <Form.Control
                                                type="text"
                                                name="unit"
                                                value={ingredient.unit}
                                                onChange={(e) => handleIngredientChange(index, e)}
                                            />
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
