import React from "react";
import styled from "styled-components";

import img_201904_1 from "../images/gallery/2019/20190426_1.jpg";
import img_201904_2 from "../images/gallery/2019/20190426_2.jpg";
import img_201904_3 from "../images/gallery/2019/20190426_3.jpg";
import img_201904_4 from "../images/gallery/2019/20190426_4.jpg";
import img_201907_1 from "../images/gallery/2019/20190730_1.jpg";
import img_201907_2 from "../images/gallery/2019/20190730_2.jpg";
import img_201908_1 from "../images/gallery/2019/20190826_ICICIC2019_1.jpg";
import img_201908_2 from "../images/gallery/2019/20190826_ICICIC2019_2.jpg";
import img_201909_1 from "../images/gallery/2019/20190920_1.jpg";
import img_201909_2 from "../images/gallery/2019/20190920_2.jpg";
import img_201909_3 from "../images/gallery/2019/20190925_1.jpg";
import img_201909_4 from "../images/gallery/2019/20190925_2.jpg";
import img_201912_1 from "../images/gallery/2019/201912_1.JPG";
import img_201912_2 from "../images/gallery/2019/201912_2.jpg";
import img_201912_3 from "../images/gallery/2019/201912_3.jpg";

import img_2018_uci_1 from "../images/gallery/2018/201807_uci_1.png";
import img_2018_uci_2 from "../images/gallery/2018/201807_uci_2.jpg";
import img_2018_uci_3 from "../images/gallery/2018/201807_uci_3.jpg";
import img_2018_uci_4 from "../images/gallery/2018/201807_uci_4.jpg";
import img_2018_uci_5 from "../images/gallery/2018/201807_uci_5.png";
import img_2018_uci_6 from "../images/gallery/2018/201807_uci_6.jpg";
import img_2018_uci_7 from "../images/gallery/2018/201807_uci_7.jpg";
import img_2018_usw_1 from "../images/gallery/2018/usw1.png";
import img_2018_usw_2 from "../images/gallery/2018/usw2.png";
import img_2018_usw_3 from "../images/gallery/2018/usw3.png";
import img_2018_usw_4 from "../images/gallery/2018/usw4.jpg";
import img_2018_usw_5 from "../images/gallery/2018/usw5.jpg";
import img_201812_1 from "../images/gallery/2018/20181226_1.jpg";
import img_201812_2 from "../images/gallery/2018/20181226_2.jpg";

const PhotoContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const PhotoTitle = styled.div`
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

const PhotoWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  ${props => props.theme.whiteBox};
  margin-bottom: 5px;
`;

// const PhotoCard = styled.div`
//   justify-content: center;
//   align-self: center;
//   vertical-align: middle;
//   ${props => props.theme.whiteBox};
//   width:  80%;
//   height: 300px;
//   text-align: center;
//   padding: 15px;
//   margin-right: 15px;
//   margin-bottom: 10px;
// `;

const PhotoImg = styled.img`
  min-width: 180px;
  height: 200px;
  border-radius: 4px;
  margin: 10px;
`;

const PhotoName = styled.p`
  padding-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.darkBlueColor};
`;


const Photo = () => {
  return (
    <PhotoContainer>
      <PhotoTitle>
        <TitleText>PHOTO</TitleText>
      </PhotoTitle>
      <ListContainer>
        <ListTitle>2019</ListTitle>
        <PhotoName>2019.04 KISM&SEBS 춘계학술대회</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201904_1} />
            <PhotoImg src={img_201904_2} />
            <PhotoImg src={img_201904_3} />
            <PhotoImg src={img_201904_4} />
        </PhotoWrapper>
        <PhotoName>2019.07 </PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201907_1} />
            <PhotoImg src={img_201907_2} />
        </PhotoWrapper>
        <PhotoName>2019.08 ICICIC2019</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201908_1} />
            <PhotoImg src={img_201908_2} />
        </PhotoWrapper>
        <PhotoName>2019.09.20</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201909_1} />
            <PhotoImg src={img_201909_2} />
        </PhotoWrapper>
        <PhotoName>2019.09.25 AI & 빅데이터 학술제</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201909_3} />
            <PhotoImg src={img_201909_4} />
        </PhotoWrapper>
        <PhotoName>2019.12 ASRU2019</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201912_1} />
            <PhotoImg src={img_201912_2} />
            <PhotoImg src={img_201912_3} />
        </PhotoWrapper>
        <hr />
        <ListTitle>2018</ListTitle>
        <PhotoName>2018.07 UCI 방문 및 공동연구</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_2018_uci_1} />
            <PhotoImg src={img_2018_uci_2} />
            <PhotoImg src={img_2018_uci_3} />
            <PhotoImg src={img_2018_uci_4} />
            <PhotoImg src={img_2018_uci_5} />
            <PhotoImg src={img_2018_uci_6} />
            <PhotoImg src={img_2018_uci_7} />
        </PhotoWrapper>
        <PhotoName>2018.07 미국소프트웨어센터 방문</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_2018_usw_1} />
            <PhotoImg src={img_2018_usw_2} />
            <PhotoImg src={img_2018_usw_3} />
            <PhotoImg src={img_2018_usw_4} />
            <PhotoImg src={img_2018_usw_5} />
        </PhotoWrapper>
        <PhotoName>2018.12</PhotoName>
        <PhotoWrapper>            
            <PhotoImg src={img_201812_1} />
            <PhotoImg src={img_201812_2} />
        </PhotoWrapper>
      </ListContainer>
    </PhotoContainer>
  );
};

export default Photo;
