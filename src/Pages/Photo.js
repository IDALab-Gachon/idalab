import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../Components/Modal.js";
import { useGallery } from "../hooks/useGallery";

const INITIAL_PHOTOS_PER_ALBUM = 8;

const Page = styled.div`
  width: 100%;
`;

const PageHeader = styled.header`
  position: relative;
  overflow: hidden;
  margin-top: 5px;
  padding: 52px 48px;
  border-radius: 20px;
  background:
    radial-gradient(circle at 92% 10%, rgba(118, 89, 209, 0.13), transparent 30%),
    linear-gradient(135deg, #f6f3ff 0%, #f7fbff 100%);

  @media (max-width: 600px) {
    padding: 38px 24px;
    border-radius: 16px;
  }
`;

const Eyebrow = styled.p`
  margin-bottom: 9px;
  color: ${(props) => props.theme.redColor};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: clamp(34px, 4.5vw, 50px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
`;

const PageDescription = styled.p`
  max-width: 100%;
  margin-top: 14px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 16px;
  line-height: 1.75;
`;

const Content = styled.div`
  padding: 68px 14px 0;

  @media (max-width: 768px) {
    padding: 48px 2px 0;
  }
`;

const YearSection = styled.section`
  & + & {
    margin-top: 72px;
  }
`;

const YearHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dfe6ed;
`;

const YearTitle = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -0.025em;
`;

const EventCount = styled.span`
  padding: 3px 9px;
  border-radius: 20px;
  background: ${(props) => props.theme.lightVioletColor};
  color: ${(props) => props.theme.darkVioletColor};
  font-size: 11px;
  font-weight: 800;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.article`
  display: flex;
  min-width: 0;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid #e0e7ed;
  border-radius: 14px;
  background: #fff;
`;

const CoverFrame = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(145deg, #e8eef3, #f2eff8);
`;

const CoverImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;

  ${EventCard}:hover & {
    transform: scale(1.025);
  }
`;

const CoverPlaceholder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  font-weight: 700;
`;

const EventBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
`;

const EventTitle = styled.h3`
  display: -webkit-box;
  min-height: 4.5em;
  overflow: hidden;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 16px;
  font-weight: 750;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

  @media (max-width: 540px) {
    display: block;
    min-height: 0;
    overflow: visible;
    -webkit-line-clamp: unset;
  }
`;

const ViewAlbumButton = styled.button`
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 7px 11px;
  border: 1px solid #d5dfe8;
  border-radius: 8px;
  background: ${(props) => (props.$active ? "#f0f5fa" : "#fff")};
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 12px;
  font-weight: 750;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.darkBlueColor};
    background: #f5f8fb;
  }

  &:disabled {
    border-color: #e2e7ec;
    color: ${(props) => props.theme.lightGreyColor};
    background: #f8f9fa;
    cursor: default;
  }
`;

const PhotoCountChip = styled.span`
  display: inline-flex;
  min-width: 23px;
  height: 23px;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
  border-radius: 12px;
  background: ${(props) => props.theme.lightVioletColor};
  color: ${(props) => props.theme.darkVioletColor};
  font-size: 10px;
  font-weight: 800;
`;

const AlbumPanel = styled.div`
  margin-top: 22px;
  padding: 30px;
  border-radius: 16px;
  background: #f4f7fa;

  @media (max-width: 560px) {
    padding: 24px 16px;
  }
`;

const AlbumPanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

const AlbumPanelTitle = styled.h3`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 20px;
  font-weight: 750;
  line-height: 1.45;
`;

const AlbumPanelMeta = styled.p`
  margin-top: 4px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
`;

const CloseAlbumButton = styled.button`
  flex-shrink: 0;
  padding: 5px 9px;
  border: 1px solid #d5dfe8;
  border-radius: 7px;
  background: #fff;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }
`;

const PhotoButton = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: #e9eef3;
  cursor: zoom-in;

  &::after {
    position: absolute;
    right: 9px;
    bottom: 9px;
    padding: 3px 8px;
    border-radius: 20px;
    background: rgba(0, 24, 48, 0.72);
    color: #fff;
    content: "View";
    font-size: 10px;
    font-weight: 750;
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PhotoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;

  ${PhotoButton}:hover & {
    transform: scale(1.025);
  }
`;

const MoreButton = styled.button`
  display: block;
  min-height: 42px;
  margin: 20px auto 0;
  padding: 8px 16px;
  border: 1px solid #d5dfe8;
  border-radius: 9px;
  background: #fff;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 13px;
  font-weight: 750;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.darkBlueColor};
    background: #fff;
  }
`;

const StatusMessage = styled.div`
  margin-top: 28px;
  padding: 28px;
  border: 1px solid #e1e7ed;
  border-radius: 12px;
  color: ${(props) => props.theme.darkGreyColor};
  text-align: center;
`;

const getAlbumName = (group, year) =>
  group.label || `IDA Lab activities in ${year}`;

const Photo = () => {
  const { byYear, loading, error } = useGallery();
  const [activeAlbumId, setActiveAlbumId] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  const toggleAlbum = (groupId) => {
    setActiveAlbumId((current) => (current === groupId ? null : groupId));
    setShowAllPhotos(false);
  };

  const closeAlbum = () => {
    setActiveAlbumId(null);
    setShowAllPhotos(false);
  };

  const openPhoto = (photo, albumName, index, total) => {
    setCurrentPhoto({
      src: photo.photo_url,
      alt: `${albumName}, photo ${index + 1} of ${total}`,
    });
  };

  return (
    <Page>
      <PageHeader>
        <Eyebrow>Life at IDA Lab</Eyebrow>
        <PageTitle>Photos</PageTitle>
        <PageDescription>
          A visual archive of research activities, academic events, and moments
          shared by members of the Intelligent Data Analytics Laboratory.
        </PageDescription>
      </PageHeader>

      {loading && <StatusMessage>Loading photo albums…</StatusMessage>}
      {!loading && error && (
        <StatusMessage>Photo albums are temporarily unavailable.</StatusMessage>
      )}
      {!loading && !error && years.length === 0 && (
        <StatusMessage>No photo albums are available at this time.</StatusMessage>
      )}

      {!loading && !error && years.length > 0 && (
        <Content>
          {years.map((year) => {
            const groups = byYear[year];
            const activeGroup = groups.find(
              (group) => group.id === activeAlbumId
            );

            return (
              <YearSection key={year} aria-labelledby={`gallery-${year}`}>
                <YearHeading>
                  <YearTitle id={`gallery-${year}`}>{year}</YearTitle>
                  <EventCount>
                    {groups.length} {groups.length === 1 ? "event" : "events"}
                  </EventCount>
                </YearHeading>

                <EventGrid>
                  {groups.map((group) => {
                    const photos = group.gallery_photos || [];
                    const albumName = getAlbumName(group, year);
                    const coverPhoto = photos[0];
                    const isActive = group.id === activeAlbumId;

                    return (
                      <EventCard key={group.id}>
                        <CoverFrame>
                          {coverPhoto ? (
                            <CoverImage
                              src={coverPhoto.photo_url}
                              alt=""
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <CoverPlaceholder>No photos yet</CoverPlaceholder>
                          )}
                        </CoverFrame>
                        <EventBody>
                          <EventTitle title={albumName}>{albumName}</EventTitle>
                          <ViewAlbumButton
                            type="button"
                            $active={isActive}
                            disabled={photos.length === 0}
                            onClick={() => toggleAlbum(group.id)}
                            aria-expanded={isActive}
                            aria-controls={`album-${group.id}`}
                            aria-label={
                              photos.length === 0
                                ? `No photos available for ${albumName}`
                                : isActive
                                  ? `Hide ${photos.length} ${photos.length === 1 ? "photo" : "photos"} from ${albumName}`
                                  : `View ${photos.length} ${photos.length === 1 ? "photo" : "photos"} from ${albumName}`
                            }
                          >
                            {photos.length === 0 ? (
                              "Album is empty"
                            ) : (
                              <>
                                {isActive ? "Hide photos" : "View photos"}
                                <PhotoCountChip aria-hidden="true">
                                  {photos.length}
                                </PhotoCountChip>
                              </>
                            )}
                          </ViewAlbumButton>
                        </EventBody>
                      </EventCard>
                    );
                  })}
                </EventGrid>

                {activeGroup && (
                  <AlbumPanel id={`album-${activeGroup.id}`}>
                    {(() => {
                      const photos = activeGroup.gallery_photos || [];
                      const albumName = getAlbumName(activeGroup, year);
                      const visiblePhotos = showAllPhotos
                        ? photos
                        : photos.slice(0, INITIAL_PHOTOS_PER_ALBUM);
                      const hiddenPhotoCount =
                        photos.length - visiblePhotos.length;

                      return (
                        <>
                          <AlbumPanelHeader>
                            <div>
                              <AlbumPanelTitle>{albumName}</AlbumPanelTitle>
                              <AlbumPanelMeta>
                                {photos.length}{" "}
                                {photos.length === 1 ? "photo" : "photos"}
                              </AlbumPanelMeta>
                            </div>
                            <CloseAlbumButton
                              type="button"
                              onClick={closeAlbum}
                              aria-label={`Hide photos from ${albumName}`}
                            >
                              Hide photos
                            </CloseAlbumButton>
                          </AlbumPanelHeader>

                          <GalleryGrid>
                            {visiblePhotos.map((photo, index) => (
                              <PhotoButton
                                key={photo.id}
                                type="button"
                                onClick={() =>
                                  openPhoto(
                                    photo,
                                    albumName,
                                    index,
                                    photos.length
                                  )
                                }
                                aria-label={`Open ${albumName}, photo ${index + 1} of ${photos.length}`}
                              >
                                <PhotoImage
                                  src={photo.photo_url}
                                  alt=""
                                  loading="lazy"
                                  decoding="async"
                                />
                              </PhotoButton>
                            ))}
                          </GalleryGrid>

                          {photos.length > INITIAL_PHOTOS_PER_ALBUM && (
                            <MoreButton
                              type="button"
                              onClick={() =>
                                setShowAllPhotos((current) => !current)
                              }
                              aria-expanded={showAllPhotos}
                            >
                              {showAllPhotos
                                ? "Show fewer photos"
                                : `Show ${hiddenPhotoCount} more photos`}
                            </MoreButton>
                          )}
                        </>
                      );
                    })()}
                  </AlbumPanel>
                )}
              </YearSection>
            );
          })}
        </Content>
      )}

      <Modal
        show={Boolean(currentPhoto)}
        onClose={() => setCurrentPhoto(null)}
        imgSrc={currentPhoto?.src}
        imageAlt={currentPhoto?.alt}
      />
    </Page>
  );
};

export default Photo;
