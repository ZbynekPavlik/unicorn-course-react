import React from "react";
import Recipe from "./Recipe";
import {Col, Container, Row} from "react-bootstrap";

function RecipeGridList({recipeList, isBiggerSpacing, isSmallDetail}) {
    return (
        <Container>
            <Row>
                {recipeList.map((recipe) => (
                    <Col xs={12} sm={6} md={4} lg={4} key={recipe.id}
                         className={isBiggerSpacing ? "card-bigger-spacing" : "card-spacing"}>
                        <Recipe recipe={recipe} isSmallDetail={isSmallDetail}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default RecipeGridList;
