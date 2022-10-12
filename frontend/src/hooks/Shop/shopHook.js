import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProductsShop} from "../../RTK/slices/productsSlice";

const ShopHook = () => {
  let limit = 9;
  const dispatch = useDispatch();
  const getProducts = () => {
    getQueriesStorage();
    sortData();
    dispatch(
      getAllProductsShop(
        `sort=${sort}&limit=${limit}&keyword=${word}&price[gt]=0${priceToQuery}&${catQuery}`
      )
    );
  };
  // dispatch(getAllProductsShop(`sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${brandCat}${priceFromString}${priceToString}`));
  useEffect(() => {
    getProducts();
  }, []);

  const {loading, error, productsShop} = useSelector(
    (state) => state.products.allProductsShop
  );
  //PRODUCTS_ITEMS
  let productItems = [],
    pagination = 0,
    results = 0;
  if (loading === false) {
    if (productsShop !== []) {
      if (productsShop.data) {
        productItems = productsShop.data.docs;
      }
      if (productsShop.paginationResults) {
        pagination = productsShop.paginationResults.numOfPages;
      }
      if (productsShop.results) {
        results = productsShop.results;
      }
    }
  }

  //PAGINATION
  const onPress = (page) => {
    getQueriesStorage();
    sortData();
    dispatch(
      getAllProductsShop(
        `sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&price[gt]=0${priceToQuery}&${catQuery}`
      )
    );
  };

  //STORAGE
  let priceTo = "",
    priceToQuery = "";
  let catQuery = "";
  let word = "";
  const getQueriesStorage = () => {
    //Search word
    if (localStorage.getItem("searchWord") != null)
      word = localStorage.getItem("searchWord");

    // categoriesChecked
    if (localStorage.getItem("categoriesChecked") != null)
      catQuery = localStorage.getItem("categoriesChecked");

    //Price
    if (localStorage.getItem("priceTo") != null)
      priceTo = localStorage.getItem("priceTo");

    if (priceTo === "" || priceTo <= 0) {
      priceToQuery = "";
    } else {
      priceToQuery = `&price[lte]=${priceTo}`;
    }
  };

  //SORTING
  let sortType = "",
    sort;
  const sortData = () => {
    if (localStorage.getItem("sortType") !== null) {
      sortType = localStorage.getItem("sortType");
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
    productItems,
    pagination,
    results,
    loading,
    error,
    onPress,
    getProducts,
  ];
};

export default ShopHook;
