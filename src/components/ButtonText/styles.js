import styled from "styled-components";

export const Container = styled.button`
  background: none;
  color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.GRAY_100 : theme.COLORS.GRAY_100};
  
  border: none;
  font-size: 16px;
`;