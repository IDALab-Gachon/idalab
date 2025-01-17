import React from "react";
import styled from "styled-components";

// import empty_img from "../images/members/members_empty.png";
import orjeong_img from "../images/members/members_orjeong.jpg";

import soyeop_img from "../images/members/members_soyeop.jpeg";

// 박사
import daeho_img from "../images/members/members_daeho.jpeg";

// 석사
import taehyeong_img from "../images/members/members_taehyeong.jpeg";
import donghyeon_kim_img from "../images/members/members_donghyeon_kim.jpg";
import soonyong_img from "../images/members/members_soonyong.jpeg"
import seongyoung_img from "../images/members/members_seongyoung.jpeg"
import seungyeon_img from "../images/members/seungyeon_img"

// 학부생생
import donghyeon_lim_img from "../images/members/members_donghyeon_lim.jpeg";
import taeheon_img from "../images/members/members_taeheon.jpeg";
import haebin_img from "../images/members/members_haebin.jpeg"
import yongwan_img from "../images/members/members_yongwan.jpeg"

const MemberContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const MemberTitle = styled.div`
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

const MemberWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MemberCard = styled.div`
  justify-content: center;
  align-self: center;
  vertical-align: middle;
  ${(props) => props.theme.whiteBox};
  width: 330px;
  height: 430px;
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
  color: ${(props) => props.theme.darkBlueColor};
`;

const MemberInfo = styled.p`
  padding-top: 15px;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) => props.theme.darkGreyColor};
`;

const GraduateAlumni = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 16px;
  font-weight: 500;
`;

const AlumniList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 16px;
`;

const AlumniListItem = styled.li`
  ::before {
    content: "•";
    color: ${(props) => props.theme.redColor};
    display: inline-block;
    width: 1em;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
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
            <MemberImg src={orjeong_img} alt="OkRan Jeong" />
            <MemberName>Prof. OkRan Jeong</MemberName>
            <MemberInfo>
              Professor <br />
              School of Computing <br />
              Gachon University <br />
              🌐{" "}
              <Link
                href="http://cs.gachon.ac.kr/orjeong/"
                target="_blank"
                rel="noopener noreferrer"
              >
                orjeong.gachon.ac.kr
              </Link>{" "}
              <br />
              📧{" "}
              <Link href="mailto:orjeong@gachon.ac.kr">
                orjeong@gachon.ac.kr
              </Link>
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>Research Professor</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg src={soyeop_img} alt="SoYeop Yoo" />
            <MemberName>SoYeop Yoo</MemberName>
            <MemberInfo>
              Research Professor
              <br /> School of Computing <br />
              Gachon University <br />
              📧{" "}
              <Link href="mailto:bbusso@gachon.ac.kr">bbusso@gachon.ac.kr</Link>
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>Ph.D. Students</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg src={daeho_img} alt="DaeHo Kim" />
            <MemberName>DaeHo Kim</MemberName>
            <MemberInfo>
              Ph.D. Student
              <br /> School of Computing <br />
              Gachon University <br />
              📧{" "}
              <Link href="mailto:ikimdh91@gmail.com">ikimdh91@gmail.com</Link>
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>M.S. Students</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg src={taehyeong_img} alt="TaeHyeong Kwon" />
            <MemberName>TaeHyeong Kwon</MemberName>
            <MemberInfo>
              M.S. Student
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:kth05090@gmail.com">kth05090@gmail.com</Link>
            </MemberInfo>
          </MemberCard>
          <MemberCard>
            <MemberImg src={donghyeon_kim_img} alt="DongHyeon Kim" />
            <MemberName>DongHyeon Kim</MemberName>
            <MemberInfo>
              M.S. Student
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:eastlighting1@gachon.ac.kr">
                eastlighting1@gachon.ac.kr
              </Link>
            </MemberInfo>
          </MemberCard>
          <MemberCard>
            <MemberImg src={soonyong_img} alt="SoonYong Kim" />
            <MemberName>SoonYong Kim</MemberName>
            <MemberInfo>
              M.S. Student
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:lksy8884@naver.com">
                lksy8884@naver.com
              </Link>
            </MemberInfo>
          </MemberCard>
          <MemberCard>
            <MemberImg src={seongyoung_img} alt="SeonGyoung Lee" />
            <MemberName>SeonGyoung Lee</MemberName>
            <MemberInfo>
              M.S. Student
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:gkfl0807@gmail.com">
                gkfl0807@gmail.com
              </Link>
            </MemberInfo>
          </MemberCard>
          <MemberCard>
            <MemberImg src={seungyeon_img} alt="SeungYeon Sun" />
            <MemberName>SeungYeon Sun</MemberName>
            <MemberInfo>
              M.S. Student
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:tjstmddus202@naver.com">
                tjstmddus202@naver.com
              </Link>
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        {/* <ListTitle>M.S. - B.S. Students</ListTitle>
        <MemberWrapper></MemberWrapper> */}
        <ListTitle>B.S. Students</ListTitle>
        <MemberWrapper>
          <MemberCard>
            <MemberImg src={taeheon_img} alt="TaeHeon Seong" />
            <MemberName>TaeHeon Seong</MemberName>
            <MemberInfo>
              Undergraduate RA
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:seongth0319@gachon.ac.kr">
                seongth0319@gachon.ac.kr
              </Link>
            </MemberInfo>
          </MemberCard>

          <MemberCard>
            <MemberImg src={donghyeon_lim_img} alt="DongHyun Lim" />
            <MemberName>DongHyun Lim</MemberName>
            <MemberInfo>
              Undergraduate RA
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:donghyun7640@gmail.com">
                donghyun7640@gmail.com
              </Link>
            </MemberInfo>
          </MemberCard>

          <MemberCard>
            <MemberImg src={haebin_img} alt="Haehin Han" />
            <MemberName>Haehin Han</MemberName>
            <MemberInfo>
              Undergraduate RA
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:haebin0424@naver.com">
                haebin0424@naver.com
              </Link>
            </MemberInfo>
          </MemberCard>

          <MemberCard>
            <MemberImg src={yongwan_img} alt="YongWan Joo" />
            <MemberName>YongWan Joo</MemberName>
            <MemberInfo>
              Undergraduate RA
              <br />
              School of Computing
              <br />
              Gachon University
              <br />
              📧{" "}
              <Link href="mailto:dyddhksdl1@naver.com">
                dyddhksdl1@naver.com
              </Link>
            </MemberInfo>
          </MemberCard>
        </MemberWrapper>
        <ListTitle>Alumni</ListTitle>
        <GraduateAlumni>
          <AlumniListItem>HaYoung Lee, MS, 2024 (ETRI)</AlumniListItem>
          <AlumniListItem>HyoJin Ko, MS, 2024 (AIPIM)</AlumniListItem>
          <AlumniListItem>MinJi Kim, MS, 2024 (EMRO)</AlumniListItem>
          <AlumniListItem>ChaeRim Park, MS, 2024 ()</AlumniListItem>
          
          <AlumniListItem>YeonSun Ahn, MS, 2021 (LINE Plus)</AlumniListItem>
          <AlumniListItem>JiHye Kim, MS, 2021 (Seegene)</AlumniListItem>
          <AlumniListItem>
            SungMin Yang, MS, 2020 (Toss Payments)
          </AlumniListItem>
          <AlumniListItem>DaeHo Kim, MS, 2019 (NHN 다이퀘스트)</AlumniListItem>
          <AlumniListItem>JeIn Song, MS, 2018 (Scatter Lab)</AlumniListItem>
          <AlumniListItem>TaeSoo Park, MS, 2017 (Zigzag)</AlumniListItem>
        </GraduateAlumni>
        <br />
        <AlumniList>
          <AlumniListItem>ChongJae Yoo (LG Electronics)</AlumniListItem>
          <AlumniListItem>Soojeong Choi (EMRO)</AlumniListItem>
          <AlumniListItem>Seounhee Ma (Infobank)</AlumniListItem>
          <AlumniListItem>Jinwoo Jo (Vueno)</AlumniListItem>
          <AlumniListItem>SangMoon Kang (EMRO)</AlumniListItem>
          <AlumniListItem>YoungSook Seo (E4NET)</AlumniListItem>
          <AlumniListItem>Woori Ko (Douzone)</AlumniListItem>
          <AlumniListItem>SangMin Byun (EMRO)</AlumniListItem>
          <AlumniListItem>YoungNam Woo (Irontrain)</AlumniListItem>
          <AlumniListItem>YoungGeun Kim (GNC Network)</AlumniListItem>
          <AlumniListItem>HyunMin Kim (Wisenut)</AlumniListItem>
          <AlumniListItem>SeungChul Park (R.O.K.A.)</AlumniListItem>
          <AlumniListItem>JungHo Park (Cannon)</AlumniListItem>
          <AlumniListItem>Kideok Kim (Coupang)</AlumniListItem>
          <AlumniListItem>Jungkeun Ji (GIS)</AlumniListItem>
          <AlumniListItem>Hyeji Shin (Douzone)</AlumniListItem>
          <AlumniListItem>Jaesang Lim (Kakao Bank)</AlumniListItem>
          <AlumniListItem>Hyunjoong Kim (Samsung Electronics)</AlumniListItem>
          <AlumniListItem>Jeongwook Kim (Wisenut)</AlumniListItem>
          <AlumniListItem>Hyunwoo Yoo (HP)</AlumniListItem>
          <AlumniListItem>Youngyol Na (Midas IT)</AlumniListItem>
          <AlumniListItem>Hwankyoo Yeo (TMaxSoft)</AlumniListItem>
          <AlumniListItem>Sangwok Yoo (Keon-A IT)</AlumniListItem>
          <AlumniListItem>Jimin Seok (Douzone)</AlumniListItem>
          <AlumniListItem>HeeSue Lee (WEMAKEPRICE)</AlumniListItem>
        </AlumniList>
      </ListContainer>
    </MemberContainer>
  );
};

export default Members;
