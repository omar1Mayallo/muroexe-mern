import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllCategories} from "../../RTK/slices/categoriesSlice";
import ShopHook from "./shopHook";

const SideFilterHook = () => {
  const [
    productItems,
    pagination,
    results,
    loading,
    error,
    onPress,
    getProducts,
  ] = ShopHook();

  const dispatch = useDispatch();

  //Category Filter
  useEffect(() => {
    dispatch(getAllCategories);
  }, [dispatch]);

  const {allCategories} = useSelector((state) => state.categories);

  let categories;
  if (allCategories.data) {
    categories = allCategories.data.docs;
  }

  var categoryQuery = "";
  const [categoriesChecked, setCategoriesChecked] = useState([]);

  const onClickCategory = (e) => {
    let value = e.target.value;
    if (value === "0") {
      //For [All] Checkbox
      setCategoriesChecked([]);
    } else {
      if (e.target.checked === true) {
        setCategoriesChecked([...categoriesChecked, value]);
      } else if (e.target.checked === false) {
        const newArr = categoriesChecked.filter((e) => e !== value);
        setCategoriesChecked(newArr);
      }
    }
  };
  useEffect(() => {
    categoryQuery = categoriesChecked.map((val) => "category=" + val).join("&");
    localStorage.setItem("categoriesChecked", categoryQuery);
    getProducts();
  }, [categoriesChecked]);

  //Price Filter
  const [priceValTo, setPriceValTo] = useState(0);
  const priceTo = (e) => {
    localStorage.setItem("priceTo", e.target.value);
    setPriceValTo(e.target.value);
  };

  useEffect(() => {
    getProducts();
  }, [priceValTo]);

  return [priceTo, categories, onClickCategory, getProducts];
};

export default SideFilterHook;
