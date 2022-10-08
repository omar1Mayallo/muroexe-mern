import styled from "styled-components";

export const ProductItem = styled.div`
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.125);
  transition: 0.5s;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
