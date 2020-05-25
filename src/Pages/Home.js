import React from 'react';
import styled from 'styled-components';

import home_img from '../images/home_img.png';
import home_banner from '../images/home_ai.png';

const HomeContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${props => props.theme.lightVioletColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
`;

const BannerText = styled.div`
  justify-content: center;
  text-align: left;
`;

const BannerImage = styled.div`
  justify-content: center;
  max-height: 280px;
  margin-right: 15px;
`;

const BannerTitle = styled.p`
  font-size: 30px;
  font-weigth: 800;
  padding-bottom: 10px;
  color: ${props => props.theme.darkVioletColor};
`;

const BannerContent = styled.p`
  font-size: 18px;
  font-weight: 400;
  padding-top: 35px;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const AboutImage = styled.div`
  align-self: flex-start;
  margin-right: 10px;
`;

const AboutText = styled.div`
  padding: 5px;
`;

const AboutTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.darkBlueColor};
  padding-bottom: 15px;
`;

const AboutContent = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${props => props.theme.blackColor};
  padding-bottom: 5px;
  padding-top: 10px;
`;

const AboutDetailContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.darkGreyColor};
  padding-bottom: 10px;
`;

const AboutList = styled.ul`
  list-style: none;
  color: ${props => props.theme.darkGreyColor};
`;

const AboutListItem = styled.li`
  ::before {
    content: "•";
    color: ${props => props.theme.redColor};
    display: inline-block;
    width: 1em;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Home = () => {
  return (
    <HomeContainer>
      <BannerContainer>
        <BannerText>
          <BannerTitle>Intelligent Data Analysis Lab.</BannerTitle>
          <BannerContent>
            IDA Lab., Intelligent Data Analysis Laboratory,
            <br/>focuses on designing efficient algorithm or model to discover knowledge from big data. 
          </BannerContent>
        </BannerText>
        <BannerImage>
          <img
            height = "280px"
            src = {home_banner}
            alt = "IDA Lab"
          />
        </BannerImage>
      </BannerContainer>
      <AboutContainer>
        <AboutImage>
          <img
            width="100%"
            src={home_img}
            alt="IDALab"
          />
        </AboutImage>
        <AboutText>
          <AboutTitle>
            About IDALab.
          </AboutTitle>
          <AboutContent>
            We research and solve the problems based on data mining, machine learning, and deep learning techniques across various fields with the aim of intelligent big data analysis in real-world data.
          </AboutContent>
          <AboutContent>
            Our research directions are
          </AboutContent>
          <AboutDetailContent>
            (1) scaling up algorithms to cope with Big Data, <br/>
            (2) improving the data analysis mechanism by auto-growing knowledge graph.
          </AboutDetailContent>
          <AboutContent>
            In common, 
          </AboutContent>
          <AboutDetailContent>
            we first find a novel killer application for the emerging data types and then develop effective and efficient algorithms for the application.
            <br/>Overall, we are trying to go beyond traditional big data analysis approaches.
          </AboutDetailContent>
          <AboutContent>
          More specifically, our main research topics include but are not limited to
          </AboutContent>
          <AboutList>
            <AboutListItem>Intelligent data analysis technology for big data</AboutListItem>
            <AboutListItem>Social media contents based sentiment analysis and prediction</AboutListItem>
            <AboutListItem>Real-time data crawling & data analysis and prediction</AboutListItem>
            <AboutListItem>Auto growing knowledge graph</AboutListItem>
            <AboutListItem>Conversational AI framework technology</AboutListItem>
            <AboutListItem>Intelligent emotional chatbot</AboutListItem>
            <AboutListItem>Automatic framework deep learning-based prediction model</AboutListItem>
            <AboutListItem>Lifelong machine learning</AboutListItem>
          </AboutList>
          <br/>
          <AboutContent>
            If you have any question, <Link href="mailto:ida.gachon@gmail.com">CONTACT US!</Link>
            <br/>📧 <Link href="mailto:ida.gachon@gmail.com">ida.gachon@gmail.com</Link>
            <br/>📞 (+82)031-750-4765
          </AboutContent>
        </AboutText>
      </AboutContainer>
    </HomeContainer>
  );
};

export default Home;