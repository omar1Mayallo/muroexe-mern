import styled from "styled-components";

export const ProductItem = styled.div`
  position: relative;
  z-index: 2;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.125);
  transition: 0.5s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .remove-icon {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    height: 25px;
    width: 25px;
    background-color: black;
    cursor: pointer;
    z-index: 3;
  }
`;
export const CardTitle = styled.h4`
  font-weight: 900;
  font-size: 17px;
  text-transform: capitalize;
  color: black;
`;
export const NumOfRev = styled.span`
  font-size: 15px;
  color: gray;
`;
export const SalePrice = styled.span`
  text-decoration: line-through;
  color: #bdbdbd;
`;
export const Price = styled.span`
  font-weight: 900;
  font-size: 15px;
  color: black;
`;
