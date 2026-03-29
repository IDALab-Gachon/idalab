import React from "react";
import styled from "styled-components";
import { useMembers } from "../hooks/useMembers";

const ROLE_LABELS = {
  professor: "Professor",
  research_professor: "Research Professor",
  phd_student: "Ph.D. Students",
  ms_student: "M.S. Students",
  bs_student: "B.S. Students",
};

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
  min-height: 380px;
  text-align: center;
  padding: 15px;
  margin-right: 15px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    width: calc(50% - 10px);
    min-height: unset;
    margin-right: 10px;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-right: 0;
  }
`;

const MemberImg = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-top: 10px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
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
  const { activeMembers, alumni, loading, ROLE_ORDER } = useMembers();

  if (loading) return <MemberContainer><ListContainer>Loading...</ListContainer></MemberContainer>;

  const graduateAlumni = alumni.filter((m) => m.final_degree);
  const otherAlumni = alumni.filter((m) => !m.final_degree);

  return (
    <MemberContainer>
      <MemberTitle>
        <TitleText>MEMBERS</TitleText>
      </MemberTitle>
      <ListContainer>
        {ROLE_ORDER.map((role) => {
          const members = activeMembers[role] || [];
          if (members.length === 0) return null;
          return (
            <div key={role}>
              <ListTitle>{ROLE_LABELS[role]}</ListTitle>
              <MemberWrapper>
                {members.map((member) => (
                  <MemberCard key={member.id}>
                    <MemberImg src={member.photo_url} alt={member.name} />
                    <MemberName>{member.name}</MemberName>
                    <MemberInfo>
                      {ROLE_LABELS[member.role]}
                      <br />
                      School of Computing
                      <br />
                      Gachon University
                      {member.website && (
                        <>
                          <br />
                          🌐{" "}
                          <Link
                            href={member.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {member.website.replace(/^https?:\/\//, "")}
                          </Link>
                        </>
                      )}
                      {member.email && (
                        <>
                          <br />
                          📧{" "}
                          <Link href={`mailto:${member.email}`}>
                            {member.email}
                          </Link>
                        </>
                      )}
                    </MemberInfo>
                  </MemberCard>
                ))}
              </MemberWrapper>
            </div>
          );
        })}

        <ListTitle>Alumni</ListTitle>
        <GraduateAlumni>
          {graduateAlumni.map((m) => (
            <AlumniListItem key={m.id}>
              {m.name}, {m.final_degree}, {m.graduation_year}
              {m.current_organization ? ` (${m.current_organization})` : " ()"}
            </AlumniListItem>
          ))}
        </GraduateAlumni>
        {otherAlumni.length > 0 && (
          <>
            <br />
            <AlumniList>
              {otherAlumni.map((m) => (
                <AlumniListItem key={m.id}>
                  {m.name}
                  {m.current_organization ? ` (${m.current_organization})` : ""}
                </AlumniListItem>
              ))}
            </AlumniList>
          </>
        )}
      </ListContainer>
    </MemberContainer>
  );
};

export default Members;
