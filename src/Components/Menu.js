import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo_typo_v1.png';

const Header = styled.header`
  width: 100%;
  height: 10vh;
  margin: auto;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  padding-right: 25px;
  margin-bottom: 30px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33.3%;
  max-width: 33.3%;
  text-align: center;
  &: fist-child {
    margin-right: auto;
    text-algin: left;
  }
  &: last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderLink = styled(NavLink)`
  color: #999;
  font-size: 20px;
  margin-right: 30px;
`;

const Menu = () => {
  const activeStyle = {
    color: '#ED4956',
    fontWeight: 600
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn style={{textAlign: "left"}}>
          <NavLink exact to="/">
            <img height="70px" src={logo} alt="logo"/>
          </NavLink>
        </HeaderColumn>
        <HeaderColumn>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink exact to="/" activeStyle={activeStyle}>HOME</HeaderLink>
          <HeaderLink exact to="/members" activeStyle={activeStyle}>MEMBERS</HeaderLink>
          <HeaderLink exact to="/publications" activeStyle={activeStyle}>PUBLICATIONS</HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};

export default Menu;