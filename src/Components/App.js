import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";

import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import { AuthProvider } from "../contexts/AuthContext";

// Main pages
import { Home, Publications, Members, Projects, Photo, Professor } from "../Pages";
import Menu from "./Menu";
import Footer from "./Footer";

// Admin pages
import Login          from "../Pages/Admin/Login";
import AdminMembers   from "../Pages/Admin/AdminMembers";
import AdminPublications from "../Pages/Admin/AdminPublications";
import AdminProjects  from "../Pages/Admin/AdminProjects";
import AdminGallery   from "../Pages/Admin/AdminGallery";
import AdminProfessor from "../Pages/Admin/AdminProfessor";
import ProtectedRoute from "./Admin/ProtectedRoute";

// 메인 사이트 레이아웃
const MainSite = () => (
  <>
    <Menu theme={Theme} />
    <Route exact path="/" component={Home} />
    <Route path="/publications" component={Publications} />
    <Route path="/members" component={Members} />
    <Route path="/projects" component={Projects} />
    <Route path="/photo" component={Photo} />
    <Route path="/professor" component={Professor} />
    <Footer theme={Theme} />
  </>
);

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ThemeProvider theme={Theme}>
          <>
            <GlobalStyles />
            <Switch>
              {/* Admin 라우트 */}
              <Route         path="/admin/login"        component={Login} />
              <ProtectedRoute path="/admin/members"     component={AdminMembers} />
              <ProtectedRoute path="/admin/publications" component={AdminPublications} />
              <ProtectedRoute path="/admin/projects"    component={AdminProjects} />
              <ProtectedRoute path="/admin/gallery"     component={AdminGallery} />
              <ProtectedRoute path="/admin/professor"   component={AdminProfessor} />
              <Route path="/admin" render={() => <Redirect to="/admin/members" />} />
              {/* 메인 사이트 */}
              <Route component={MainSite} />
            </Switch>
          </>
        </ThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;
