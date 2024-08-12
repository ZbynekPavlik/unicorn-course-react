import Recipe from "./Recipe";
import {Container, Row, Col} from "react-bootstrap";
import './RecipeList.css';

function RecipeList(props) {
    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return (
                <Col xs={12} sm={6} md={4} lg={4} key={recipe.id} className={props.isBiggerSpacing ? "card-bigger-spacing" : "card-spacing" }>
                    <Recipe recipe={recipe}/>
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