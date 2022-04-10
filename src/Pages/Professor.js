import React from "react";
import styled from "styled-components";

import orjeong_img from "../images/members/members_orjeong.jpg";

const ProfessorContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const ProfessorTitle = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.redColor};
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.redColor};
  padding: 10px;
`;

const ProfCard = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  padding: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 15px 0;
`;

const ProfImg = styled.img`
  width: 30%;
  object-fit: cover;
  border-radius: 10px;
`;

const ProfInfo = styled.div`
  padding: 15px 35px;
  margin-left: 35px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-left: 3px solid ${(props) => props.theme.lightGreyColor};
  align-self: center;
`;

const ProfName = styled.p`
  font-size: 32px;
  font-weight: 900;
  line-height: 1.5;
  padding-bottom: 10px;
  color: ${(props) => props.theme.darkVioletColor};
`;

const ProfTitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
  margin-top: 10px;
  padding-bottom: 10px;
  color: ${(props) => props.theme.darkGreyColor};
`;

const ProfAffiliation = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  color: ${(props) => props.theme.darkGreyColor};
`;

const ProfContact = styled.p`
  font-size: 18px;
  line-height: 1.3;
  margin-top: 20px;
`;

const ListContainer = styled.div`
  width: 100%;
  margin-top: 15px;
  padding: 20px;
`;

const ListTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.darkBlueColor};
  padding-bottom: 10px;
  padding-top: 5px;
`;

const DetailList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.blackColor};
  padding-left: 10px;
`;

const DetailListItem = styled.li`
  ::before {
    content: "•";
    color: ${(props) => props.theme.redColor};
    display: inline-block;
    width: 1em;
  }
`;

const DetailInnerList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.darkGreyColor};
`;

const DetailListInnerItem = styled.li`
  ::before {
    content: "-";
    color: ${(props) => props.theme.redColor};
    display: inline-block;
    width: 1em;
    margin-left: 1em;
  }
`;

const DetailListItemStrong = styled.strong`
  font-weight: 800;
`;

const DetailText = styled.p`
  color: ${(props) => props.theme.blackColor};
  padding-left: 10px;
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const Professor = () => {
  return (
    <ProfessorContainer>
      <ProfessorTitle>
        <TitleText>Professor</TitleText>
      </ProfessorTitle>
      <ProfCard>
        <ProfImg src={orjeong_img} alt="OkRan Jeong"></ProfImg>
        <ProfInfo>
          <ProfName>Prof. OkRan Jeong</ProfName>
          <ProfTitle>Professor</ProfTitle>
          <ProfAffiliation>
            School of Computing, <br />
            College of IT Convergence,
            <br />
            Gachon University
          </ProfAffiliation>
          <ProfContact>
            <span role="img" aria-label="office">
              🏢
            </span>{" "}
            Office: #425, AI Building, Gachon University, Republic of Korea{" "}
            <br />
            <span role="img" aria-label="email">
              📧
            </span>{" "}
            E-mail:{" "}
            <Link href="mailto:orjeong@gachon.ac.kr">orjeong@gachon.ac.kr</Link>{" "}
            <br />
            <span role="img" aria-label="tel">
              📞
            </span>{" "}
            Tel: (+82)031-750-5831
          </ProfContact>
        </ProfInfo>
      </ProfCard>
      <ListContainer>
        <ListTitle>Bio Sketch</ListTitle>
        <DetailText>
          I am a professor with the School of Computing at Gachon University.
          <br />
          I was a research professor with the School of Information and
          Communication Engineering at Sungkyunkwan University. Before that I
          was a visiting scholar with the Department of Computer Science at the
          University of Illinois at Urbana-Champaign, USA, and a post-doctoral
          researcher with the Center for e-Business Technology at Seoul National
          University. <br />I received a Ph.D. in computer science and
          engineering from Ewha Womans University in 2005. My research interests
          include Big Data, Machine Learning and Social computing technology
        </DetailText>
        <br />
        <ListTitle>Research Interests</ListTitle>
        <DetailList>
          <DetailListItem>Intelligent Data Analysis Technology</DetailListItem>
          <DetailInnerList>
            <DetailListInnerItem>
              Big data analysis and deep learning applications
            </DetailListInnerItem>
            <DetailListInnerItem>
              Semantic classification and predictive modeling
            </DetailListInnerItem>
          </DetailInnerList>
          <DetailListItem>
            Conversational AI Framework Technology
          </DetailListItem>
          <DetailInnerList>
            <DetailListInnerItem>
              Auto growing knowledge graph
            </DetailListInnerItem>
            <DetailListInnerItem>
              Intelligent emotional chatbot system
            </DetailListInnerItem>
          </DetailInnerList>
          <DetailListItem>Social Computing Technology</DetailListItem>
          <DetailInnerList>
            <DetailListInnerItem>Opinion mining</DetailListInnerItem>
            <DetailListInnerItem>Social media mining</DetailListInnerItem>
          </DetailInnerList>
        </DetailList>
        <br />
        <ListTitle>Experiences</ListTitle>
        <DetailList>
          <DetailListItem>
            Visiting Researcher, Department of Computer Science,{" "}
            <DetailListItemStrong>
              Univ. of California, Irvine (UCI)
            </DetailListItemStrong>{" "}
            (Jun. 2017 – Feb. 2018)
          </DetailListItem>
          <DetailListItem>
            Research Professor, School of Information & Communication
            Engineering,{" "}
            <DetailListItemStrong>Sungkyunkwan University</DetailListItemStrong>{" "}
            (Jan. 2008 – Aug. 2009)
          </DetailListItem>
          <DetailListItem>
            Visiting Scholar, Department of Computer Science,{" "}
            <DetailListItemStrong>
              Univ. of Illinois at Urbana Champaign (UIUC)
            </DetailListItemStrong>{" "}
            (Feb. 2007 – Dec. 2007)
          </DetailListItem>
          <DetailListItem>
            Post Doctoral Researcher, Dept. of Computer Science and Engineering
            ,{" "}
            <DetailListItemStrong>
              Seoul National University
            </DetailListItemStrong>{" "}
            (Sep. 2005 – Jan.2007)
          </DetailListItem>
        </DetailList>
      </ListContainer>
    </ProfessorContainer>
  );
};

export default Professor;
