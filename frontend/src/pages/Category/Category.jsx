import React from "react";
import PageHeadSection from "../../layout/PageHeadSection/PageHeadSection";
import CategoryHook from "../../hooks/Category/categoryHook";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Spinner from "../../components/Utils/Spinner/Spinner";
import SecContainer from "../../layout/SecContainer/SecContainer";
import FilterBar from "../../components/Utils/FilterBar/FilterBar";
import ProductCard from "../../components/Product/ProductCard/ProductCard";

const Category = () => {
  const [
    categoryItem,
    error,
    loading,
    getProducts,
    prodLoading,
    prodError,
    productItems,
    results,
  ] = CategoryHook();
  console.log(productItems);

  const productCategoryItems =
    productItems.length &&
    productItems.map((item) => (
      <Col lg={3} key={item._id}>
        <ProductCard product={item} />
      </Col>
    ));
  return (
    <SecContainer secName="category-Sec" withMargin>
      <Container>
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : loading ? (
          <Spinner />
        ) : (
          categoryItem && (
            <PageHeadSection
              pageTitle={categoryItem.name}
              pageDescription={categoryItem.description}
            />
          )
        )}

        <FilterBar
          results={results}
          getProducts={getProducts}
          sortName="sortTypeForCatPg"
        />

        <Row>
          {prodError ? (
            <Alert variant="danger">{error}</Alert>
          ) : prodLoading ? (
            <Spinner />
          ) : (
            productItems && <>{productCategoryItems}</>
          )}
        </Row>
      </Container>
    </SecContainer>
  );
};

export default Category;
