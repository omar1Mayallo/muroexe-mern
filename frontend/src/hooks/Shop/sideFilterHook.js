import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllBrands} from "../../RTK/slices/brandsSlice";
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

  //Category&Brand Filter
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, []);

  const {allCategories} = useSelector((state) => state.categories);
  const {allBrands} = useSelector((state) => state.brands);
  let categories;
  if (allCategories.data) {
    categories = allCategories.data.docs;
  }
  let brands;
  if (allBrands.data) {
    brands = allBrands.data.docs;
  }

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
    let categoryQuery = categoriesChecked
      .map((val) => "category=" + val)
      .join("&");
    localStorage.setItem("categoriesChecked", categoryQuery);
    getProducts();
  }, [categoriesChecked]);

  /////////////////////////////////////////////////////////////////
  const [brandsChecked, setBrandsChecked] = useState([]);
  const onClickBrand = (e) => {
    let value = e.target.value;
    if (value === "0") {
      //For [All] Checkbox
      setBrandsChecked([]);
    } else {
      if (e.target.checked === true) {
        setBrandsChecked([...brandsChecked, value]);
      } else if (e.target.checked === false) {
        const newArr = brandsChecked.filter((e) => e !== value);
        setBrandsChecked(newArr);
      }
    }
  };
  useEffect(() => {
    let brandQuery = brandsChecked.map((val) => "brand=" + val).join("&");
    localStorage.setItem("brandsChecked", brandQuery);
    getProducts();
  }, [brandsChecked]);

  //Build RatingAvr to localStorage
  const [ratingChecked, setRatingChecked] = useState([]);
  const onClickRating = (e) => {
    let value = e.target.value;
    if (value === "0") {
      //For [All] Checkbox
      setRatingChecked([]);
    } else {
      if (e.target.checked === true) {
        setRatingChecked([...ratingChecked, value]);
      } else if (e.target.checked === false) {
        const newArr = ratingChecked.filter((e) => e !== value);
        setRatingChecked(newArr);
      }
    }
  };
  useEffect(() => {
    let ratingQuery = ratingChecked.map((val) => "ratingAvr=" + val).join("&");
    localStorage.setItem("ratingAverage", ratingQuery);
    getProducts();
  }, [ratingChecked]);

  //Price Filter
  const [priceValTo, setPriceValTo] = useState(0);
  const priceTo = (e) => {
    localStorage.setItem("priceTo", e.target.value);
    setPriceValTo(e.target.value);
  };

  useEffect(() => {
    getProducts();
  }, [priceValTo]);

  return [
    priceTo,
    categories,
    onClickCategory,
    brands,
    onClickBrand,
    onClickRating,
  ];
};

export default SideFilterHook;
