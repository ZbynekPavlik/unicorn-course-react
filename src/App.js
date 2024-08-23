import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemList from "./components/items/ItemList";
import {useEffect, useState} from "react";
import {mdiAlertOctagonOutline, mdiLoading} from "@mdi/js";
import Icon from "@mdi/react";
import {Outlet, useNavigate} from "react-router-dom";
import {Container, Nav, NavDropdown, Offcanvas} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import {ItemTypeProvider} from "./context/ItemTypeContext";

function App() {
    const [recipeLoadCall, setRecipeLoadCall] = useState({state: "pending"});
    const [recipeList, setRecipeList] = useState([]);
    const [ingredientLoadCall, setIngredientLoadCall] = useState({state: "pending"});
    const [ingredientList, setIngredientList] = useState([]);

    let navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipeLoadCall({state: "error", error: responseJson});
            } else {
                setRecipeLoadCall({state: "success", data: responseJson});
                setRecipeList(responseJson);
            }
        }).catch(error => {
            console.error("Error fetching recipe list:", error);
            setRecipeLoadCall({state: "error", error});
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientLoadCall({state: "error", error: responseJson});
            } else {
                setIngredientLoadCall({state: "success", data: responseJson});
                setIngredientList(responseJson);
            }
        }).catch(error => {
            console.error("Error fetching ingredient list:", error);
            setIngredientLoadCall({state: "error", error});
        });
    }, []);

    let loadCallState;
    if (recipeLoadCall.state === "pending" || ingredientLoadCall.state === "pending") {
        loadCallState = "pending";
    } else if (recipeLoadCall.state === "success" && ingredientLoadCall.state === "success") {
        loadCallState = "success";
    } else {
        loadCallState = "error";
    }

    function getChild() {
        switch (loadCallState) {
            case "pending":
                return (
                    <div className="loading">
                        <Icon size={2} path={mdiLoading} spin={true}/>
                    </div>
                );
            case "success":
                return (
                    <>
                        <ItemList recipeList={recipeList} ingredientList={ingredientList}/>
                        {/*odkaz kvuli pravum na obrazek*/}
                        <a href="http://www.freepik.com">Designed by macrovector / Freepik</a>
                    </>
                );
            case "error":
                return (
                    <div className="error">
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br/>
                        <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }


    function getBookcookListDropdown() {
        switch (loadCallState) {
            case "pending":
                return (
                    <Nav.Link disabled={true}>
                        <Icon size={1} path={mdiLoading} spin={true}/> Item List
                    </Nav.Link>
                );
            case "success":
                return (
                    <NavDropdown title="Select Item" id="navbarScrollingDropdown">
                        {recipeLoadCall.data.map((recipe) => {
                            return (
                                <NavDropdown.Item
                                    key={recipe.id}
                                    onClick={() =>
                                        navigate("/recipeDetail?id=" + recipe.id)
                                    }
                                >
                                    {recipe.name}
                                </NavDropdown.Item>
                            );
                        })}
                    </NavDropdown>
                );
            case "error":
                return (
                    <div>
                        <Icon size={1} path={mdiAlertOctagonOutline}/> Error
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <ItemTypeProvider>


            <div className="App">
                <Navbar
                    fixed="top"
                    expand={"sm"}
                    className="mb-3"
                    bg="dark"
                    variant="dark"
                >
                    <Container fluid>
                        <Navbar.Brand onClick={() => navigate("/")}>
                            Bookcook
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`}/>
                        <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                    Bookcook
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {
                                        //getBookcookListDropdown()
                                    }
                                    <Nav.Link onClick={() => navigate("/recipeList")}>
                                        Recepty
                                    </Nav.Link>
                                    <Nav.Link onClick={() => navigate("/ingredientList")}>
                                        Ingredience
                                    </Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

                <Outlet/>
            </div>


            {
                //getChild()
            }
        </ItemTypeProvider>
    );
}

export default App;