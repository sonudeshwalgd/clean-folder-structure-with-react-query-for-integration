import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
.global-calender-div{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid #999;
    display: flex;
    justify-content: space-between;
    /* padding: 10px; */
    align-items: center;
    max-width: 600px;
    input{
        width: 100%;
        border: none !important;
        outline: none !important;

    }
}
.input-para-wrapper{
    width: 100%;
    .para{
        transform: translateY(0px) !important;
        font-size: 16px;
        display: none;
    }
}
.warning-para{
    font-size: 12px;
    color: red;
}
.upload-poster-img-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg{
        font-size: 76px;
        color: var(--theme);
    }
    p{
        color: #999;
    }
}
.parent-upload-absolute-wrapper{
    position: relative;
    padding: 0 !important;
    overflow: hidden;
    :hover{
            .upload-absolute-wrapper{
                opacity: 1;
                background-color: rgba(250,250,250,.1);
            }
        }
    }
    .upload-absolute-wrapper{
    z-index: 1;
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    svg{
        font-size: 50px;  
        color: var(--theme);
        margin:30px ;
        float: right;
    }


}
/* input[file:""] */
`;

export default GlobalStyle;
