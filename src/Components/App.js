import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";

import { Route } from 'react-router-dom';
import { Home, Publications, Members, Projects, Photo } from '../Pages';
import Menu from './Menu';
import Footer from './Footer';
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles/>
          <Menu theme={Theme}/>
          <Route exact path="/" component={ Home } />
          <Route path="/publications" component={ Publications } />
          <Route path="/members" component={ Members } />
          <Route path="/projects" component={ Projects } />
          <Route path="/photo" component={ Photo } />
          <Footer theme={Theme} />
        </>
      </ThemeProvider>
    )
  }
}

export default App;
