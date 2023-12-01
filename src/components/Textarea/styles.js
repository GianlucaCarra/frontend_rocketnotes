import styled from "styled-components";

export const Container = styled.textarea`
  width: 100%;
  height: 150px;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.WHITE};

  border: none;
  resize: none;

  margin-bottom: 8px;
  border-radius: 10px;
  padding: 16px;

  &&::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY_300};
  }

  &&::-webkit-scrollbar {
    width: 12px;  
    height: 100vh; 
  }

  &&::-webkit-scrollbar-track {
    background: transparent;        
  }

  &&::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};    
    border-radius: 20px;        
    border: 3px solid ${({ theme }) => theme.COLORS.BACKGROUND_900}; 
  }
`;