import React from "react";
import Table from "react-bootstrap/Table";
import {Container} from "react-bootstrap";

function StudentTableList({recipeList}) {
    return (

        <Container>


            <Table>
                <thead>
                <tr>
                    <th>ID recept</th>
                    <th>Název</th>
                    <th>Popis</th>
                </tr>
                </thead>
                <tbody>
                {recipeList.map((recipe) => {
                    return (
                        <tr key={recipe.id}>
                            <td>{recipe.id}</td>
                            <td>{recipe.name}</td>
                            <td>{recipe.description}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>

        </Container>
    );
}

export default StudentTableList;