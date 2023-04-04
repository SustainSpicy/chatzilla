import styled from "styled-components";

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 1rem;
  & .icons {
    display: flex;
    gap: 20px;
  }
  /* max-width: 100px; */
`;
export const BottomRow = styled.div`
  background-color: #9cb0c796;
`;
export const TopRow = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #00bfff;
  border-radius: 50%;
  width: ${({ width }) => width ?? "15px"};
  height: ${({ height }) => height ?? "15px"};
  transition: opacity 3s ease-in-out;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
export const Centered = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.5s linear;
  &:hover {
    background-color: #3029a9;
    transform: scale(0.95);
  }
  &:disabled {
    background-color: gray;
    color: white;
    cursor: not-allowed;
    &:hover {
      background-color: gray;
      transform: none;
    }
  }
`;
