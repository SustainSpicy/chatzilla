import { createGlobalStyle } from "styled-components";

// export const FontStyles = createGlobalStyle`
//   /* @font-face {
//     font-family: 'MyFont';
//     src: url(${MyFont}) format('woff');
//     font-weight: normal;
//     font-style: normal;
//   } */
// `;

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
}

html,
body,#root {
  height: 100%;
  background-color: #f3efef;

}

/* width */
::-webkit-scrollbar {
  width: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  /* background: #f1f1f1; */
}

/* Handle */
::-webkit-scrollbar-thumb {
  /* background: #6c84ff; */
  /* border-radius: 10px; */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  /* background: #3b5bfe; */
}

`;
