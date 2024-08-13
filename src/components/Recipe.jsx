import {Button, Card} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import food from '../assets/21631.jpg';
import './Recipe.css';

import Icon from '@mdi/react';
import {mdiSilverwareForkKnife} from '@mdi/js';


function Recipe({recipe, isSmallDetail}) {


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
            <Card.Img variant="top" src={food}/>
            <Card.Body>
                <Card.Title className="center-text"><Icon path={mdiSilverwareForkKnife} size={1}/> {recipe.name}
                </Card.Title>

                {isSmallDetail &&
                    <Card.Text className="justify-text truncate-text">
                        {recipe.description}
                    </Card.Text>
                }

                {!isSmallDetail &&
                    <Card.Text className="justify-text">
                        {truncateDescription(recipe.description, recipe.name)}
                    </Card.Text>
                }

                <Button variant="primary" className="center-button">Více o receptu</Button>
            </Card.Body>
        </Card>
    );
}

export default Recipe;