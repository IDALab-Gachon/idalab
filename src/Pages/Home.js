import React, { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import { CATEGORY_LABELS, CATEGORY_ORDER, usePublications } from "../hooks/usePublications";
import homeBanner from "../images/home_ai.png";
import homeImage from "../images/home_img.png";

const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Hero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
  align-items: center;
  gap: 52px;
  min-height: 520px;
  padding: 64px 56px;
  border-radius: 24px;
  background:
    radial-gradient(circle at 88% 12%, rgba(118, 89, 209, 0.16), transparent 32%),
    linear-gradient(135deg, #f6f3ff 0%, #f8fbff 58%, #eef9fb 100%);

  &::after {
    position: absolute;
    right: -70px;
    bottom: -100px;
    width: 280px;
    height: 280px;
    border: 1px solid rgba(63, 0, 153, 0.08);
    border-radius: 50%;
    content: "";
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
    min-height: auto;
    padding: 48px 36px;
  }

  @media (max-width: 600px) {
    padding: 38px 24px 32px;
    border-radius: 16px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 650px;
`;

const Eyebrow = styled.p`
  margin-bottom: 18px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 690px;
  color: ${(props) => props.theme.darkVioletColor};
  font-size: clamp(38px, 5vw, 64px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1.08;
`;

const HeroDescription = styled.p`
  max-width: 620px;
  margin-top: 24px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 18px;
  line-height: 1.75;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
`;

const PrimaryLink = styled(RouterLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.darkBlueColor};
  border-radius: 8px;
  background: ${(props) => props.theme.darkBlueColor};
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0, 53, 105, 0.18);
  }
`;

const SecondaryLink = styled(PrimaryLink)`
  background: transparent;
  color: ${(props) => props.theme.darkBlueColor};

  &:hover {
    background: rgba(255, 255, 255, 0.65);
    color: ${(props) => props.theme.darkBlueColor};
  }
`;

const HeroVisual = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: min(100%, 390px);
    height: auto;
    filter: drop-shadow(0 20px 30px rgba(30, 67, 95, 0.12));
  }

  @media (max-width: 900px) {
    img {
      width: min(75%, 340px);
    }
  }

  @media (max-width: 600px) {
    img {
      width: min(92%, 300px);
    }
  }
`;

const Section = styled.section`
  padding: 96px 20px 0;

  @media (max-width: 768px) {
    padding: 68px 5px 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 34px;

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 26px;
  }
`;

const SectionIntro = styled.div`
  max-width: 680px;
`;

const SectionLabel = styled.p`
  margin-bottom: 8px;
  color: ${(props) => props.theme.redColor};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: clamp(27px, 3.3vw, 38px);
  font-weight: 750;
  letter-spacing: -0.035em;
  line-height: 1.25;
`;

const SectionDescription = styled.p`
  margin-top: 14px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 16px;
  line-height: 1.75;
`;

const TextLink = styled(RouterLink)`
  flex-shrink: 0;
  padding-bottom: 3px;
  border-bottom: 1px solid currentColor;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 14px;
  font-weight: 700;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 0.86fr) minmax(0, 1.14fr);
  align-items: center;
  gap: 64px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 34px;
  }
`;

const AboutVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  padding: 28px;
  border-radius: 18px;
  background: #f2fbfd;

  img {
    width: min(100%, 470px);
    height: auto;
  }

  @media (max-width: 600px) {
    min-height: 0;
    padding: 20px;
  }
`;

const AboutBody = styled.div`
  max-width: 650px;
`;

const AboutLead = styled.p`
  color: ${(props) => props.theme.blackColor};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.65;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const AboutCopy = styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 16px;
  line-height: 1.8;
`;

const DirectionList = styled.ul`
  display: grid;
  gap: 12px;
  margin-top: 26px;
`;

const DirectionItem = styled.li`
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: start;
  gap: 12px;
  color: ${(props) => props.theme.blackColor};
  font-size: 15px;
  line-height: 1.65;
`;

const DirectionNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.theme.lightVioletColor};
  color: ${(props) => props.theme.darkVioletColor};
  font-size: 12px;
  font-weight: 800;
`;

const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ResearchCard = styled.article`
  min-height: 210px;
  padding: 26px;
  border: 1px solid #e2e8ef;
  border-radius: 14px;
  background: #fff;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(63, 0, 153, 0.28);
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(30, 45, 70, 0.07);
  }

  @media (max-width: 560px) {
    min-height: auto;
  }
`;

const CardNumber = styled.span`
  display: block;
  margin-bottom: 28px;
  color: ${(props) => props.theme.redColor};
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 18px;
  font-weight: 750;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  margin-top: 10px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 14px;
  line-height: 1.65;
`;

const PublicationsSection = styled(Section)`
  margin-top: 96px;
  padding: 72px 44px;
  border-radius: 20px;
  background: #f6f8fb;

  @media (max-width: 768px) {
    margin-top: 68px;
    padding: 48px 22px;
  }
`;

const PublicationList = styled.ol`
  display: grid;
  gap: 12px;
`;

const PublicationItem = styled.li`
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) auto;
  align-items: center;
  gap: 22px;
  padding: 20px 22px;
  border: 1px solid #e6eaf0;
  border-radius: 12px;
  background: #fff;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const PublicationYear = styled.span`
  color: ${(props) => props.theme.redColor};
  font-size: 14px;
  font-weight: 800;
`;

const PublicationContent = styled.div`
  min-width: 0;
`;

const PublicationTitle = styled.h3`
  color: #1a2537;
  font-size: 15px;
  font-weight: 750;
  line-height: 1.5;
`;

const PublicationMeta = styled.p`
  margin-top: 5px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 13px;
  line-height: 1.5;
`;

const PaperLink = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
`;

const PublicationStatus = styled.p`
  padding: 18px 0;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 14px;
`;

const ContactSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 36px;
  margin-top: 96px;
  padding: 48px 52px;
  border-radius: 20px;
  background: ${(props) => props.theme.darkBlueColor};
  color: #fff;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    margin-top: 68px;
    padding: 38px 26px;
  }
`;

const ContactTitle = styled.h2`
  font-size: clamp(25px, 3vw, 34px);
  font-weight: 750;
  line-height: 1.3;
`;

const ContactDescription = styled.p`
  max-width: 620px;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 15px;
  line-height: 1.7;
`;

const ContactLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 10px 20px;
  border-radius: 8px;
  background: #fff;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;

  &:hover {
    color: ${(props) => props.theme.darkVioletColor};
  }
`;

const RESEARCH_AREAS = [
  {
    title: "Intelligent Data Analytics",
    description: "Efficient algorithms and models that discover useful knowledge from large-scale, real-world data.",
  },
  {
    title: "Knowledge Graphs",
    description: "Auto-growing knowledge graphs that improve how complex and emerging data is organized and analyzed.",
  },
  {
    title: "Conversational AI",
    description: "Frameworks for intelligent conversation systems and emotionally aware chatbot technologies.",
  },
  {
    title: "Social Media Intelligence",
    description: "Sentiment analysis and prediction methods for understanding social media content and behavior.",
  },
  {
    title: "Deep Learning Prediction",
    description: "Automatic deep learning frameworks for effective prediction across diverse application domains.",
  },
  {
    title: "Lifelong Machine Learning",
    description: "Learning systems that continuously acquire and reuse knowledge as new data and tasks emerge.",
  },
];

const Home = () => {
  const { publications, loading, error } = usePublications();

  const latestPublications = useMemo(
    () =>
      CATEGORY_ORDER.flatMap((category) =>
        (publications[category] || []).map((publication) => ({
          ...publication,
          category,
        })),
      )
        .sort(
          (a, b) =>
            Number(b.year || 0) - Number(a.year || 0) ||
            Number(b.month || 0) - Number(a.month || 0),
        )
        .slice(0, 3),
    [publications],
  );

  return (
    <HomeContainer>
      <Hero aria-labelledby="home-title">
        <HeroContent>
          <Eyebrow>Gachon University · IDA Lab</Eyebrow>
          <HeroTitle id="home-title">Intelligent Data Analytics Lab.</HeroTitle>
          <HeroDescription>
            We design efficient algorithms and intelligent models that turn
            complex, large-scale data into useful knowledge for real-world
            applications.
          </HeroDescription>
          <HeroActions>
            <PrimaryLink to="/publications">Explore publications</PrimaryLink>
            <SecondaryLink to="/members">Meet our researchers</SecondaryLink>
          </HeroActions>
        </HeroContent>
        <HeroVisual aria-hidden="true">
          <img src={homeBanner} alt="" />
        </HeroVisual>
      </Hero>

      <Section aria-labelledby="about-title">
        <AboutGrid>
          <AboutVisual>
            <img
              src={homeImage}
              alt="IDA Lab research fields connected around intelligent data analytics"
            />
          </AboutVisual>
          <AboutBody>
            <SectionLabel>About the lab</SectionLabel>
            <SectionTitle id="about-title">
              Going beyond traditional big data analysis
            </SectionTitle>
            <AboutLead>
              IDA Lab researches data mining, machine learning, and deep
              learning techniques for intelligent analysis of real-world data.
            </AboutLead>
            <AboutCopy>
              We identify promising applications for emerging data types, then
              develop effective and efficient algorithms tailored to those
              applications.
            </AboutCopy>
            <DirectionList aria-label="Primary research directions">
              <DirectionItem>
                <DirectionNumber>01</DirectionNumber>
                <span>Scale algorithms to handle the volume and complexity of big data.</span>
              </DirectionItem>
              <DirectionItem>
                <DirectionNumber>02</DirectionNumber>
                <span>
                  Improve data analysis through automatically growing knowledge graphs.
                </span>
              </DirectionItem>
            </DirectionList>
          </AboutBody>
        </AboutGrid>
      </Section>

      <Section aria-labelledby="research-title">
        <SectionHeader>
          <SectionIntro>
            <SectionLabel>Research areas</SectionLabel>
            <SectionTitle id="research-title">
              Building intelligence across data, knowledge, and interaction
            </SectionTitle>
            <SectionDescription>
              Our work spans scalable data analysis and knowledge discovery,
              with a focus on methods that can adapt to new data and practical
              problems.
            </SectionDescription>
          </SectionIntro>
          <TextLink to="/projects">View research projects</TextLink>
        </SectionHeader>
        <ResearchGrid>
          {RESEARCH_AREAS.map((area, index) => (
            <ResearchCard key={area.title}>
              <CardNumber>{String(index + 1).padStart(2, "0")}</CardNumber>
              <CardTitle>{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </ResearchCard>
          ))}
        </ResearchGrid>
      </Section>

      <PublicationsSection aria-labelledby="latest-publications-title">
        <SectionHeader>
          <SectionIntro>
            <SectionLabel>Recent work</SectionLabel>
            <SectionTitle id="latest-publications-title">
              Latest publications
            </SectionTitle>
            <SectionDescription>
              Recent journal and conference contributions from IDA Lab.
            </SectionDescription>
          </SectionIntro>
          <TextLink to="/publications">View all publications</TextLink>
        </SectionHeader>

        {loading && <PublicationStatus>Loading recent publications…</PublicationStatus>}
        {!loading && (error || latestPublications.length === 0) && (
          <PublicationStatus>
            Publication records are available on the publications page.
          </PublicationStatus>
        )}
        {!loading && !error && latestPublications.length > 0 && (
          <PublicationList>
            {latestPublications.map((publication) => (
              <PublicationItem key={publication.id}>
                <PublicationYear>{publication.year || "—"}</PublicationYear>
                <PublicationContent>
                  <PublicationTitle>{publication.title}</PublicationTitle>
                  <PublicationMeta>
                    {CATEGORY_LABELS[publication.category]}
                    {publication.venue ? ` · ${publication.venue}` : ""}
                  </PublicationMeta>
                </PublicationContent>
                {publication.url && (
                  <PaperLink
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open paper: ${publication.title}`}
                  >
                    Paper ↗
                  </PaperLink>
                )}
              </PublicationItem>
            ))}
          </PublicationList>
        )}
      </PublicationsSection>

      <ContactSection aria-labelledby="contact-title">
        <div>
          <ContactTitle id="contact-title">
            Interested in our research?
          </ContactTitle>
          <ContactDescription>
            Contact IDA Lab to learn more about our research, projects, and
            collaboration opportunities.
          </ContactDescription>
        </div>
        <ContactLink href="mailto:ida.gachon@gmail.com">
          ida.gachon@gmail.com
        </ContactLink>
      </ContactSection>
    </HomeContainer>
  );
};

export default Home;
