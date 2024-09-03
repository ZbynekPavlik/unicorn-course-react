import React, {useContext} from "react";
import Table from "react-bootstrap/Table";
import {Button, Container} from "react-bootstrap";
import {ItemTypeContext} from "../../context/ItemTypeContext";
import {ITEM_TYPES} from "../../constants";
import {UserContext} from "../../context/UserProvider";

function ItemTableList({recipeList, ingredientList, onEdit}) { // Add onEdit prop

    const {itemType} = useContext(ItemTypeContext);

    const {isAuthorized} = useContext(UserContext);


    const getIngredientNames = (recipeIngredients, ingredientList) => {
        const ingredientNames = {};
        recipeIngredients.forEach(ingredient => {
            const matchedIngredient = ingredientList.find(item => item.id === ingredient.id);
            if (matchedIngredient) {
                ingredientNames[ingredient.id] = matchedIngredient.name;
            }
        });
        return ingredientNames;
    };

    function getIngredientNamesString(recipeIngredients, ingredientList) {
        const ingredientNames = recipeIngredients.map(ingredient => {
            const matchedIngredient = ingredientList.find(item => item.id === ingredient.id);
            return matchedIngredient ? matchedIngredient.name : '';
        });
        return ingredientNames.filter(name => name).join(', ');
    }

    return (
        <Container>
            {itemType === ITEM_TYPES.RECIPE && (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID recept</th>
                        <th>Název</th>
                        <th>Popis</th>

                        {isAuthorized === true &&
                            <th>Akce</th>
                        }

                    </tr>
                    </thead>
                    <tbody>
                    {recipeList.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{recipe.id}</td>
                            <td>{recipe.name}</td>
                            <td>{recipe.description}</td>
                            {isAuthorized === true &&
                                <td>
                                    <Button
                                        variant="secondary"
                                        onClick={() => onEdit(recipe)}
                                    >
                                        Upravit
                                    </Button>
                                </td>
                            }

                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}

            {itemType === ITEM_TYPES.INGREDIENT && (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID ingredience</th>
                        <th>Název</th>
                        <th>Ingredience</th>
                    </tr>
                    </thead>
                    <tbody>
                    {recipeList.map((recipe) => (
                        <tr key={recipe.id}>
                            <td>{recipe.id}</td>
                            <td>{recipe.name}</td>
                            <td>{getIngredientNamesString(recipe.ingredients, ingredientList)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default ItemTableList;
