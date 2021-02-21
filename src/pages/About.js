import React from "react";
import styled from "styled-components";

const Div = styled.div`
 font-size: 40px;
 display: flex;
 margin: 0 auto;
 flex-direction: column;
 align-items: center;
`;

function About() {
    return (
        <>
            <Div><span>作者是一个刚进入前端行业的菜鸡~</span>
                <a href="">github</a>
            </Div>
        </>
    );
}

export default About;