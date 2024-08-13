import Recipe from "./Recipe";
import {Col} from "react-bootstrap";
import './RecipeList.css';
import {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {mdiTable, mdiViewGridOutline} from "@mdi/js";
import Icon from "@mdi/react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";

function RecipeList({recipeList}) {

    const [isSmallDetail, setIsSmallDetail] = useState(true);
    const [isBiggerSpacing, setIsBiggerSpacing] = useState(false)
    const [viewType, setViewType] = useState("grid")

    const isGrid = viewType === "grid"


    function getRecipeList(recipeList) {
        return recipeList.map((recipe) => {
            return (
                <Col xs={12} sm={6} md={4} lg={4} key={recipe.id} className={isBiggerSpacing ? "card-bigger-spacing" : "card-spacing"}>
                    <Recipe recipe={recipe} isSmallDetail={isSmallDetail}/>
                </Col>
            );
        });
    }

    return (
        <>

            <Navbar bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Seznam receptů</Navbar.Brand>
                    <Button
                        variant="outline-primary"
                        onClick={() =>
                            setViewType((currentState) => {
                                if (currentState === "grid") return "table";
                                else return "grid";
                            })
                        }
                    >

                        <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline}/>{" "}
                        {isGrid ? "Tabulka" : "Grid"}

                    </Button>
                </div>
            </Navbar>


            {isGrid ? (
                <RecipeGridList recipeList={recipeList} isBiggerSpacing={isBiggerSpacing}
                                isSmallDetail={isSmallDetail}/>
            ) : (
                <RecipeTableList recipeList={recipeList}/>
            )

            }


        </>


    );
}

export default RecipeList;