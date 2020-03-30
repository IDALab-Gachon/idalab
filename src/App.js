import React from 'react';
import logo from './logo_typo_v1.png';
import home_img from './home_img.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Media } from 'react-bootstrap';


function App() {
  return (
    <div className="App">
      <Navbar expand="lg">
        <Navbar.Brand href="#home">
          <img src={logo} height="80px" alt="logo"/>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">HOME</Nav.Link>
          <Nav.Link href="#member">MEMBERS</Nav.Link>
          <Nav.Link href="#pub">PUBLICATIONS</Nav.Link>
          <Nav.Link href="#project">PROJECTS</Nav.Link>
        </Nav>
      </Navbar>
      <div className="App-body">
        <div className="App-body-title">
          <h3>HOME</h3>
        </div>
        <Media>
          <img
            height={486}
            className="algin-self-center mr-3"
            src={home_img}
            alt="IDALab"
          />
          <Media.Body>
            <h5>Intelligent Data Analysis Lab.</h5>
            <p>
            IDA Lab., Intelligent Data Analysis Laboratory, focuses on designing efficient algorithm or model to discover knowledge from big data. We research and solve the problems based on data mining, machine learning, and deep learning techniques across various fields with the aim of intelligent big data analysis in real-world data.
          </p>
          <p>
            Our research directions are
            (1) scaling up algorithms to cope with Big Data,
            (2) improving the data analysis mechanism by auto-growing knowledge graph.
            In common, we first find a novel killer application for the emerging data types and then develop effective and efficient algorithms for the application. Overall, we are trying to go beyond traditional big data analysis approaches.
          </p>
          <p>
          More specifically, our main research topics include but are not limited to
          </p>
          <ul>
            <li>Intelligent data analysis technology for big data</li>
            <li>Real-time data crawling & data analysis and prediction</li>
            <li>Auto growing knowledge graph</li>
            <li>Conversational AI framework technology</li>
            <li>Intelligent emotional chatbot system</li>
            <li>Automatic framework deep learning-based prediction model</li>
            <li>Lifelong machine learning</li>
          </ul>
          </Media.Body>
        </Media>
        
        
      </div>
    </div>
  );
}

export default App;
