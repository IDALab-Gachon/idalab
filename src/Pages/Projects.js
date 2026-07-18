import React from "react";
import styled from "styled-components";
import { useProjects } from "../hooks/useProjects";

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

const ProjectSection = styled.section`
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
  line-height: 1.35;
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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  display: flex;
  min-width: 0;
  min-height: 250px;
  flex-direction: column;
  padding: 28px;
  border: 1px solid #e0e7ed;
  border-radius: 15px;
  background: #fff;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: #c8d4df;
    transform: translateY(-2px);
  }

  @media (max-width: 520px) {
    min-height: 0;
    padding: 24px 22px;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  min-height: 27px;
  margin-bottom: 17px;
`;

const Period = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.02em;
`;

const StatusBadge = styled.span`
  padding: 3px 8px;
  border-radius: 20px;
  background: ${(props) => (props.$ongoing ? "#e9f7ef" : "#eef2f6")};
  color: ${(props) => (props.$ongoing ? "#1d6f42" : props.theme.darkGreyColor)};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.02em;
`;

const ProjectTitle = styled.h3`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 18px;
  font-weight: 750;
  letter-spacing: -0.015em;
  line-height: 1.55;
`;

const ProjectDescription = styled.p`
  margin-top: 12px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 14px;
  line-height: 1.7;
`;

const ProjectActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: auto;
  padding-top: 24px;
`;

const ResourceLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 7px 11px;
  border: 1px solid #d5dfe8;
  border-radius: 8px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 12px;
  font-weight: 750;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.darkBlueColor};
    background: #f5f8fb;
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

const getPeriod = ({ start_year: startYear, end_year: endYear }) => {
  if (!startYear) return null;
  return `${startYear} – ${endYear || "Present"}`;
};

const sortCategories = ([categoryA], [categoryB]) => {
  if (categoryA === "Research Projects") return -1;
  if (categoryB === "Research Projects") return 1;
  return categoryA.localeCompare(categoryB);
};

const Projects = () => {
  const { groupedProjects, loading, error } = useProjects();
  const categories = Object.entries(groupedProjects).sort(sortCategories);

  return (
    <Page>
      <PageHeader>
        <Eyebrow>Research &amp; development</Eyebrow>
        <PageTitle>Projects</PageTitle>
        <PageDescription>
          Explore the funded research, data platforms, and applied systems
          developed by the Intelligent Data Analytics Laboratory.
        </PageDescription>
      </PageHeader>

      {loading && <StatusMessage>Loading projects…</StatusMessage>}
      {!loading && error && (
        <StatusMessage>Project information is temporarily unavailable.</StatusMessage>
      )}
      {!loading && !error && categories.length === 0 && (
        <StatusMessage>No projects are available at this time.</StatusMessage>
      )}

      {!loading && !error && categories.length > 0 && (
        <Content>
          {categories.map(([category, projects]) => (
            <ProjectSection
              key={category}
              aria-labelledby={`projects-${category.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <SectionHeading>
                <SectionTitle
                  id={`projects-${category.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {category}
                </SectionTitle>
                <Count aria-label={`${projects.length} projects`}>
                  {projects.length}
                </Count>
              </SectionHeading>

              <ProjectGrid>
                {projects.map((project) => {
                  const period = getPeriod(project);
                  const hasStatus = Boolean(project.start_year);
                  const isOngoing = hasStatus && !project.end_year;

                  return (
                    <ProjectCard key={project.id}>
                      <ProjectMeta>
                        {period && <Period>{period}</Period>}
                        {hasStatus && (
                          <StatusBadge $ongoing={isOngoing}>
                            {isOngoing ? "Ongoing" : "Completed"}
                          </StatusBadge>
                        )}
                      </ProjectMeta>

                      <ProjectTitle>{project.title}</ProjectTitle>
                      {project.description && (
                        <ProjectDescription>
                          {project.description}
                        </ProjectDescription>
                      )}

                      {(project.url || project.pdf_url) && (
                        <ProjectActions aria-label={`${project.title} resources`}>
                          {project.url && (
                            <ResourceLink
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Project website ↗
                            </ResourceLink>
                          )}
                          {project.pdf_url && (
                            <ResourceLink
                              href={project.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Project PDF ↗
                            </ResourceLink>
                          )}
                        </ProjectActions>
                      )}
                    </ProjectCard>
                  );
                })}
              </ProjectGrid>
            </ProjectSection>
          ))}
        </Content>
      )}
    </Page>
  );
};

export default Projects;
