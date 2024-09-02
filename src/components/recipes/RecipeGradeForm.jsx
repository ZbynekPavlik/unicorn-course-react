import {Modal} from "react-bootstrap";

function RecipeGradeForm({ ingredientList, show, setAddRecipeShow }) {
    const handleClose = () => setAddRecipeShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Přidat nový recept</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RecipeGradeForm;