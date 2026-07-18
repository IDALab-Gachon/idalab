import React from "react";
import styled from "styled-components";
import ObfuscatedEmail from "../Components/ObfuscatedEmail";
import { getProfessorProfile } from "../constants/professorProfile";
import { useProfessor } from "../hooks/useProfessor";

const VERIFIED_BIO_SKETCH =
  "Ok-Ran Jeong received her Ph.D. in Computer Science and Engineering from Ewha Womans University in 2005. Before joining Gachon University in 2009, she was a research professor at Sungkyunkwan University, a visiting scholar at the University of Illinois at Urbana-Champaign, and a postdoctoral researcher at Seoul National University. She is currently a Professor in the School of Computing at Gachon University. Her research interests include big data mining, machine learning, deep learning, and applications of artificial intelligence.";

const getBioSketch = (bioSketch) =>
  bioSketch?.trim() || VERIFIED_BIO_SKETCH;

const Page = styled.div`
  width: 100%;
`;

const PageHeader = styled.header`
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
  padding: 54px 14px 0;

  @media (max-width: 768px) {
    padding: 40px 2px 0;
  }
`;

const ProfileCard = styled.section`
  display: grid;
  grid-template-columns: minmax(280px, 0.78fr) minmax(0, 1.22fr);
  overflow: hidden;
  border: 1px solid #e0e7ed;
  border-radius: 18px;
  background: #fff;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const PhotoPanel = styled.div`
  min-height: 480px;
  padding: 28px;
  background: linear-gradient(145deg, #edf7fa 0%, #f5f1fb 100%);

  @media (max-width: 800px) {
    min-height: 0;
  }
`;

const ProfessorPhoto = styled.img`
  width: 100%;
  height: 100%;
  min-height: 424px;
  border-radius: 12px;
  object-fit: cover;
  object-position: center;

  @media (max-width: 800px) {
    display: block;
    width: min(100%, 420px);
    min-height: 0;
    max-height: 520px;
    margin: 0 auto;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 54px;

  @media (max-width: 900px) {
    padding: 40px;
  }

  @media (max-width: 520px) {
    padding: 32px 24px;
  }
`;

const Position = styled.p`
  margin-bottom: 9px;
  color: ${(props) => props.theme.redColor};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const ProfessorName = styled.h2`
  color: ${(props) => props.theme.darkVioletColor};
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.2;
`;

const Affiliation = styled.p`
  margin-top: 17px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 18px;
  line-height: 1.7;
  white-space: pre-line;

  @media (max-width: 520px) {
    font-size: 16px;
  }
`;

const ContactList = styled.ul`
  display: grid;
  gap: 10px;
  margin-top: 30px;
  padding-top: 26px;
  border-top: 1px solid #e1e7ed;
`;

const ContactItem = styled.li`
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 10px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 14px;
  line-height: 1.6;

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
    gap: 1px;
  }
`;

const ContactLabel = styled.span`
  color: ${(props) => props.theme.blackColor};
  font-weight: 750;
`;

const ContactLink = styled.a`
  overflow-wrap: anywhere;
  color: ${(props) => props.theme.darkBlueColor};
  font-weight: 650;
`;

const EmailText = styled(ObfuscatedEmail)`
  overflow-wrap: anywhere;
  color: ${(props) => props.theme.darkBlueColor};
  font-weight: 650;
`;

const AcademicLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
`;

const AcademicLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 42px;
  padding: 7px 12px 7px 9px;
  border: 1px solid #d9e2ea;
  border-radius: 9px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 13px;
  font-weight: 750;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.darkBlueColor};
    background: #f5f8fb;
  }
`;

const OrcidIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #a6ce39;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.08em;
`;

const ScholarIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  color: #4285f4;

  svg {
    width: 27px;
    height: 27px;
  }
`;

const ScopusIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  border-radius: 7px;
  background: #e9711c;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(300px, 0.92fr);
  align-items: stretch;
  gap: 22px;
  margin-top: 64px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    margin-top: 46px;
  }
`;

const DetailCard = styled.section`
  padding: 34px;
  border: 1px solid #e1e7ed;
  border-radius: 16px;
  background: #fff;

  @media (max-width: 520px) {
    padding: 26px 22px;
  }
`;

const SectionLabel = styled.p`
  margin-bottom: 7px;
  color: ${(props) => props.theme.redColor};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 25px;
  font-weight: 750;
  letter-spacing: -0.025em;
  line-height: 1.35;
`;

const BioText = styled.p`
  margin-top: 18px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 15px;
  line-height: 1.85;
`;

const InterestList = styled.ul`
  display: grid;
  gap: 14px;
  margin-top: 20px;
`;

const InterestItem = styled.li`
  padding: 18px;
  border-radius: 11px;
  background: #f5f7fa;
`;

const InterestTitle = styled.h3`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 15px;
  font-weight: 750;
  line-height: 1.45;
`;

const InterestDetailList = styled.ul`
  display: grid;
  gap: 5px;
  margin-top: 9px;
`;

const InterestDetail = styled.li`
  position: relative;
  padding-left: 13px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 13px;
  line-height: 1.55;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    color: ${(props) => props.theme.redColor};
    content: "•";
  }
`;

const ExperienceSection = styled.section`
  margin-top: 22px;
  padding: 42px;
  border-radius: 18px;
  background: #f5f7fa;

  @media (max-width: 580px) {
    padding: 30px 22px;
  }
`;

const ExperienceList = styled.ol`
  display: grid;
  gap: 0;
  margin-top: 26px;
`;

const ExperienceItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 28px;
  padding: 0 0 28px 24px;
  border-left: 1px solid #ccd7e2;

  &::before {
    position: absolute;
    top: 6px;
    left: -5px;
    width: 9px;
    height: 9px;
    border: 2px solid #f5f7fa;
    border-radius: 50%;
    background: ${(props) => props.theme.redColor};
    content: "";
  }

  &:last-child {
    padding-bottom: 0;
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const ExperiencePeriod = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
`;

const ExperienceRole = styled.h3`
  color: ${(props) => props.theme.blackColor};
  font-size: 15px;
  font-weight: 700;
  line-height: 1.5;
`;

const ExperienceOrganization = styled.p`
  margin-top: 3px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
`;

const StatusMessage = styled.div`
  margin-top: 28px;
  padding: 28px;
  border: 1px solid #e1e7ed;
  border-radius: 12px;
  color: ${(props) => props.theme.darkGreyColor};
  text-align: center;
`;

const Professor = () => {
  const { professor, details, loading, error } = useProfessor();
  const profile = getProfessorProfile(details);
  const bioSketch = getBioSketch(details?.bio_sketch);
  const telephoneHref = profile.telephone
    ? `tel:${profile.telephone.replace(/[^\d+]/g, "")}`
    : null;
  const hasAcademicLinks = Boolean(
    profile.orcid_url ||
      profile.google_scholar_url ||
      profile.scopus_url
  );

  return (
    <Page>
      <PageHeader>
        <Eyebrow>Faculty</Eyebrow>
        <PageTitle>Professor</PageTitle>
        <PageDescription>
          Faculty leadership and research background of the Intelligent Data
          Analytics Laboratory.
        </PageDescription>
      </PageHeader>

      {loading && <StatusMessage>Loading professor information…</StatusMessage>}
      {!loading && (error || !professor) && (
        <StatusMessage>Professor information is temporarily unavailable.</StatusMessage>
      )}

      {!loading && !error && professor && (
        <Content>
          <ProfileCard aria-labelledby="professor-name">
            <PhotoPanel>
              <ProfessorPhoto src={professor.photo_url} alt={professor.name} />
            </PhotoPanel>
            <ProfileInfo>
              {profile.position_title && (
                <Position>{profile.position_title}</Position>
              )}
              <ProfessorName id="professor-name">{professor.name}</ProfessorName>
              {profile.affiliation && (
                <Affiliation>{profile.affiliation}</Affiliation>
              )}
              <ContactList aria-label="Professor contact information">
                {profile.office && (
                  <ContactItem>
                    <ContactLabel>Office</ContactLabel>
                    <span>{profile.office}</span>
                  </ContactItem>
                )}
                {professor.email && (
                  <ContactItem>
                    <ContactLabel>Email</ContactLabel>
                    <EmailText email={professor.email} />
                  </ContactItem>
                )}
                {profile.telephone && (
                  <ContactItem>
                    <ContactLabel>Telephone</ContactLabel>
                    <ContactLink href={telephoneHref}>
                      {profile.telephone}
                    </ContactLink>
                  </ContactItem>
                )}
              </ContactList>
              {hasAcademicLinks && (
                <AcademicLinks aria-label="Academic profiles">
                  {profile.orcid_url && (
                    <AcademicLink
                      href={profile.orcid_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${professor.name} ORCID profile`}
                    >
                      <OrcidIcon aria-hidden="true">iD</OrcidIcon>
                      ORCID
                    </AcademicLink>
                  )}
                  {profile.google_scholar_url && (
                    <AcademicLink
                      href={profile.google_scholar_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${professor.name} publications on Google Scholar`}
                    >
                      <ScholarIcon aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M12 3 2 8l10 5 10-5-10-5Z" fill="currentColor" />
                          <path
                            d="M6 11v4.2C6 17.3 8.7 19 12 19s6-1.7 6-3.8V11l-6 3-6-3Z"
                            fill="currentColor"
                            opacity="0.75"
                          />
                        </svg>
                      </ScholarIcon>
                      Google Scholar
                    </AcademicLink>
                  )}
                  {profile.scopus_url && (
                    <AcademicLink
                      href={profile.scopus_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${professor.name} Scopus author profile`}
                    >
                      <ScopusIcon aria-hidden="true">S</ScopusIcon>
                      Scopus
                    </AcademicLink>
                  )}
                </AcademicLinks>
              )}
            </ProfileInfo>
          </ProfileCard>

          {details && (
            <>
              <DetailsGrid>
                {bioSketch && (
                  <DetailCard aria-labelledby="bio-title">
                    <SectionLabel>Background</SectionLabel>
                    <SectionTitle id="bio-title">Bio Sketch</SectionTitle>
                    <BioText>{bioSketch}</BioText>
                  </DetailCard>
                )}

                {details.research_interests &&
                  details.research_interests.length > 0 && (
                    <DetailCard aria-labelledby="interests-title">
                      <SectionLabel>Research</SectionLabel>
                      <SectionTitle id="interests-title">
                        Research Interests
                      </SectionTitle>
                      <InterestList>
                        {details.research_interests.map((interest, index) => (
                          <InterestItem key={`${interest.title}-${index}`}>
                            <InterestTitle>{interest.title}</InterestTitle>
                            {interest.items && interest.items.length > 0 && (
                              <InterestDetailList>
                                {interest.items.map((item, itemIndex) => (
                                  <InterestDetail key={`${item}-${itemIndex}`}>
                                    {item}
                                  </InterestDetail>
                                ))}
                              </InterestDetailList>
                            )}
                          </InterestItem>
                        ))}
                      </InterestList>
                    </DetailCard>
                  )}
              </DetailsGrid>

              {details.experiences && details.experiences.length > 0 && (
                <ExperienceSection aria-labelledby="experience-title">
                  <SectionLabel>Career</SectionLabel>
                  <SectionTitle id="experience-title">Experiences</SectionTitle>
                  <ExperienceList>
                    {details.experiences.map((experience, index) => (
                      <ExperienceItem
                        key={`${experience.org}-${experience.period}-${index}`}
                      >
                        <ExperiencePeriod>{experience.period}</ExperiencePeriod>
                        <div>
                          <ExperienceRole>{experience.role}</ExperienceRole>
                          <ExperienceOrganization>
                            {experience.org}
                          </ExperienceOrganization>
                        </div>
                      </ExperienceItem>
                    ))}
                  </ExperienceList>
                </ExperienceSection>
              )}
            </>
          )}
        </Content>
      )}
    </Page>
  );
};

export default Professor;
