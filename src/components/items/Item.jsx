import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import food from '../../assets/21631.jpg'; // Přizpůsobte cestu k obrázku
import './Item.css';
import Icon from '@mdi/react';
import { mdiSilverwareForkKnife, mdiPencil } from '@mdi/js'; // Import ikony pro tlačítko úpravy
import { ItemTypeContext } from '../../context/ItemTypeContext';
import { ITEM_TYPES } from '../../constants';

function Item({ recipe, ingredientList, isSmallDetail, onEdit }) {
    const { itemType } = useContext(ItemTypeContext);

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

    const ingredientNames = getIngredientNames(recipe.ingredients, ingredientList);

    const truncateDescription = (description, name) => {
        if (description.length > 180 && name.length > 38) {
            return description.slice(0, 180) + '...';
        } else if (description.length > 180) {
            return description.slice(0, 240) + '...';
        } else {
            return description;
        }
    };

    return (
        <Card>
            <Card.Img variant="top" src={food} alt="Obrázek receptu" /> {/* Předpokládám, že obrázek je stejný pro všechny recepty */}
            <Card.Body>
                <Card.Title className="center-text">
                    <Icon path={mdiSilverwareForkKnife} size={1} /> {recipe.name}
                </Card.Title>

                {isSmallDetail && itemType === ITEM_TYPES.RECIPE && (
                    <>
                        <Card.Text className="justify-text truncate-text">
                            {recipe.description}
                        </Card.Text>

                        <ul className="justify-text">
                            {Object.values(ingredientNames).map((name, id) => (
                                <li key={id}>{name}</li>
                            ))}
                        </ul>
                    </>
                )}

                {!isSmallDetail && itemType === ITEM_TYPES.RECIPE && (
                    <Card.Text className="justify-text">
                        {truncateDescription(recipe.description, recipe.name)}
                    </Card.Text>
                )}

                {itemType === ITEM_TYPES.INGREDIENT && (
                    <ul className="justify-text">
                        {Object.values(ingredientNames).map((name, id) => (
                            <li key={id}>{name}</li>
                        ))}
                    </ul>
                )}

                <Button variant="primary" className="center-button">
                    Více o receptu
                </Button>
                {/* Přidání tlačítka pro úpravu */}
                <Button variant="secondary" className="mt-2" onClick={() => onEdit(recipe)}>
                    <Icon path={mdiPencil} size={1} /> Upravit
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Item;
