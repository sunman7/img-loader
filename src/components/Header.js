import React, {useEffect} from "react";
import {Link, NavLink, useHistory} from "react-router-dom";
import styled from "styled-components";
import {Button} from "antd";
import {useStore} from "../stores";
import {observer} from "mobx-react";

const Header = styled.header`
  background: #343A40;
  padding: 20px 200px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  align-items: center;  
`;


const StyledLink = styled(NavLink)`
  color:#CCCDCF;
  margin-left: 30px;
  &:hover,&.active{
    color:#ffffff;
  }
`;
const StyledButton = styled(Button)`
 margin-left: 10px;
  background: none;
  border: none;
  font-size: 20px;
  line-height: 20px;
  color:#fff;
  &:hover,&:focus{
    background: #6C757D;
    border: none;
  }
`;
const Login = styled.div`
margin-left: auto;
color:#fff;
`;
const Logo = styled(Link)`
  color: #CCCDCF;
  font-size: 28px;
   &:hover,&.active{
    color:#ffffff;
  }
  
`;

const Component = observer(() => {
    const {UserStore, AuthStore} = useStore();
    const history = useHistory();
    const handleLogin = () => {
        history.push("/login");

    };
    const handleLogout = () => {
        AuthStore.logout();
    };
    const handleRegister = () => {
        history.push("/register");
    };
    useEffect(() => {
        UserStore.setUser();
    }, []);
    return (
        <Header>
            <Logo to="/">怪人图床</Logo>
            <nav>
                <StyledLink to="/" activeClassName="active" exact>上传图片</StyledLink>
                <StyledLink to="/history" activeClassName="active">上传历史</StyledLink>
                <StyledLink to="/about" activeClassName="active">关于</StyledLink>
            </nav>
            <Login>
                {
                    UserStore.currentUser ?
                        <>{UserStore.currentUser.attributes.username}<StyledButton type="primary"
                                                                                   onClick={handleLogout}>注销</StyledButton></>
                        :
                        <>
                            <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                            <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
                        </>

                }

            </Login>

        </Header>
    );
});

export default Component;