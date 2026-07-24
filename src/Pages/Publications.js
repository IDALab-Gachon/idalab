import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  usePublications,
} from "../hooks/usePublications";
import { getFeaturedPublications } from "../utils/publicationOrdering";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const BADGE_SHORT = {
  international_journal_sci: "SCIE",
  international_journal_scopus: "SCOPUS",
  international_conference: "International Conference",
  domestic_journal: "Korean Journal",
  domestic_conference: "Korean Conference",
};

const FILTERS = [
  { key: "all", label: "All publications" },
  ...CATEGORY_ORDER.map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
  })),
];

const hasDistinctIndexType = (publication) => {
  const indexType = String(publication.index_type || "")
    .replace(/\s+/g, "")
    .toUpperCase();
  const categoryBadge = String(BADGE_SHORT[publication.category] || "")
    .replace(/\s+/g, "")
    .toUpperCase();

  return Boolean(indexType) && indexType !== categoryBadge;
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
  padding: 54px 14px 0;

  @media (max-width: 768px) {
    padding: 40px 2px 0;
  }
`;

const FeaturedSection = styled.section`
  margin-bottom: 32px;
  padding: 28px;
  border: 1px solid #ddd9ee;
  border-radius: 16px;
  background:
    radial-gradient(circle at 96% 0%, rgba(118, 89, 209, 0.11), transparent 34%),
    linear-gradient(135deg, #faf8ff 0%, #f7fbff 100%);

  @media (max-width: 520px) {
    padding: 22px 18px;
  }
`;

const FeaturedHeader = styled.div`
  margin-bottom: 18px;
`;

const FeaturedEyebrow = styled.p`
  margin-bottom: 6px;
  color: ${(props) => props.theme.redColor};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const FeaturedTitle = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const FeaturedDescription = styled.p`
  margin-top: 7px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 13px;
  line-height: 1.6;
`;

const FeaturedList = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  padding: 2px;
  scroll-padding-inline: 2px;
  scrollbar-color: #c2ccda transparent;
  scrollbar-width: thin;

  &:focus-visible {
    outline: 3px solid rgba(0, 53, 105, 0.2);
    outline-offset: 4px;
  }

  @media (max-width: 900px) {
    grid-template-columns: none;
    grid-auto-columns: minmax(280px, 72%);
    grid-auto-flow: column;
    overflow-x: auto;
    padding-bottom: 12px;
    scroll-snap-type: x proximity;
  }

  @media (max-width: 520px) {
    grid-auto-columns: minmax(260px, 88%);
  }
`;

const FeaturedCard = styled.li`
  display: flex;
  min-height: 220px;
  flex-direction: column;
  padding: 20px 20px 18px;
  border: 1px solid #dfe4ec;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 24px rgba(34, 45, 70, 0.06);
  scroll-snap-align: start;
`;

const FeaturedMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
  margin-bottom: 14px;
`;

const FeaturedYear = styled.span`
  color: ${(props) => props.theme.darkVioletColor};
  font-size: 13px;
  font-weight: 800;
`;

const FeaturedPaperTitle = styled.h3`
  display: -webkit-box;
  overflow: hidden;
  color: #182438;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.01em;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const FeaturedLinkIcon = styled.span`
  flex: 0 0 auto;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 15px;
  font-weight: 800;
  line-height: 1.5;
  transition: transform 0.2s ease;
`;

const FeaturedTitleLink = styled.a`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 7px;
  border-radius: 4px;

  &:hover ${FeaturedPaperTitle} {
    color: ${(props) => props.theme.darkBlueColor};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  &:hover ${FeaturedLinkIcon} {
    transform: translate(2px, -2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 53, 105, 0.2);
    outline-offset: 3px;
  }
`;

const FeaturedAuthors = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin-top: 9px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const FeaturedVenue = styled.p`
  margin-top: 12px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
`;

const FilterPanel = styled.section`
  padding: 22px;
  border: 1px solid #e0e7ed;
  border-radius: 14px;
  background: #f8fafc;

  @media (max-width: 520px) {
    padding: 18px;
  }
`;

const FilterHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 15px;
`;

const FilterTitle = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 14px;
  font-weight: 800;
`;

const ResultCount = styled.p`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  white-space: nowrap;
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterButton = styled.button`
  min-height: 38px;
  padding: 7px 13px;
  border: 1px solid
    ${(props) => (props.$active ? props.theme.darkBlueColor : "#d5dfe8")};
  border-radius: 20px;
  background: ${(props) => (props.$active ? props.theme.darkBlueColor : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : props.theme.darkGreyColor)};
  font-size: 12px;
  font-weight: ${(props) => (props.$active ? 750 : 650)};
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.darkBlueColor};
    color: ${(props) => (props.$active ? "#fff" : props.theme.darkBlueColor)};
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 53, 105, 0.2);
    outline-offset: 2px;
  }
`;

const FilterCount = styled.span`
  margin-left: 5px;
  opacity: 0.75;
`;

const Results = styled.div`
  margin-top: 52px;
`;

const YearSection = styled.section`
  & + & {
    margin-top: 52px;
  }
`;

const YearHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 16px;
  padding-bottom: 11px;
  border-bottom: 1px solid #dfe6ed;
`;

const YearLabel = styled.h2`
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const YearCount = styled.span`
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

const PublicationList = styled.ol`
  display: grid;
  gap: 12px;
`;

const PublicationItem = styled.li`
  display: grid;
  grid-template-columns: minmax(112px, auto) minmax(0, 1fr) auto;
  align-items: start;
  gap: 20px;
  padding: 23px 24px;
  border: 1px solid #e1e7ed;
  border-radius: 13px;
  background: #fff;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: #c8d4df;
    transform: translateY(-2px);
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 21px;
  }
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  justify-self: start;
  height: 24px;
  padding: 0 9px;
  border-radius: 6px;
  box-sizing: border-box;
  background: ${(props) => {
    if (props.$category === "international_journal_sci") return "#ebf4ff";
    if (props.$category === "international_journal_scopus") return "#eef9f2";
    if (props.$category === "international_conference") return "#fff5e7";
    if (props.$category === "domestic_journal") return "#fdf0f7";
    return "#f1f3f6";
  }};
  color: ${(props) => {
    if (props.$category === "international_journal_sci") return "#003569";
    if (props.$category === "international_journal_scopus") return "#276749";
    if (props.$category === "international_conference") return "#7c4a00";
    if (props.$category === "domestic_journal") return "#702459";
    return props.theme.darkGreyColor;
  }};
  font-size: 10px;
  font-weight: 800;
  line-height: 1.35;
  text-align: center;
  white-space: nowrap;
`;

const PublicationContent = styled.div`
  min-width: 0;
`;

const PublicationTitle = styled.h3`
  color: #1a2537;
  font-size: 16px;
  font-weight: 750;
  letter-spacing: -0.01em;
  line-height: 1.55;
`;

const Authors = styled.p`
  margin-top: 7px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.55;
`;

const Bibliography = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  margin-top: 10px;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 12px;
  line-height: 1.5;
`;

const Venue = styled.cite`
  color: ${(props) => props.theme.darkBlueColor};
  font-style: normal;
  font-weight: 700;
`;

const DateText = styled.span`
  font-weight: 650;
`;

const Metric = styled.span`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 7px;
  border-radius: 5px;
  box-sizing: border-box;
  background: #f0f3f6;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 11px;
  font-weight: 750;
  line-height: 1.35;
  white-space: nowrap;
`;

const PaperLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 7px 11px;
  border: 1px solid #d5dfe8;
  border-radius: 8px;
  color: ${(props) => props.theme.darkBlueColor};
  font-size: 12px;
  font-weight: 750;
  white-space: nowrap;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${(props) => props.theme.darkBlueColor};
    background: #f5f8fb;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 53, 105, 0.2);
    outline-offset: 2px;
  }

  @media (max-width: 720px) {
    justify-self: start;
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

const getPublicationDate = (publication) => {
  if (!publication.year) return null;
  const month = Number(publication.month);
  const monthLabel =
    month >= 1 && month <= 12 ? MONTH_LABELS[month - 1] : null;
  return monthLabel
    ? `${publication.year} · ${monthLabel}`
    : String(publication.year);
};

const Publications = () => {
  const { publications, loading, error } = usePublications();
  const [activeFilter, setActiveFilter] = useState("all");

  const allPublications = useMemo(
    () =>
      CATEGORY_ORDER.flatMap((category) =>
        (publications[category] || []).map((publication) => ({
          ...publication,
          category,
        })),
      ).sort(
        (publicationA, publicationB) =>
          Number(publicationB.year || 0) - Number(publicationA.year || 0) ||
          Number(publicationB.month || 0) - Number(publicationA.month || 0) ||
          Number(publicationA.display_order || 0) -
            Number(publicationB.display_order || 0),
      ),
    [publications],
  );

  const filteredPublications = useMemo(
    () =>
      activeFilter === "all"
        ? allPublications
        : allPublications.filter(
            (publication) => publication.category === activeFilter,
          ),
    [activeFilter, allPublications],
  );

  const featuredPublications = useMemo(
    () => getFeaturedPublications(allPublications),
    [allPublications],
  );

  const publicationsByYear = useMemo(() => {
    const grouped = new Map();

    filteredPublications.forEach((publication) => {
      const year = publication.year || "Year unavailable";
      if (!grouped.has(year)) grouped.set(year, []);
      grouped.get(year).push(publication);
    });

    return Array.from(grouped, ([year, yearPublications]) => ({
      year,
      publications: yearPublications,
    }));
  }, [filteredPublications]);

  return (
    <Page>
      <PageHeader>
        <Eyebrow>Research output</Eyebrow>
        <PageTitle>Publications</PageTitle>
        <PageDescription>
          Journal articles and conference papers from the Intelligent Data
          Analytics Laboratory.
        </PageDescription>
      </PageHeader>

      {loading && <StatusMessage>Loading publications…</StatusMessage>}
      {!loading && error && (
        <StatusMessage>
          Publication information is temporarily unavailable.
        </StatusMessage>
      )}
      {!loading && !error && allPublications.length === 0 && (
        <StatusMessage>No publications are available at this time.</StatusMessage>
      )}

      {!loading && !error && allPublications.length > 0 && (
        <Content>
          {featuredPublications.length > 0 && (
            <FeaturedSection aria-labelledby="featured-publications-title">
              <FeaturedHeader>
                <div>
                  <FeaturedEyebrow>Selected research</FeaturedEyebrow>
                  <FeaturedTitle id="featured-publications-title">
                    Featured publications
                  </FeaturedTitle>
                  <FeaturedDescription>
                    A curated selection of IDA Lab research contributions.
                  </FeaturedDescription>
                </div>
              </FeaturedHeader>

              <FeaturedList
                aria-label="Featured publication cards"
                tabIndex={0}
              >
                {featuredPublications.map((publication) => (
                  <FeaturedCard key={publication.id}>
                    <FeaturedMeta>
                      <FeaturedYear>{publication.year || "—"}</FeaturedYear>
                      <CategoryBadge $category={publication.category}>
                        {BADGE_SHORT[publication.category]}
                      </CategoryBadge>
                      {hasDistinctIndexType(publication) && (
                        <Metric>{publication.index_type}</Metric>
                      )}
                      {publication.impact_factor && (
                        <Metric>IF {publication.impact_factor}</Metric>
                      )}
                    </FeaturedMeta>
                    {publication.url ? (
                      <FeaturedTitleLink
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FeaturedPaperTitle>
                          {publication.title}
                        </FeaturedPaperTitle>
                        <FeaturedLinkIcon aria-hidden="true">
                          ↗
                        </FeaturedLinkIcon>
                      </FeaturedTitleLink>
                    ) : (
                      <FeaturedPaperTitle>
                        {publication.title}
                      </FeaturedPaperTitle>
                    )}
                    {publication.authors && (
                      <FeaturedAuthors>{publication.authors}</FeaturedAuthors>
                    )}
                    {publication.venue && (
                      <FeaturedVenue>{publication.venue}</FeaturedVenue>
                    )}
                  </FeaturedCard>
                ))}
              </FeaturedList>
            </FeaturedSection>
          )}

          <FilterPanel aria-labelledby="publication-filter-title">
            <FilterHeading>
              <FilterTitle id="publication-filter-title">
                Filter by publication type
              </FilterTitle>
              <ResultCount aria-live="polite">
                {filteredPublications.length}{" "}
                {filteredPublications.length === 1 ? "publication" : "publications"}
              </ResultCount>
            </FilterHeading>
            <FilterBar role="group" aria-label="Publication type filters">
              {FILTERS.map(({ key, label }) => {
                const count =
                  key === "all"
                    ? allPublications.length
                    : (publications[key] || []).length;

                return (
                  <FilterButton
                    key={key}
                    type="button"
                    $active={activeFilter === key}
                    onClick={() => setActiveFilter(key)}
                    aria-pressed={activeFilter === key}
                  >
                    {label}
                    <FilterCount>{count}</FilterCount>
                  </FilterButton>
                );
              })}
            </FilterBar>
          </FilterPanel>

          {publicationsByYear.length === 0 ? (
            <StatusMessage>
              No publications match the selected category.
            </StatusMessage>
          ) : (
            <Results>
              {publicationsByYear.map(({ year, publications: yearItems }) => (
                <YearSection
                  key={year}
                  aria-labelledby={`publications-${String(year)
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  <YearHeading>
                    <YearLabel
                      id={`publications-${String(year)
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {year}
                    </YearLabel>
                    <YearCount
                      aria-label={`${yearItems.length} publications in ${year}`}
                    >
                      {yearItems.length}
                    </YearCount>
                  </YearHeading>

                  <PublicationList>
                    {yearItems.map((publication) => {
                      const publicationDate = getPublicationDate(publication);

                      return (
                        <PublicationItem key={publication.id}>
                          <CategoryBadge $category={publication.category}>
                            {BADGE_SHORT[publication.category]}
                          </CategoryBadge>
                          <PublicationContent>
                            <PublicationTitle>
                              {publication.title}
                            </PublicationTitle>
                            {publication.authors && (
                              <Authors>{publication.authors}</Authors>
                            )}
                            <Bibliography>
                              {publication.venue && (
                                <Venue>{publication.venue}</Venue>
                              )}
                              {publicationDate && (
                                <DateText>{publicationDate}</DateText>
                              )}
                              {hasDistinctIndexType(publication) && (
                                <Metric>{publication.index_type}</Metric>
                              )}
                              {publication.impact_factor && (
                                <Metric>
                                  IF {publication.impact_factor}
                                </Metric>
                              )}
                            </Bibliography>
                          </PublicationContent>
                          {publication.url && (
                            <PaperLink
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open paper: ${publication.title}`}
                            >
                              View paper ↗
                            </PaperLink>
                          )}
                        </PublicationItem>
                      );
                    })}
                  </PublicationList>
                </YearSection>
              ))}
            </Results>
          )}
        </Content>
      )}
    </Page>
  );
};

export default Publications;
