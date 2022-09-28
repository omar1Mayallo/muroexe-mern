import styled from "styled-components";

export const FormAvatar = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 100%;
  background-color: #1a1a1a;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  svg {
    color: white;
    font-size: 60px;
  }
`;
export const FContainer = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export const FormHeader = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 900;
  font-size: 35px;
`;
