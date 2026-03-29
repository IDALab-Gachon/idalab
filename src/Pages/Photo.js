import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Components/Modal.js";
import { useGallery } from "../hooks/useGallery";

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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${(props) => props.theme.whiteBox};
  margin-bottom: 5px;
`;

const PhotoImg = styled.img`
  width: calc(25% - 20px);
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: calc(33% - 12px);
    height: 120px;
    margin: 6px;
  }

  @media (max-width: 480px) {
    width: calc(50% - 12px);
    height: 100px;
    margin: 6px;
  }
`;

const PhotoName = styled.p`
  padding-top: 15px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.darkBlueColor};
`;

const Photo = () => {
  const { byYear, loading } = useGallery();
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const handleImageClick = (imgSrc) => {
    setCurrentImg(imgSrc);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentImg("");
  };

  if (loading) return <PhotoContainer><ListContainer>Loading...</ListContainer></PhotoContainer>;

  const years = Object.keys(byYear).sort((a, b) => b - a);

  // 2020 기준으로 최근/이전 분리
  const recentYears = years.filter((y) => parseInt(y) >= 2020);
  const oldYears = years.filter((y) => parseInt(y) < 2020);

  const renderYearGroups = (yearList) =>
    yearList.map((year) => (
      <div id={year} key={year}>
        <ListTitle>{year}</ListTitle>
        {byYear[year].map((group) => (
          <div key={group.id}>
            {group.label && <PhotoName>{group.label}</PhotoName>}
            <PhotoWrapper>
              {group.gallery_photos.map((photo) => (
                <PhotoImg
                  key={photo.id}
                  src={photo.photo_url}
                  alt={group.label || year}
                  onClick={() => handleImageClick(photo.photo_url)}
                />
              ))}
            </PhotoWrapper>
          </div>
        ))}
        <hr />
      </div>
    ));

  return (
    <PhotoContainer>
      <PhotoTitle>
        <TitleText>PHOTO</TitleText>
      </PhotoTitle>
      <ListContainer>
        {recentYears.length > 0 && (
          <details open>
            <summary>More Photos After 2020</summary>
            {renderYearGroups(recentYears)}
          </details>
        )}
        {oldYears.length > 0 && (
          <details>
            <summary>More Photos before 2020</summary>
            {renderYearGroups(oldYears)}
          </details>
        )}
      </ListContainer>
      <Modal show={showModal} onClose={handleClose} imgSrc={currentImg} />
    </PhotoContainer>
  );
};

export default Photo;
