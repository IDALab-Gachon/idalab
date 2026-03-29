import React from "react";
import styled from "styled-components";
import { useProfessor } from "../hooks/useProfessor";

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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 15px;
  }
`;

const ProfImg = styled.img`
  width: 30%;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 70%;
    max-width: 280px;
    border-radius: 8px;
  }
`;

const ProfInfo = styled.div`
  padding: 15px 35px;
  margin-left: 35px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-left: 3px solid ${(props) => props.theme.lightGreyColor};
  align-self: center;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px 5px;
    border-left: none;
    border-top: 3px solid ${(props) => props.theme.lightGreyColor};
    width: 100%;
    margin-top: 20px;
  }
`;

const ProfName = styled.p`
  font-size: 32px;
  font-weight: 900;
  line-height: 1.5;
  padding-bottom: 10px;
  color: ${(props) => props.theme.darkVioletColor};

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const ProfTitle = styled.p`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
  margin-top: 10px;
  padding-bottom: 10px;
  color: ${(props) => props.theme.darkGreyColor};

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ProfAffiliation = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.4;
  color: ${(props) => props.theme.darkGreyColor};

  @media (max-width: 768px) {
    font-size: 17px;
  }
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
  const { professor, details, loading } = useProfessor();

  if (loading) return <ProfessorContainer><ListContainer>Loading...</ListContainer></ProfessorContainer>;
  if (!professor) return <ProfessorContainer><ListContainer>No data.</ListContainer></ProfessorContainer>;

  return (
    <ProfessorContainer>
      <ProfessorTitle>
        <TitleText>Professor</TitleText>
      </ProfessorTitle>
      <ProfCard>
        <ProfImg src={professor.photo_url} alt={professor.name} />
        <ProfInfo>
          <ProfName>{professor.name}</ProfName>
          <ProfTitle>Professor</ProfTitle>
          <ProfAffiliation>
            School of Computing, <br />
            College of IT Convergence,
            <br />
            Gachon University
          </ProfAffiliation>
          <ProfContact>
            <span role="img" aria-label="office">🏢</span>{" "}
            Office: #425, AI Building, Gachon University, Republic of Korea <br />
            {professor.email && (
              <>
                <span role="img" aria-label="email">📧</span>{" "}
                E-mail: <Link href={`mailto:${professor.email}`}>{professor.email}</Link> <br />
              </>
            )}
            <span role="img" aria-label="tel">📞</span>{" "}
            Tel: (+82)031-750-5831
          </ProfContact>
        </ProfInfo>
      </ProfCard>

      {details && (
        <ListContainer>
          {details.bio_sketch && (
            <>
              <ListTitle>Bio Sketch</ListTitle>
              <DetailText>{details.bio_sketch}</DetailText>
              <br />
            </>
          )}

          {details.research_interests && details.research_interests.length > 0 && (
            <>
              <ListTitle>Research Interests</ListTitle>
              <DetailList>
                {details.research_interests.map((interest, i) => (
                  <React.Fragment key={i}>
                    <DetailListItem>{interest.title}</DetailListItem>
                    {interest.items && (
                      <DetailInnerList>
                        {interest.items.map((item, j) => (
                          <DetailListInnerItem key={j}>{item}</DetailListInnerItem>
                        ))}
                      </DetailInnerList>
                    )}
                  </React.Fragment>
                ))}
              </DetailList>
              <br />
            </>
          )}

          {details.experiences && details.experiences.length > 0 && (
            <>
              <ListTitle>Experiences</ListTitle>
              <DetailList>
                {details.experiences.map((exp, i) => (
                  <DetailListItem key={i}>
                    {exp.role},{" "}
                    <DetailListItemStrong>{exp.org}</DetailListItemStrong>{" "}
                    ({exp.period})
                  </DetailListItem>
                ))}
              </DetailList>
            </>
          )}
        </ListContainer>
      )}
    </ProfessorContainer>
  );
};

export default Professor;
