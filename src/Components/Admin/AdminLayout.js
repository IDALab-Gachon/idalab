import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.nav`
  width: 220px;
  background-color: #1e2a3a;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const SidebarTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  padding: 10px 20px 24px;
  border-bottom: 1px solid #2e3f52;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SideLink = styled(NavLink)`
  display: block;
  padding: 10px 20px;
  color: #a0aec0;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.15s;

  &:hover {
    background-color: #2e3f52;
    color: #fff;
  }
  &.active {
    background-color: #2e3f52;
    color: #fff;
    border-left: 3px solid #ed4956;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 18px;
    text-align: center;
  }
`;

const SideLinkLabel = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SignOutButton = styled.button`
  margin-top: auto;
  margin: auto 20px 20px;
  padding: 8px 16px;
  background-color: #ed4956;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c73845;
  }

  @media (max-width: 768px) {
    margin: auto 8px 20px;
    padding: 8px;
    font-size: 12px;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 30px;
  background-color: #f7f8fa;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const NAV_ITEMS = [
  { to: "/admin/professor",    emoji: "🎓", label: "Professor"    },
  { to: "/admin/members",      emoji: "👥", label: "Members"      },
  { to: "/admin/publications", emoji: "📄", label: "Publications" },
  { to: "/admin/projects",     emoji: "📁", label: "Projects"     },
  { to: "/admin/gallery",      emoji: "🖼️",  label: "Gallery"     },
];

const AdminLayout = ({ children }) => {
  const { signOut } = useAuth();

  return (
    <Layout>
      <Sidebar>
        <SidebarTitle>IDA Lab Admin</SidebarTitle>
        {NAV_ITEMS.map(({ to, emoji, label }) => (
          <SideLink key={to} to={to}>
            {emoji} <SideLinkLabel>{label}</SideLinkLabel>
          </SideLink>
        ))}
        <SignOutButton onClick={signOut}>로그아웃</SignOutButton>
      </Sidebar>
      <Content>{children}</Content>
    </Layout>
  );
};

export default AdminLayout;
