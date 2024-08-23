import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import ItemList from "./ItemList";

function ItemLoader() {
    const [recipeLoadCall, setRecipeLoadCall] = useState({state: "pending"});
    const [recipeList, setRecipeList] = useState([]);
    const [ingredientLoadCall, setIngredientLoadCall] = useState({state: "pending"});
    const [ingredientList, setIngredientList] = useState([]);


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

    return (
        <>
            {getChild()}
        </>
    );

}

export default ItemLoader;