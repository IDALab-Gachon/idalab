import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  flow-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin-top: 50px;
  padding: 10px 15px;
  border-top: 2px solid ${props => props.theme.lightVioletColor};
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <Copyright>IDA Lab. {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);