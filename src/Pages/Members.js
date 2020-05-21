import React from 'react';
import styled from 'styled-components';

import empty_img from '../images/members/members_empty.png';
import orjeong_img from '../images/members/members_orjeong.jpg';
import soyeop_img from '../images/members/members_soyeop.jpeg';
import jihye_img from '../images/members/members_jihye.jpg';
import yeonsun_img from '../images/members/members_yeonsun.jpg';
import heesue_img from '../images/members/members_heesue.jpg';
import sehoon_img from '../images/members/members_sehoon.jpg';

const MemberContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const MemberTitle = styled.div`
  border-bottom: 2px solid ${props => props.theme.redColor};
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.redColor};
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
  color: ${props => props.theme.darkBlueColor};
  padding-bottom: 10px;
  padding-top: 5px;
`;

const MemberWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MemberCard = styled.div`
  justify-content: center;
  align-self: center;
  vertical-align: middle;
  ${props => props.theme.whiteBox};
  width: 280px;
  height: 400px;
  text-align: center;
  padding: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
`;

const MemberImg = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-top: 10px;
`;

const MemberName = styled.p`
  padding-top: 15px;
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.theme.darkBlueColor};
`;

const MemberInfo = styled.p`
  padding-top: 15px;
  font-size: 16px;
  font-weight: 400;
  color: ${props => props.theme.darkGreyColor};
`;

const GraduateAlumni = styled.ul`
  list-style: none;
  color: ${props => props.theme.darkBlueColor};
  font-size: 16px;
  font-weight: 500;
`;

const AlumniList = styled.ul`
  list-style: none;
  color: ${props => props.theme.darkGreyColor};
  font-size: 16px;
`;

const AlumniListItem = styled.li`
  ::before {
    content: "•";
    color: ${props => props.theme.redColor};
    display: inline-block;
    width: 1em;
  }
`;

const Members = () => {
  return (
    <MemberContainer>
      <MemberTitle>
        <TitleText>MEMBERS</TitleText>
      </MemberTitle>
      <ListContainer>
        <ListTitle>Professor</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg
              src={orjeong_img}
              alt="OkRan Jeong"
            />
            <MemberName>Prof. OkRan Jeong</MemberName>
            <MemberInfo>
              Associate Professor <br/>
              Dept. of AI & Sotware <br/>
              Gachon University <br/>
              🌐 <a href="http://cs.gachon.ac.kr/orjeong/" target="_blank">orjeong.gachon.ac.kr</a> <br/>
              📧 orjeong@gachon.ac.kr
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>Ph.D. Student</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg
              src={soyeop_img}
              alt="SoYeop Yoo"
            />
            <MemberName>SoYeop Yoo</MemberName>
            <MemberInfo>
              Dept. of AI & Sotware <br/>
              Gachon University <br/>
              📧 bbusso90@gmail.com
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>M.S. Students</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg
              src={jihye_img}
              alt="JiHye Kim"
            />
            <MemberName>JiHye Kim</MemberName>
            <MemberInfo>
              Dept. of AI & Sotware <br/>
              Gachon University <br/>
              📧 kimjihae28@naver.com
            </MemberInfo>
          </MemberCard>
          <MemberCard>
            <MemberImg
              src={yeonsun_img}
              alt="YeonSun Ahn"
            />
            <MemberName>YeonSun Ahn</MemberName>
            <MemberInfo>
              Dept. of AI & Sotware <br/>
              Gachon University <br/>
              📧 yeonsun0517@gmail.com
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>Researchers</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg
              src={heesue_img}
              alt="HeeSue Lee"
            />
            <MemberName>HeeSue Lee</MemberName>
            <MemberInfo>
              Researcher <br/>
              📧 hesue615@gmail.com
            </MemberInfo>
          </MemberCard>
          <MemberCard>
            <MemberImg
              src={sehoon_img}
              alt="SeHoon Ahn"
            />
            <MemberName>SeHoon Ahn</MemberName>
            <MemberInfo>
              Undergraduate RA<br/>
              Dept. of AI & Software<br/>
              Gachon University<br/>
              📧 ansehoon1999@gmail.com
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>Alumni</ListTitle>
        <GraduateAlumni>
          <AlumniListItem>SungMin Yang, MS, 2020 (ODK)</AlumniListItem>
          <AlumniListItem>DaeHo Kim, MS, 2019 (NHN 다이퀘스트)</AlumniListItem>
          <AlumniListItem>JeIn Song, MS, 2018 (Zum Internet)</AlumniListItem>
          <AlumniListItem>TaeSoo Park, MS, 2017 (Wisenut)</AlumniListItem>
        </GraduateAlumni>
        <br/>
        <AlumniList>
          <AlumniListItem>ChongJae Yoo (LG Electronics)</AlumniListItem>
          <AlumniListItem>Soojeong Choi (EMRO)</AlumniListItem>
          <AlumniListItem>Seounhee Ma (Infobank)</AlumniListItem>
          <AlumniListItem>Jinwoo Jo (Vueno)</AlumniListItem>
          <AlumniListItem>SangMoon Kang (EMRO)</AlumniListItem>
          <AlumniListItem>YoungSook Seo (E4NET)</AlumniListItem>
          <AlumniListItem>Woori Ko (DUZON)</AlumniListItem>
          <AlumniListItem>SangMin Byun (EMRO)</AlumniListItem>
          <AlumniListItem>YoungNam Woo (Irontrain)</AlumniListItem>
          <AlumniListItem>YoungGeun Kim</AlumniListItem>
          <AlumniListItem>HyunMin Kim (Wisenut)</AlumniListItem>
          <AlumniListItem>SeungChul Park</AlumniListItem>
          <AlumniListItem>JungHo Park (Cannon)</AlumniListItem>
          <AlumniListItem>Kideok Kim (Coupang)</AlumniListItem>
          <AlumniListItem>Jungkeun Ji (GIS)</AlumniListItem>
          <AlumniListItem>Hyeji Shin (Douzone)</AlumniListItem>
          <AlumniListItem>Jaesang Lim (Zum Internet)</AlumniListItem>
          <AlumniListItem>Hyunjoong Kim</AlumniListItem>
          <AlumniListItem>Jeongwook Kim</AlumniListItem>
          <AlumniListItem>Hyunwoo Yoo</AlumniListItem>
          <AlumniListItem>Youngyol Na</AlumniListItem>
          <AlumniListItem>Hwankyoo Yeo</AlumniListItem>
          <AlumniListItem>Sangwok Yoo</AlumniListItem>
        </AlumniList>
      </ListContainer>
    </MemberContainer>
  );  
};

export default Members;