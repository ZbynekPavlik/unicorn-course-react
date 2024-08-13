import './RecipeList.css';
import {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {
    mdiArrowCollapseVertical,
    mdiArrowExpandVertical,
    mdiMagnifyMinusOutline,
    mdiMagnifyPlusOutline,
    mdiTable,
    mdiViewGridOutline
} from "@mdi/js";
import Icon from "@mdi/react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";

function RecipeList({recipeList}) {

    const [isSmallDetail, setIsSmallDetail] = useState(false);
    const [isBiggerSpacing, setIsBiggerSpacing] = useState(false)
    const [viewType, setViewType] = useState("grid")

    const isGrid = viewType === "grid"

    return (
        <>

            <Navbar bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Seznam receptů</Navbar.Brand>
                    <div className="d-flex ms-auto">
                        {isGrid && (
                            <div className="me-2">
                                <Button
                                    variant="outline-primary"
                                    onClick={() =>
                                        setIsSmallDetail((currentState) => !currentState)
                                    }
                                >
                                    <Icon size={1}
                                          path={isSmallDetail ? mdiMagnifyPlusOutline : mdiMagnifyMinusOutline}/>{" "}
                                    {isSmallDetail ? "Více textu" : "Méně textu"}
                                </Button>
                            </div>
                        )}
                        {isGrid && (
                            <div className="me-2">
                                <Button
                                    variant="outline-primary"
                                    onClick={() =>
                                        setIsBiggerSpacing((currentState) => !currentState)
                                    }
                                >
                                    <Icon size={1}
                                          path={isBiggerSpacing ? mdiArrowCollapseVertical : mdiArrowExpandVertical}/>{" "}
                                    {isBiggerSpacing ? "Zmenšit odsazení" : "Zvětšit odsazení"}
                                </Button>
                            </div>
                        )}
                        <div className="me-2">
                            <Button
                                variant="outline-primary"
                                onClick={() =>
                                    setViewType((currentState) => (currentState === "grid" ? "table" : "grid"))
                                }
                            >
                                <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline}/>{" "}
                                {isGrid ? "Tabulka" : "Grid"}
                            </Button>
                        </div>
                    </div>
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