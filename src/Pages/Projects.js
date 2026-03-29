import React from "react";
import styled from "styled-components";
import { useProjects } from "../hooks/useProjects";

const ProjContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const ProjTitle = styled.div`
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

const ProjList = styled.ul`
  list-style: none;
  color: ${(props) => props.theme.darkGreyColor};
  margin-bottom: 15px;
`;

const ProjListItem = styled.li`
  ::before {
    content: "•";
    color: ${(props) => props.theme.redColor};
    display: inline-block;
    width: 1em;
  }
`;

const Projects = () => {
  const { groupedProjects, loading } = useProjects();

  if (loading) return <ProjContainer><ListContainer>Loading...</ListContainer></ProjContainer>;

  const categories = Object.keys(groupedProjects);

  return (
    <ProjContainer>
      <ProjTitle>
        <TitleText>PROJECTS</TitleText>
      </ProjTitle>
      <ListContainer>
        {categories.map((category, idx) => (
          <React.Fragment key={category}>
            <ListTitle>{category}</ListTitle>
            <ProjList>
              {groupedProjects[category].map((project) => (
                <ProjListItem key={project.id}>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      &ldquo;{project.title}&rdquo;
                    </a>
                  ) : project.pdf_url ? (
                    <a href={project.pdf_url} target="_blank" rel="noopener noreferrer">
                      &ldquo;{project.title}&rdquo;
                    </a>
                  ) : (
                    `"${project.title}"`
                  )}
                  {project.description && ` ${project.description}`}
                  {project.start_year && (
                    ` (${project.start_year} – ${project.end_year || ""})`
                  )}
                </ProjListItem>
              ))}
            </ProjList>
            {idx < categories.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </ListContainer>
    </ProjContainer>
  );
};

export default Projects;
