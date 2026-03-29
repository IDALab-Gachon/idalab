import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css2?family=Manrope&display=swap');

    * {
        box-sizing:border-box;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        width: 88%;
        max-width: 1200px;
        margin: auto;
        font-size:16px;
        line-height: 160%;
        font-family: 'Manrope', sans-serif;
        padding: 5px;
    }
    @media (max-width: 768px) {
        body {
            width: 95%;
            padding: 8px;
        }
    }
    a {
        color:${props => props.theme.darkBlueColor};
        text-decoration: none;
    }
    input:focus{
        outline: none;
    }
`;