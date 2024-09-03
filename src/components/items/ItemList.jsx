import React, {useContext, useEffect, useMemo, useState} from 'react';
import './ItemList.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {
    mdiAccount,
    mdiArrowCollapseVertical,
    mdiArrowExpandVertical,
    mdiMagnify,
    mdiMagnifyMinusOutline,
    mdiMagnifyPlusOutline,
    mdiPlus,
    mdiTable,
    mdiViewGridOutline
} from '@mdi/js';
import Icon from '@mdi/react';
import ItemGridList from './ItemGridList';
import RecipeTableList from './ItemTableList';
import {ITEM_TYPES, LAYOUT_TYPES} from '../../constants';
import {ItemTypeContext} from '../../context/ItemTypeContext';
import RecipeGradeForm from '../recipes/RecipeGradeForm';
import {AlertContext} from '../../context/AlertContext';
import {UserContext} from "../../context/UserProvider";

function ItemList({recipeList, ingredientList, reloadRecipes}) {
    const [isSmallDetail, setIsSmallDetail] = useState(false);
    const [isBiggerSpacing, setIsBiggerSpacing] = useState(false);
    const [viewType, setViewType] = useState(LAYOUT_TYPES.GRID);
    const [searchBy, setSearchBy] = useState('');
    const [addRecipeShow, setAddRecipeShow] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const {alertMessage, setAlertMessage, showAlert, setShowAlert} = useContext(AlertContext);
    const {itemType} = useContext(ItemTypeContext);
    const {isAuthorized, setIsAuthorized} = useContext(UserContext);

    const handleAddRecipeShow = () => {
        setSelectedRecipe(null); // Ensure we are adding a new recipe
        setAddRecipeShow(true);
    };

    const handleEditRecipe = (recipe) => {
        setSelectedRecipe(recipe); // Set the recipe to edit
        setAddRecipeShow(true);
    };

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
                    item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchBy.toLowerCase())
                );
            });
        } else if (itemType === ITEM_TYPES.INGREDIENT) {
            return recipeList.filter((item) => {
                return item.name.toLowerCase().includes(searchBy.toLowerCase());
            });
        }
    }, [searchBy, recipeList, itemType]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target['searchInput'].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy('');
    }

    const toggleAuthorization = () => {
        setIsAuthorized(prevState => !prevState);
    };

    return (
        <>
            <Navbar collapseOnSelect expand="sm" bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>
                        {itemType === ITEM_TYPES.RECIPE && 'Seznam receptů'}
                        {itemType === ITEM_TYPES.INGREDIENT && 'Seznam ingrediencí'}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse style={{justifyContent: 'right'}}>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                id="searchInput"
                                style={{maxWidth: '500px'}}
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                                onChange={handleSearchDelete}
                            />
                            <Button
                                style={{marginRight: '8px'}}
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
                                        className="d-none d-md-block"
                                        variant="outline-primary"
                                        onClick={() => setIsSmallDetail((currentState) => !currentState)}
                                    >
                                        <Icon size={1}
                                              path={isSmallDetail ? mdiMagnifyPlusOutline : mdiMagnifyMinusOutline}/> {isSmallDetail ? 'Více textu' : 'Méně textu'}
                                    </Button>
                                </div>
                            )}
                            {isGrid && (
                                <div className="me-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => setIsBiggerSpacing((currentState) => !currentState)}
                                    >
                                        <Icon size={1}
                                              path={isBiggerSpacing ? mdiArrowCollapseVertical : mdiArrowExpandVertical}/> {isBiggerSpacing ? 'Zmenšit odsazení' : 'Zvětšit odsazení'}
                                    </Button>
                                </div>
                            )}

                            <div className="me-2">
                                <Button
                                    className="d-none d-md-block"
                                    variant="outline-primary"
                                    onClick={() => setViewType((currentState) => (currentState === LAYOUT_TYPES.GRID ? LAYOUT_TYPES.TABLE : LAYOUT_TYPES.GRID))}
                                >
                                    <Icon size={1}
                                          path={isGrid ? mdiTable : mdiViewGridOutline}/> {isGrid ? 'Tabulka' : 'Grid'}
                                </Button>
                            </div>

                            {itemType === ITEM_TYPES.RECIPE && isAuthorized && (
                                <Button
                                    style={{float: 'right'}}
                                    variant="secondary"
                                    className="btn btn-success btn-sm"
                                    onClick={handleAddRecipeShow}
                                >
                                    <Icon path={mdiPlus} size={1}/> Přidat recept
                                </Button>
                            )}

                            {/* Add authorization toggle button */}
                            <div className="ms-2">
                                <Button
                                    variant="outline-secondary"
                                    onClick={toggleAuthorization}
                                >
                                    <Icon size={1} path={mdiAccount}/>
                                    {isAuthorized ? 'Odhlásit se' : 'Přihlásit se'}
                                </Button>
                            </div>
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
                    className="fixed-alert text-center"
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
                    recipeData={selectedRecipe} // Pass the selectedRecipe for editing
                />
            )}

            <div>
                {filteredItemList.length ? (
                    isGrid ? (
                        <ItemGridList
                            recipeList={filteredItemList}
                            ingredientList={ingredientList}
                            isBiggerSpacing={isBiggerSpacing}
                            isSmallDetail={isSmallDetail}
                            onEdit={handleEditRecipe} // Pass edit handler to ItemGridList
                        />
                    ) : (
                        <RecipeTableList
                            recipeList={filteredItemList}
                            ingredientList={ingredientList}
                            onEdit={handleEditRecipe} // Pass edit handler to RecipeTableList
                        />
                    )
                ) : (
                    <div style={{margin: '16px auto', textAlign: 'center'}}>
                        Nejsou žádné recepty ke zobrazení
                    </div>
                )}
            </div>
        </>
    );
}

export default ItemList;
