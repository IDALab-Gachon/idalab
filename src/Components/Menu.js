import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import logo from "../images/logo_typo.png";

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  margin: 5px 0;
  height: 70px;
  position: relative;
`;

const HeaderMenu = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${(props) => (props.$open ? "flex" : "none")};
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.bgColor};
    padding: 10px 20px 20px;
    border-top: 1px solid ${(props) => props.theme.lightGreyColor};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
`;

const HeaderLink = styled(NavLink)`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 18px;
  margin-left: 25px;

  @media (max-width: 768px) {
    margin: 10px 0;
    font-size: 16px;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerLine = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background-color: ${(props) => props.theme.darkGreyColor};
`;

const Menu = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const activeStyle = {
    color: props.theme ? props.theme.redColor : "#ED4956",
    fontWeight: 600,
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <NavLink exact to="/" onClick={handleLinkClick}>
        <img height="55px" src={logo} alt="IDA Lab" />
      </NavLink>
      <HamburgerButton
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="메뉴 열기/닫기"
      >
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </HamburgerButton>
      <HeaderMenu $open={menuOpen}>
        <HeaderLink exact to="/" activeStyle={activeStyle} onClick={handleLinkClick}>
          HOME
        </HeaderLink>
        <HeaderLink exact to="/professor" activeStyle={activeStyle} onClick={handleLinkClick}>
          PROFESSOR
        </HeaderLink>
        <HeaderLink exact to="/members" activeStyle={activeStyle} onClick={handleLinkClick}>
          MEMBERS
        </HeaderLink>
        <HeaderLink exact to="/publications" activeStyle={activeStyle} onClick={handleLinkClick}>
          PUBLICATIONS
        </HeaderLink>
        <HeaderLink exact to="/projects" activeStyle={activeStyle} onClick={handleLinkClick}>
          PROJECTS
        </HeaderLink>
        <HeaderLink exact to="/photo" activeStyle={activeStyle} onClick={handleLinkClick}>
          PHOTO
        </HeaderLink>
      </HeaderMenu>
    </HeaderContainer>
  );
};

export default Menu;
