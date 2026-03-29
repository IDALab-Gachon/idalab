import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { usePublications, CATEGORY_ORDER } from "../hooks/usePublications";

// ── Styles ──────────────────────────────────────────────────
const PubContainer = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const PubTitle = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.redColor};
  margin-bottom: 24px;
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.redColor};
  padding: 10px;
`;

// Filter bar
const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
  padding: 0 4px;
`;

const FilterBtn = styled.button`
  padding: 6px 16px;
  min-width: 130px;
  border-radius: 20px;
  border: 1.5px solid ${(p) => (p.$active ? p.theme.darkBlueColor : "#d0d5dd")};
  background: ${(p) => (p.$active ? p.theme.darkBlueColor : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : "#555")};
  font-size: 13px;
  font-weight: ${(p) => (p.$active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:hover {
    border-color: ${(p) => p.theme.darkBlueColor};
    color: ${(p) => (p.$active ? "#fff" : p.theme.darkBlueColor)};
  }
`;

// Year group
const YearSection = styled.div`
  margin-bottom: 32px;
`;

const YearHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const YearLabel = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.darkBlueColor};
`;

const YearLine = styled.div`
  flex: 1;
  height: 1px;
  background: #e2e8f0;
`;

// Publication item
const PubList = styled.ul`
  list-style: none;
  padding: 0 0 0 54px;
  margin: 0;

  @media (max-width: 600px) {
    padding-left: 12px;
  }
`;

const PubItem = styled.li`
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const PubContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const PubItemTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1a2537;
  line-height: 1.5;
`;

const PubAuthors = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #666;
  line-height: 1.5;
`;

const PubMeta = styled.div`
  font-size: 13px;
  color: #555;
  line-height: 1.5;
`;

const DoiLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 8px;
  padding: 1px 7px;
  border-radius: 3px;
  border: 1px solid ${(p) => p.theme.darkBlueColor};
  color: ${(p) => p.theme.darkBlueColor};
  font-size: 11px;
  font-weight: 600;
  text-decoration: none;
  vertical-align: middle;
  transition: all 0.15s;

  &:hover {
    background: ${(p) => p.theme.darkBlueColor};
    color: #fff;
  }
`;

const CategoryBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  height: fit-content;
  margin-top: 2px;
  background: ${(p) => {
    if (p.$cat === "international_journal_sci") return "#ebf4ff";
    if (p.$cat === "international_journal_scopus") return "#f0fff4";
    if (p.$cat === "international_conference") return "#fff7eb";
    if (p.$cat === "domestic_journal") return "#fdf2f8";
    return "#f7f8fa";
  }};
  color: ${(p) => {
    if (p.$cat === "international_journal_sci") return "#003569";
    if (p.$cat === "international_journal_scopus") return "#276749";
    if (p.$cat === "international_conference") return "#7c4a00";
    if (p.$cat === "domestic_journal") return "#702459";
    return "#555";
  }};
`;

const BADGE_SHORT = {
  international_journal_sci: "SCIE",
  international_journal_scopus: "SCOPUS",
  international_conference: "Int'l Conf.",
  domestic_journal: "Korean J.",
  domestic_conference: "Korean Conf.",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "international_journal_sci", label: "SCIE" },
  { key: "international_journal_scopus", label: "SCOPUS" },
  { key: "international_conference", label: "Int'l Conference" },
  { key: "domestic_journal", label: "Korean Journal" },
  { key: "domestic_conference", label: "Korean Conference" },
];

// ── Component ────────────────────────────────────────────────
const Publications = () => {
  const { publications, loading } = usePublications();
  const [activeFilter, setActiveFilter] = useState("all");

  // Flatten all publications into a single array
  const allPubs = useMemo(() => {
    return CATEGORY_ORDER.flatMap((cat) =>
      (publications[cat] || []).map((p) => ({ ...p, category: cat })),
    );
  }, [publications]);

  // Apply filter
  const filtered = useMemo(() => {
    if (activeFilter === "all") return allPubs;
    return allPubs.filter((p) => p.category === activeFilter);
  }, [allPubs, activeFilter]);

  // Group by year (descending), null/undefined year goes to "–"
  const byYear = useMemo(() => {
    const map = {};
    filtered.forEach((p) => {
      const y = p.year ?? "–";
      if (!map[y]) map[y] = [];
      map[y].push(p);
    });
    // Sort years descending; "–" goes last
    const sorted = Object.keys(map).sort((a, b) => {
      if (a === "–") return 1;
      if (b === "–") return -1;
      return Number(b) - Number(a);
    });
    return sorted.map((y) => ({ year: y, pubs: map[y] }));
  }, [filtered]);

  if (loading)
    return (
      <PubContainer>
        <PubTitle>
          <TitleText>PUBLICATIONS</TitleText>
        </PubTitle>
        <p style={{ padding: "0 4px", color: "#999" }}>Loading...</p>
      </PubContainer>
    );

  return (
    <PubContainer>
      <PubTitle>
        <TitleText>PUBLICATIONS</TitleText>
      </PubTitle>

      {/* Filter buttons */}
      <FilterBar>
        {FILTERS.map(({ key, label }) => (
          <FilterBtn
            key={key}
            $active={activeFilter === key}
            onClick={() => setActiveFilter(key)}
          >
            {label}
            {key !== "all" && (
              <span style={{ marginLeft: 5, opacity: 0.75 }}>
                ({(publications[key] || []).length})
              </span>
            )}
          </FilterBtn>
        ))}
      </FilterBar>

      {/* Year-grouped list */}
      {byYear.length === 0 && (
        <p style={{ color: "#999", fontSize: 14 }}>No publications found.</p>
      )}
      {byYear.map(({ year, pubs }) => (
        <YearSection key={year}>
          <YearHeading>
            <YearLabel>{year}</YearLabel>
            <YearLine />
          </YearHeading>
          <PubList>
            {pubs.map((pub) => (
              <PubItem key={pub.id}>
                <CategoryBadge $cat={pub.category}>
                  {BADGE_SHORT[pub.category]}
                </CategoryBadge>
                <PubContent>
                  <PubItemTitle>
                    {pub.title}
                    {pub.url && (
                      <DoiLink
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Paper ↗
                      </DoiLink>
                    )}
                  </PubItemTitle>
                  {pub.authors && <PubAuthors>{pub.authors}</PubAuthors>}
                  <PubMeta>
                    {pub.venue}
                    {pub.year &&
                      `, ${pub.year}${pub.month ? ` (${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][pub.month - 1]})` : ""}`}
                    .
                    {(pub.index_type || pub.impact_factor) && (
                      <>
                        {" "}
                        ({pub.index_type}
                        {pub.impact_factor && (
                          <>
                            , <b>IF: {pub.impact_factor}</b>
                          </>
                        )}
                        )
                      </>
                    )}
                  </PubMeta>
                </PubContent>
              </PubItem>
            ))}
          </PubList>
        </YearSection>
      ))}
    </PubContainer>
  );
};

export default Publications;
