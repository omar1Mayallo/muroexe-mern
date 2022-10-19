import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getACategory} from "../../RTK/slices/categoriesSlice";
import {getAllProductsCategory} from "../../RTK/slices/productsSlice";
const CategoryHook = () => {
  const dispatch = useDispatch();
  const {id} = useParams();

  const getProducts = () => {
    sortData();
    dispatch(getAllProductsCategory(`category=${id}&sort=${sort}`));
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  useEffect(() => {
    dispatch(getACategory(id));
  }, [dispatch, id]);

  const {categoryInfo, loading, error} = useSelector(
    (state) => state.categories.category
  );
  let categoryItem;
  if (loading === false) {
    if (categoryInfo !== []) {
      if (categoryInfo.data) {
        categoryItem = categoryInfo.data.doc;
      }
    }
    if (error) {
      console.log(error);
    }
  }

  const allProductsCategory = useSelector(
    (state) => state.products.allProductsCategory
  );

  const prodLoading = allProductsCategory.loading;
  const prodError = allProductsCategory.error;
  //PRODUCTS_ITEMS
  let productItems = [],
    results = 0;
  if (prodLoading === false) {
    if (allProductsCategory.productsCategory !== []) {
      if (allProductsCategory.productsCategory.data) {
        productItems = allProductsCategory.productsCategory.data.docs;
      }
      if (allProductsCategory.productsCategory.results) {
        results = allProductsCategory.productsCategory.results;
      }
    }
  }

  //SORTING
  let sortType = "",
    sort;
  const sortData = () => {
    if (localStorage.getItem("sortTypeForCatPg") !== null) {
      sortType = localStorage.getItem("sortTypeForCatPg");
    } else {
      sortType = "";
    }

    if (sortType === "Price low to high") {
      sort = "+price";
    } else if (sortType === "Price high to low") {
      sort = "-price";
    } else if (sortType === "Alphabetical") {
      sort = "name";
    } else if (sortType === "Rating Low to high") {
      sort = "+ratingAvr";
    } else if (sortType === "Rating high to low") {
      sort = "-ratingAvr";
    } else if (sortType === "") {
      sort = "";
    }
  };

  return [
    categoryItem,
    error,
    loading,
    getProducts,
    prodLoading,
    prodError,
    productItems,
    results,
  ];
};

export default CategoryHook;
