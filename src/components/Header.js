import React from "react";
import LogoUrl from "../logo.svg";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background: #02101f;
  padding: 10px 100px;
  display: flex;
  align-items: center;
 
`;
const Logo = styled.img`
  height: 30px;
`;

const StyledLink = styled(NavLink)`
  color:#fff;
  margin-left: 30px;
  &.active{
    border-bottom: 1px solid #fff;
  }
`;

function Component() {
    return (
        <Header>
            <Logo src={LogoUrl}/>
            <nav>
                <StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
                <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
                <StyledLink to="/about" activeClassName="active">关于作者</StyledLink>
            </nav>
        </Header>
    );
}

export default Component;