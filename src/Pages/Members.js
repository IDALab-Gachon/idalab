import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import ObfuscatedEmail from "../Components/ObfuscatedEmail";
import { useMembers } from "../hooks/useMembers";

const ROLE_SECTION_LABELS = {
  professor: "Professor",
  research_professor: "Research Affiliate",
  phd_student: "Ph.D. Students",
  ms_student: "M.S. Students",
  bs_student: "B.S. Students",
};

const ROLE_CARD_LABELS = {
  professor: "Professor",
  research_professor: "Research Affiliate",
  phd_student: "Ph.D. Student",
  ms_student: "M.S. Student",
  bs_student: "B.S. Student",
};

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

const MemberSection = styled.section`
  & + & {
    margin-top: 64px;
  }
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dfe6ed;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 23px;
  font-weight: 750;
  letter-spacing: -0.02em;
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border-radius: 14px;
  background: ${(props) => props.theme.lightVioletColor};
  color: ${(props) => props.theme.darkVioletColor};
  font-size: 12px;
  font-weight: 800;
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 30px 22px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px 14px;
  }

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
`;

const MemberCard = styled.article`
  display: flex;
  min-width: 0;
  flex-direction: column;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const PhotoFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 3 / 3.7;
  overflow: hidden;
  border: 1px solid #dde5ec;
  border-radius: 12px;
  background: linear-gradient(145deg, #eef3f7, #f5f2fa);
`;

const MemberPhoto = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const PhotoPlaceholder = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 106px;
  height: 106px;
  border-radius: 50%;
  background: ${(props) => props.theme.darkBlueColor};
  color: #fff;
  font-size: 30px;
  font-weight: 800;
`;

const MemberBody = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  flex-direction: column;
  padding: 14px 4px 0;
`;

const MemberName = styled.h3`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 16px;
  font-weight: 750;
  line-height: 1.4;
`;

const ProfessorLink = styled(RouterLink)`
  color: inherit;

  &:hover {
    color: ${(props) => props.theme.darkVioletColor};
  }
`;

const ExternalNameLink = styled.a`
  color: inherit;

  &:hover {
    color: ${(props) => props.theme.darkVioletColor};
  }
`;

const RoleText = styled.p`
  margin-top: 4px;
  color: ${(props) => props.theme.blackColor};
  font-size: 13px;
  font-weight: 650;
  line-height: 1.5;
`;

const Affiliation = styled.p`
  margin-top: 3px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  line-height: 1.5;
`;

const EmailText = styled(ObfuscatedEmail)`
  max-width: 100%;
  margin-top: 8px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 12px;
  font-weight: 600;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

const AlumniSection = styled.section`
  margin-top: 80px;
  padding: 42px;
  border-radius: 18px;
  background: #f5f7fa;

  @media (max-width: 680px) {
    margin-top: 62px;
    padding: 30px 20px;
  }
`;

const AlumniIntro = styled.p`
  max-width: 650px;
  margin: -8px 0 26px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 14px;
  line-height: 1.7;
`;

const AlumniGroupTitle = styled.h3`
  margin-bottom: 14px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 15px;
  font-weight: 800;
`;

const AlumniList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 14px;

  & + ${AlumniGroupTitle} {
    margin-top: 34px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const AlumniItem = styled.li`
  display: grid;
  grid-template-columns: minmax(120px, 0.8fr) minmax(0, 1.2fr);
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #e3e8ed;
  border-radius: 10px;
  background: #fff;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    gap: 3px;
  }
`;

const AlumniName = styled.span`
  color: ${(props) => props.theme.blackColor};
  font-size: 13px;
  font-weight: 750;
`;

const AlumniMeta = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
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

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Members = () => {
  const { activeMembers, alumni, loading, error, ROLE_ORDER } = useMembers();

  const graduateAlumni = alumni.filter((member) => member.final_degree);
  const otherAlumni = alumni.filter((member) => !member.final_degree);

  return (
    <Page>
      <PageHeader>
        <Eyebrow>Our people</Eyebrow>
        <PageTitle>Members</PageTitle>
        <PageDescription>
          Meet the faculty and researchers working together on intelligent data
          analytics, knowledge discovery, and machine learning at IDA Lab.
        </PageDescription>
      </PageHeader>

      {loading && <StatusMessage>Loading members…</StatusMessage>}
      {!loading && error && (
        <StatusMessage>Member information is temporarily unavailable.</StatusMessage>
      )}

      {!loading && !error && (
        <Content>
          {ROLE_ORDER.map((role) => {
            const members = activeMembers[role] || [];
            if (members.length === 0) return null;

            return (
              <MemberSection key={role} aria-labelledby={`members-${role}`}>
                <SectionHeading>
                  <SectionTitle id={`members-${role}`}>
                    {ROLE_SECTION_LABELS[role]}
                  </SectionTitle>
                  <Count aria-label={`${members.length} members`}>{members.length}</Count>
                </SectionHeading>
                <MemberGrid>
                  {members.map((member) => (
                    <MemberCard key={member.id}>
                      <PhotoFrame>
                        {member.photo_url ? (
                          <MemberPhoto src={member.photo_url} alt={member.name} />
                        ) : (
                          <PhotoPlaceholder aria-hidden="true">
                            {getInitials(member.name)}
                          </PhotoPlaceholder>
                        )}
                      </PhotoFrame>
                      <MemberBody>
                        <MemberName>
                          {member.role === "professor" ? (
                            <ProfessorLink to="/professor">{member.name}</ProfessorLink>
                          ) : member.website ? (
                            <ExternalNameLink
                              href={member.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name} website`}
                            >
                              {member.name} ↗
                            </ExternalNameLink>
                          ) : (
                            member.name
                          )}
                        </MemberName>
                        <RoleText>{ROLE_CARD_LABELS[member.role]}</RoleText>
                        <Affiliation>
                          School of Computing · Gachon University
                        </Affiliation>
                        {member.email && (
                          <EmailText email={member.email} />
                        )}
                      </MemberBody>
                    </MemberCard>
                  ))}
                </MemberGrid>
              </MemberSection>
            );
          })}

          <AlumniSection aria-labelledby="alumni-title">
            <SectionHeading>
              <SectionTitle id="alumni-title">Alumni</SectionTitle>
              <Count aria-label={`${alumni.length} alumni`}>{alumni.length}</Count>
            </SectionHeading>
            <AlumniIntro>
              IDA Lab alumni continue their work across research institutions,
              industry, and technology organizations.
            </AlumniIntro>

            {graduateAlumni.length > 0 && (
              <>
                <AlumniGroupTitle>Degree alumni</AlumniGroupTitle>
                <AlumniList>
                  {graduateAlumni.map((member) => (
                    <AlumniItem key={member.id}>
                      <AlumniName>{member.name}</AlumniName>
                      <AlumniMeta>
                        {[member.final_degree, member.graduation_year]
                          .filter(Boolean)
                          .join(" · ")}
                        {member.current_organization
                          ? ` · ${member.current_organization}`
                          : ""}
                      </AlumniMeta>
                    </AlumniItem>
                  ))}
                </AlumniList>
              </>
            )}

            {otherAlumni.length > 0 && (
              <>
                <AlumniGroupTitle>Former members</AlumniGroupTitle>
                <AlumniList>
                  {otherAlumni.map((member) => (
                    <AlumniItem key={member.id}>
                      <AlumniName>{member.name}</AlumniName>
                      <AlumniMeta>
                        {member.current_organization || "IDA Lab alumnus"}
                      </AlumniMeta>
                    </AlumniItem>
                  ))}
                </AlumniList>
              </>
            )}
          </AlumniSection>
        </Content>
      )}
    </Page>
  );
};

export default Members;
