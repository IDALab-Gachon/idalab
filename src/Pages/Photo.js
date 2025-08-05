import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Components/Modal.js"

import img_2025_1 from "../images/gallery/2025/2025_1.jpeg";
import img_2025_2 from "../images/gallery/2025/2025_2.jpeg";
import img_2025_3 from "../images/gallery/2025/2025_3.jpeg";
import img_2025_4 from "../images/gallery/2025/2025_4.jpeg";

import img_2024_1 from "../images/gallery/2024/2024_1.jpeg";
import img_2024_2 from "../images/gallery/2024/2024_2.jpeg";
import img_2024_3 from "../images/gallery/2024/2024_3.jpg";
import img_2024_4 from "../images/gallery/2024/2024_4.jpg";

import img_2023_1 from "../images/gallery/2023/2023_1.jpeg";
import img_2023_2 from "../images/gallery/2023/2023_2.jpeg";
import img_2023_3 from "../images/gallery/2023/2023_3.jpeg";

import img_2022_1 from "../images/gallery/2022/2022_1.jpeg";
import img_2022_2 from "../images/gallery/2022/2022_2.jpeg";
import img_2022_3 from "../images/gallery/2022/2022_3.jpeg";
import img_2022_4 from "../images/gallery/2022/2022_4.jpeg";

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
  ${(props) => props.theme.whiteBox};
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
  color: ${(props) => props.theme.darkBlueColor};
`;

const Photo = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const handleImageClick = (imgSrc) => {
    setCurrentImg(imgSrc);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentImg('');
  };

  return (
    <PhotoContainer>
      <PhotoTitle>
        <TitleText>PHOTO</TitleText>
      </PhotoTitle>

      <ListContainer>
        <details open>
        <summary>More Photos After 2020</summary>
          <div id = "2025">
            <ListTitle>2025</ListTitle>
            <PhotoWrapper>
              <PhotoImg src={img_2025_1} onClick={() => handleImageClick(img_2025_1)}/>
              <PhotoImg src={img_2025_2} onClick={() => handleImageClick(img_2025_2)}/>
              <PhotoImg src={img_2025_3} onClick={() => handleImageClick(img_2025_3)}/>
              <PhotoImg src={img_2025_4} onClick={() => handleImageClick(img_2025_4)}/>
            </PhotoWrapper>
            </div>
          <hr /> 

          <div id = "2024">
            <ListTitle>2024</ListTitle>
            <PhotoWrapper>
              <PhotoImg src={img_2024_1} onClick={() => handleImageClick(img_2024_1)}/>
              <PhotoImg src={img_2024_2} onClick={() => handleImageClick(img_2024_2)}/>
              <PhotoImg src={img_2024_3} onClick={() => handleImageClick(img_2024_3)}/>
              <PhotoImg src={img_2024_4} onClick={() => handleImageClick(img_2024_4)}/>
            </PhotoWrapper>
            </div>
          <hr /> 

          <div id = "2023">
            <ListTitle>2023</ListTitle>
            <PhotoName>2023.11 KDBC</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_2023_1} onClick={() => handleImageClick(img_2023_1)}/>
              <PhotoImg src={img_2023_2} onClick={() => handleImageClick(img_2023_2)}/>
              <PhotoImg src={img_2023_3} onClick={() => handleImageClick(img_2023_3)}/>
            </PhotoWrapper>
            <hr />
          </div>
          <div id = "2020-2022">
            <ListTitle>2020 - 2022</ListTitle>
            <PhotoWrapper>
              <PhotoImg src={img_2022_1} onClick={() => handleImageClick(img_2022_1)}/>
              <PhotoImg src={img_2022_2} onClick={() => handleImageClick(img_2022_2)}/>
              <PhotoImg src={img_2022_3} onClick={() => handleImageClick(img_2022_3)}/>
              <PhotoImg src={img_2022_4} onClick={() => handleImageClick(img_2022_4)}/>
            </PhotoWrapper>
          </div>
          <hr />
        </details>

        <details>
        <summary>More Photos before 2020</summary>

          <div id = "2019">
            <ListTitle>2019</ListTitle>
            <PhotoName>2019.04 KISM&SEBS 춘계학술대회</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201904_1} onClick={() => handleImageClick(img_201904_1)}/>
              <PhotoImg src={img_201904_2} onClick={() => handleImageClick(img_201904_2)}/>
              <PhotoImg src={img_201904_3} onClick={() => handleImageClick(img_201904_3)}/>
              <PhotoImg src={img_201904_4} onClick={() => handleImageClick(img_201904_4)}/>
            </PhotoWrapper>
            <PhotoName>2019.07 </PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201907_1} onClick={() => handleImageClick(img_201907_1)}/>
              <PhotoImg src={img_201907_2} onClick={() => handleImageClick(img_201907_2)}/>
            </PhotoWrapper>
            <PhotoName>2019.08 ICICIC2019</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201908_1} onClick={() => handleImageClick(img_201908_1)}/>
              <PhotoImg src={img_201908_2} onClick={() => handleImageClick(img_201908_2)}/>
            </PhotoWrapper>
            <PhotoName>2019.09.20</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201909_1} onClick={() => handleImageClick(img_201909_1)}/>
              <PhotoImg src={img_201909_2} onClick={() => handleImageClick(img_201909_2)}/>
            </PhotoWrapper>
            <PhotoName>2019.09.25 AI & 빅데이터 학술제</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201909_3} onClick={() => handleImageClick(img_201909_3)}/>
              <PhotoImg src={img_201909_4} onClick={() => handleImageClick(img_201909_4)}/>
            </PhotoWrapper>
            <PhotoName>2019.12 ASRU2019</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201912_1} onClick={() => handleImageClick(img_201912_1)}/>
              <PhotoImg src={img_201912_2} onClick={() => handleImageClick(img_201912_2)}/>
              <PhotoImg src={img_201912_3} onClick={() => handleImageClick(img_201912_3)}/>
            </PhotoWrapper>
          </div>
          <hr />

          <div id = "2018">
            <ListTitle>2018</ListTitle>
            <PhotoName>2018.07 UCI 방문 및 공동연구</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_2018_uci_1} onClick={() => handleImageClick(img_2018_uci_1)}/>
              <PhotoImg src={img_2018_uci_2} onClick={() => handleImageClick(img_2018_uci_2)}/>
              <PhotoImg src={img_2018_uci_3} onClick={() => handleImageClick(img_2018_uci_3)}/>
              <PhotoImg src={img_2018_uci_4} onClick={() => handleImageClick(img_2018_uci_4)}/>
              <PhotoImg src={img_2018_uci_5} onClick={() => handleImageClick(img_2018_uci_5)}/>
              <PhotoImg src={img_2018_uci_6} onClick={() => handleImageClick(img_2018_uci_6)}/>
              <PhotoImg src={img_2018_uci_7} onClick={() => handleImageClick(img_2018_uci_7)}/>
            </PhotoWrapper>
            <PhotoName>2018.07 미국소프트웨어센터 방문</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_2018_usw_1} onClick={() => handleImageClick(img_2018_usw_1)}/>
              <PhotoImg src={img_2018_usw_2} onClick={() => handleImageClick(img_2018_usw_2)}/>
              <PhotoImg src={img_2018_usw_3} onClick={() => handleImageClick(img_2018_usw_3)}/>
              <PhotoImg src={img_2018_usw_4} onClick={() => handleImageClick(img_2018_usw_4)}/>
              <PhotoImg src={img_2018_usw_5} onClick={() => handleImageClick(img_2018_usw_5)}/>
            </PhotoWrapper>
            <PhotoName>2018.12</PhotoName>
            <PhotoWrapper>
              <PhotoImg src={img_201812_1} onClick={() => handleImageClick(img_201812_1)}/>
              <PhotoImg src={img_201812_2} onClick={() => handleImageClick(img_201812_2)}/>
            </PhotoWrapper>
          </div>
        </details>

      </ListContainer>
      <Modal show={showModal} onClose={handleClose} imgSrc={currentImg} />
    
    </PhotoContainer>
    
  );
};

export default Photo;
