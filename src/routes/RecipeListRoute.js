import {useContext, useEffect} from "react";
import {ItemTypeContext} from "../context/ItemTypeContext";
import {ITEM_TYPES} from '../constants';
import ItemLoader from "../components/items/ItemLoader";

function RecipeListRoute() {

    const {setItemType} = useContext(ItemTypeContext);

    useEffect(() => {
        setItemType(ITEM_TYPES.RECIPE);
    }, []);

    return (
        <ItemLoader/>
    );
}

export default RecipeListRoute;