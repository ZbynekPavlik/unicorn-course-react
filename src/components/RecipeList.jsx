import Recipe from "./Recipe";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecipeList.css'; // Import the CSS file

function RecipeList(props) {
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return (
                <Col xs={12} sm={6} md={4} lg={4} key={recipe.name} className="card-spacing">
                    <Recipe recipe={recipe} />
                </Col>
            );
        });
    }

    return (
        <Container>
            <Row>
                {getRecipeList(props.recipeList)}
            </Row>
        </Container>
    );
}

export default RecipeList;