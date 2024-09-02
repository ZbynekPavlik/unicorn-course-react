import React, {useContext, useEffect, useMemo, useState} from 'react';
import './ItemList.css';
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {
    mdiArrowCollapseVertical,
    mdiArrowExpandVertical,
    mdiMagnify,
    mdiMagnifyMinusOutline,
    mdiMagnifyPlusOutline, mdiPlus,
    mdiTable,
    mdiViewGridOutline
} from "@mdi/js";
import Icon from "@mdi/react";
import ItemGridList from "./ItemGridList";
import RecipeTableList from "./ItemTableList";
import Form from "react-bootstrap/Form"
import {ITEM_TYPES, LAYOUT_TYPES} from "../../constants";
import {ItemTypeContext} from "../../context/ItemTypeContext";
import RecipeGradeForm from "../recipes/RecipeGradeForm";
import {AlertContext} from "../../context/AlertContext";
import {Alert} from "react-bootstrap";


function ItemList({recipeList, ingredientList, reloadRecipes }) {


    const [isSmallDetail, setIsSmallDetail] = useState(false);
    const [isBiggerSpacing, setIsBiggerSpacing] = useState(false);
    const [viewType, setViewType] = useState(LAYOUT_TYPES.GRID);
    const [searchBy, setSearchBy] = useState("");
    const [addRecipeShow, setAddRecipeShow] = useState(false);

    const { alertMessage, setAlertMessage, showAlert, setShowAlert } = useContext(AlertContext);
    const { itemType } = useContext(ItemTypeContext);

    const handleAddRecipeShow = () => setAddRecipeShow(true);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const isGrid = viewType === LAYOUT_TYPES.GRID;

    const filteredItemList = useMemo(() => {
        if (itemType === ITEM_TYPES.RECIPE) {
            return recipeList.filter((item) => {
                return (
                    item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase()) ||
                    item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
                );
            });
        } else if (itemType === ITEM_TYPES.INGREDIENT) {
            return recipeList.filter((item) => {
                return item.name.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase());
            });
        }
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



            <Navbar collapseOnSelect expand="sm" bg="light">
                <div className="container-fluid">
                    {itemType === ITEM_TYPES.RECIPE && <Navbar.Brand>Seznam receptů</Navbar.Brand>}
                    {itemType === ITEM_TYPES.INGREDIENT && <Navbar.Brand>Seznam ingrediencí</Navbar.Brand>}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse style={{justifyContent: "right"}}>

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
                            {isGrid && itemType === ITEM_TYPES.RECIPE && (
                                <div className="me-2">
                                    <Button
                                        className={"d-none d-md-block"}
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
                                    className={"d-none d-md-block"}
                                    variant="outline-primary"
                                    onClick={() =>
                                        setViewType((currentState) => (currentState === "grid" ? "table" : "grid"))
                                    }
                                >
                                    <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline}/>{" "}
                                    {isGrid ? "Tabulka" : "Grid"}
                                </Button>

                            </div>

                            {itemType === ITEM_TYPES.RECIPE &&
                                <Button
                                    style={{ float: "right" }}
                                    variant="secondary"
                                    className="btn btn-success btn-sm"
                                    onClick={handleAddRecipeShow}
                                >
                                    <Icon path={mdiPlus} size={1} />
                                    Přidat recept
                                </Button>
                            }


                        </div>


                    </Navbar.Collapse>

                </div>
            </Navbar>


            {/* Alert component to display the message */}
            {showAlert && (
                <Alert
                    variant="info"
                    onClose={() => setShowAlert(false)} // Hide alert on close
                    dismissible
                    className="text-center" // React Bootstrap utility class to center-align text
                >
                    {alertMessage}
                </Alert>
            )}


            {addRecipeShow && (
                <RecipeGradeForm
                    ingredientList={ingredientList}
                    show={addRecipeShow}
                    setAddRecipeShow={setAddRecipeShow}
                    reloadRecipes={reloadRecipes}  // Pass the callback to RecipeGradeForm
                />
            )}

            <div>
                {filteredItemList.length ? (
                    isGrid ? (
                        <ItemGridList recipeList={filteredItemList} ingredientList={ingredientList}
                                      isBiggerSpacing={isBiggerSpacing}
                                      isSmallDetail={isSmallDetail}/>
                    ) : (
                        <RecipeTableList recipeList={filteredItemList} ingredientList={ingredientList}/>
                    )
                ) : (
                    <div style={{margin: "16px auto", textAlign: "center"}}>
                        Nejsou žádné recepty ke zobrazení
                    </div>
                )}
            </div>


        </>


    )

}

export default ItemList;