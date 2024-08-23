import {useContext, useEffect} from "react";
import {ItemTypeContext} from "../context/ItemTypeContext";
import {ITEM_TYPES} from "../constants";
import ItemLoader from "../components/items/ItemLoader";


function IngredientListRoute() {
    const {itemType, setItemType} = useContext(ItemTypeContext);

    useEffect(() => {
        setItemType(ITEM_TYPES.INGREDIENT);
    }, []);

    //console.log(itemType);
    return (
        <ItemLoader/>
    );
}

export default IngredientListRoute;