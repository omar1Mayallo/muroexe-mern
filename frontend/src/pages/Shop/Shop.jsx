import React from "react";
import {Container, Row, Col, Alert} from "react-bootstrap";
import FilterBar from "../../components/Utils/FilterBar/FilterBar";
import PageHeadSection from "../../layout/PageHeadSection/PageHeadSection";
import Pagination from "../../components/Utils/Pagination/Pagination";
import ShopProductsContainer from "../../components/Shop/ShopProductsContainer/ShopProductsContainer";
import SideFilter from "../../components/Utils/SideFilter/SideFilter";
import SecContainer from "../../layout/SecContainer/SecContainer";
import ShopHook from "../../hooks/Shop/shopHook";
import {ToastContainer} from "react-toastify";
import Spinner from "../../components/Utils/Spinner/Spinner";
import "./shop.css";

const Shop = () => {
  const [
    productItems,
    pagination,
    results,
    loading,
    error,
    onPress,
    getProducts,
  ] = ShopHook();
  if (pagination) {
    var pagesCount = pagination;
  } else {
    pagesCount = 1;
  }

  return (
    <SecContainer secName="shop-Sec" withMargin>
      <Container>
        <PageHeadSection
          pageTitle="MUROEXE"
          pageDescription="We dress a generation of urban professionals, creatives and innovators that need functional yet modern products for their everyday lives.
          "
        />
        <Row>
          <FilterBar results={results} getProducts={getProducts} />
          <Col lg={3} className="side-filter-container">
            <SideFilter />
          </Col>
          <Col lg={9}>
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : loading ? (
              <Spinner />
            ) : productItems ? (
              <>
                <ShopProductsContainer products={productItems} />
              </>
            ) : (
              <Alert variant="danger">No Items Match</Alert>
            )}
            <div className="my-5">
              <Pagination pageNumbers={pagesCount} onPress={onPress} />
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </SecContainer>
  );
};

export default Shop;
