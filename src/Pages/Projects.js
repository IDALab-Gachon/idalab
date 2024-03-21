import React from "react";
import styled from "styled-components";

import polaris_project from "../files/PolarisProject_2403_v6.pdf";

const ProjContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const ProjTitle = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.redColor};
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.redColor};
  padding: 10px;
`;

const ListContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
`;

const ListTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.darkBlueColor};
  padding-bottom: 10px;
  padding-top: 5px;
`;

const ProjList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.darkGreyColor};
  margin-bottom: 15px;
`;

const ProjListItem = styled.li`
  ::before {
    content: "•";
    color: ${(props) => props.theme.redColor};
    display: inline-block;
    width: 1em;
  }
`;

const Projects = () => {
  return (
    <ProjContainer>
      <ProjTitle>
        <TitleText>PROJECTS</TitleText>
      </ProjTitle>
      <ListContainer>
        <ListTitle>Apache AsterixDB Project</ListTitle>
        <ProjList>
          <ProjListItem>Apache AsterixDB web console</ProjListItem>
          <ProjListItem>
            AsterixDB-based social media analysis system
          </ProjListItem>
          <ProjListItem>AsterixDB-based disease detection system</ProjListItem>
        </ProjList>
        <hr />
        <ListTitle>Polaris Project</ListTitle>
        <ProjList>
          <ProjListItem>
            <a href={polaris_project} target="_blank" rel="noopener noreferrer">
              "Polaris"
            </a>
          </ProjListItem>
          <ProjListItem>Social media analysis system</ProjListItem>
        </ProjList>
        <hr />
        <ListTitle>Research Projects</ListTitle>
        <ProjList>
          <ProjListItem>
            "Research and Development of the Deep Learning based Nursing
            Surveillance Decision-making System for Abdominal Surgery Patients
            using EMR data," National Research Foundation of Korea (NRF) (Sep.
            2023 – )
          </ProjListItem>
          <ProjListItem>
            "Research on Deeper Conversational AI Platform based on Continual
            Learning," National Research Foundation of Korea (NRF) (Sep. 2022 –
            )
          </ProjListItem>
          <ProjListItem>
            "Conversational AI Framework based on Auto Growing Knowledge Graph,"
            National Research Foundation of Korea (NRF) (Mar. 2019 – Feb. 2022)
          </ProjListItem>
          <ProjListItem>
            "Research and Development of a Social Context-awareness based
            Interactive Recommendation Engine," National Research Foundation of
            Korea (NRF) (Nov. 2015 - Oct. 2018)
          </ProjListItem>
          <ProjListItem>
            "Research and Development of a Social Network based Intelligent
            Search Engine," National Research Foundation of Korea (NRF) (Jun.
            2013 - May 2016)
          </ProjListItem>
          <ProjListItem>
            "Research and Development of a Social Network based Vertical Search
            Engine," National Research Foundation of Korea (NRF) (Sep. 2010 -
            Aug. 2012)
          </ProjListItem>
        </ProjList>
        <hr />
        <ListTitle>Graduation Projects</ListTitle>
        <ProjList>
          <ProjListItem>
            <a href="http://sclab.gachon.ac.kr/index.php/gp_podsso/">
              Social Network based Podcast Search Engine
            </a>
          </ProjListItem>
          <ProjListItem>
            <a href="http://192.9.81.151/index.php/gp_moaf/">
              Social Network based Music Recommendation System
            </a>
          </ProjListItem>
          <ProjListItem>
            <a href="http://sclab.gachon.ac.kr/index.php/gp_my_portfolio/">
              My Portfolio
            </a>
          </ProjListItem>
          <ProjListItem>
            <a href="http://sclab.gachon.ac.kr/index.php/gp_campus_channel/">
              Campus Channel
            </a>
          </ProjListItem>
          <ProjListItem>
            <a href="http://sclab.gachon.ac.kr/index.php/gp_travel_recommendation_system/">
              Intelligent Travel Recommendation System
            </a>
          </ProjListItem>
          <ProjListItem>
            <a href="http://sclab.gachon.ac.kr/index.php/gp_social_search_system/">
              Social Search System
            </a>
          </ProjListItem>
        </ProjList>
      </ListContainer>
    </ProjContainer>
  );
};

export default Projects;
