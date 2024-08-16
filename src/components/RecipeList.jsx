import React, {useMemo, useState} from 'react';
import './RecipeList.css';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {
    mdiArrowCollapseVertical,
    mdiArrowExpandVertical,
    mdiMagnify,
    mdiMagnifyMinusOutline,
    mdiMagnifyPlusOutline,
    mdiTable,
    mdiViewGridOutline
} from "@mdi/js";
import Icon from "@mdi/react";
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";
import Form from "react-bootstrap/Form"

const GRID = "grid"




function RecipeList({recipeList, ingredientList}) {

    const [isSmallDetail, setIsSmallDetail] = useState(false);
    const [isBiggerSpacing, setIsBiggerSpacing] = useState(false)
    const [viewType, setViewType] = useState(GRID)
    const [searchBy, setSearchBy] = useState("");



    const isGrid = viewType === GRID

    const filteredRecipeList = useMemo(() => {
        return recipeList.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy, recipeList]);


    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }


    return (
        <>

            <Navbar bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Seznam receptů</Navbar.Brand>


                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            id={"searchInput"}
                            style={{maxWidth: "500px"}}
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                            onChange={handleSearchDelete}
                        />
                        <Button
                            style={{marginRight: "8px"}}
                            variant="outline-success"
                            type="submit"
                        >
                            <Icon size={1} path={mdiMagnify}/>
                        </Button>
                    </Form>


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
                <RecipeGridList recipeList={filteredRecipeList} ingredientList={ingredientList}
                                isBiggerSpacing={isBiggerSpacing}
                                isSmallDetail={isSmallDetail}/>
            ) : (
                <RecipeTableList recipeList={filteredRecipeList}/>
            )
            }


        </>


    );
}

export default RecipeList;