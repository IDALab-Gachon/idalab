import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../images/logo_typo_v1.png';

const HeaderContainer = styled.header`
  height: 100px;
  background-color: ${props => props.theme.bgColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5 15px;
  margin: 5px;
`;

const HeaderLogo = styled.div`
  justify-content: center;
`;

const HeaderMenu = styled.div`
  justify-content: center;
`;

const HeaderLink = styled(NavLink)`
  color: ${props => props.theme.darkGreyColor};
  font-size: 20px;
  margin-left: 30px;
`;

const Menu = (props) => {
  const activeStyle = {
    color: props.theme.redColor,
    fontWeight: 600
  };

  return (
    <>
    <HeaderContainer>
      <HeaderLogo>
        <NavLink exact to="/">
          <img height="70px" src={logo} alt="IDA Lab" />
        </NavLink>
      </HeaderLogo>
      <HeaderMenu>
        <HeaderLink exact to="/" activeStyle={activeStyle}>HOME</HeaderLink>
        <HeaderLink exact to="/members" activeStyle={activeStyle}>MEMBERS</HeaderLink>
        <HeaderLink exact to="/publications" activeStyle={activeStyle}>PUBLICATIONS</HeaderLink>
        <HeaderLink exact to="/projects" activeStyle={activeStyle}>PROJECTS</HeaderLink>
        <HeaderLink exact to="/photo" activeStyle={activeStyle}>PHOTO</HeaderLink>   
      </HeaderMenu>
    </HeaderContainer>
    </>
  );
};

export default Menu;