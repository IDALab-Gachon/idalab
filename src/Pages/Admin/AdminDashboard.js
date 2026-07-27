import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { supabase } from "../../lib/supabase";
import { buildContentHealth } from "../../utils/contentHealth";
import { MAX_FEATURED_PUBLICATIONS } from "../../utils/publicationOrdering";

const PageHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PageTitle = styled.h1`
  color: #1e2a3a;
  font-size: 24px;
  font-weight: 750;
`;

const PageDescription = styled.p`
  margin-top: 7px;
  color: #667085;
  font-size: 14px;
  line-height: 1.55;
`;

const RefreshButton = styled.button`
  flex: 0 0 auto;
  padding: 8px 14px;
  border: 1px solid #cbd5df;
  border-radius: 6px;
  background: #fff;
  color: #003569;
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: #003569;
    background: #f7fafc;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.55;
  }
`;

const Alert = styled.div`
  margin-bottom: 18px;
  padding: 12px 15px;
  border: 1px solid #f2c6c6;
  border-radius: 7px;
  background: #fff6f6;
  color: #a33131;
  font-size: 13px;
  line-height: 1.5;
`;

const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 24px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  padding: 19px 20px;
  border: 1px solid
    ${(props) =>
      props.$tone === "urgent"
        ? "#f0c3c3"
        : props.$tone === "recommended"
          ? "#efd9a8"
          : "#c7dfd0"};
  border-radius: 10px;
  background:
    ${(props) =>
      props.$tone === "urgent"
        ? "#fff8f8"
        : props.$tone === "recommended"
          ? "#fffbf1"
          : "#f5fbf7"};
`;

const SummaryLabel = styled.p`
  color: #667085;
  font-size: 12px;
  font-weight: 650;
`;

const SummaryValue = styled.p`
  margin-top: 7px;
  color: #1e2a3a;
  font-size: 27px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const SummaryHint = styled.p`
  margin-top: 5px;
  color: #7b8491;
  font-size: 11px;
`;

const Section = styled.section`
  margin-bottom: 24px;
  padding: 22px;
  border: 1px solid #e1e6eb;
  border-radius: 10px;
  background: #fff;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
  color: #1e2a3a;
  font-size: 17px;
  font-weight: 750;
`;

const SectionMeta = styled.p`
  color: #7b8491;
  font-size: 12px;
`;

const IssueList = styled.ul`
  display: grid;
  gap: 9px;
`;

const IssueItem = styled.li`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 13px;
  padding: 13px 14px;
  border: 1px solid #e7ebef;
  border-radius: 8px;
  background: #fbfcfd;

  @media (max-width: 680px) {
    grid-template-columns: auto minmax(0, 1fr);
  }
`;

const Severity = styled.span`
  min-width: 64px;
  padding: 4px 7px;
  border-radius: 12px;
  background: ${(props) =>
    props.$severity === "urgent" ? "#fde8e8" : "#fff2cf"};
  color: ${(props) =>
    props.$severity === "urgent" ? "#b42318" : "#8a5b00"};
  font-size: 10px;
  font-weight: 750;
  text-align: center;
`;

const IssueArea = styled.span`
  color: #667085;
  font-size: 11px;
  font-weight: 700;
`;

const IssueTitle = styled.p`
  overflow: hidden;
  margin-top: 2px;
  color: #1e2a3a;
  font-size: 13px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IssueMessage = styled.p`
  margin-top: 3px;
  color: #667085;
  font-size: 12px;
  line-height: 1.45;
`;

const ActionLink = styled(Link)`
  padding: 7px 10px;
  border: 1px solid #cbd5df;
  border-radius: 5px;
  color: #003569;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;

  &:hover {
    border-color: #003569;
    background: #f4f8fb;
    color: #003569;
  }

  @media (max-width: 680px) {
    grid-column: 2;
    justify-self: start;
  }
`;

const HealthyState = styled.div`
  padding: 28px;
  border: 1px dashed #bdd4c5;
  border-radius: 8px;
  background: #f7fbf8;
  color: #28623d;
  font-size: 13px;
  text-align: center;
`;

const PageGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 11px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 660px) {
    grid-template-columns: 1fr;
  }
`;

const PageCard = styled(Link)`
  min-width: 0;
  padding: 15px;
  border: 1px solid #e1e6eb;
  border-radius: 8px;
  background: #fff;
  color: #1e2a3a;

  &:hover {
    border-color: #9eb3c5;
    color: #003569;
    transform: translateY(-1px);
  }
`;

const PageCardTitle = styled.h3`
  font-size: 13px;
  font-weight: 750;
`;

const PageCardMeta = styled.p`
  margin-top: 8px;
  color: #667085;
  font-size: 11px;
  line-height: 1.5;
`;

const LoadingState = styled.p`
  padding: 36px;
  color: #667085;
  text-align: center;
`;

const AdminDashboard = () => {
  const [snapshot, setSnapshot] = useState({
    members: null,
    professorDetails: null,
    publications: null,
    projects: null,
    galleryGroups: null,
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [checkedAt, setCheckedAt] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    const requests = [
      [
        "Members",
        "members",
        supabase
          .from("members")
          .select(
            "id,name,role,status,email,photo_url,graduation_year,current_organization",
          ),
      ],
      [
        "Professor",
        "professorDetails",
        supabase.from("professor_details").select("*"),
      ],
      [
        "Publications",
        "publications",
        supabase
          .from("publications")
          .select(
            "id,title,year,category,url,impact_factor,is_featured",
          ),
      ],
      [
        "Projects",
        "projects",
        supabase
          .from("projects")
          .select(
            "id,title,start_year,end_year,description,url,pdf_url,category_id",
          ),
      ],
      [
        "Gallery",
        "galleryGroups",
        supabase
          .from("gallery_groups")
          .select("id,year,label,gallery_photos(id)"),
      ],
    ];

    const results = await Promise.all(
      requests.map(([, , request]) => request),
    );
    const nextSnapshot = {};
    const nextErrors = [];

    results.forEach((result, index) => {
      const [label, key] = requests[index];
      if (result.error) {
        nextSnapshot[key] = null;
        nextErrors.push(`${label}: ${result.error.message}`);
      } else {
        nextSnapshot[key] = result.data || [];
      }
    });

    setSnapshot(nextSnapshot);
    setErrors(nextErrors);
    setCheckedAt(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const health = useMemo(
    () => buildContentHealth(snapshot),
    [snapshot],
  );

  const pageCards = [
    {
      title: "Professor",
      path: "/admin/professor",
      meta:
        snapshot.members === null ||
        snapshot.professorDetails === null
          ? "상태 확인 불가"
          : `${health.issues.filter((issue) => issue.area === "Professor").length}개 확인 필요`,
    },
    {
      title: "Members",
      path: "/admin/members",
      meta:
        health.metrics.activeMembers === null
          ? "상태 확인 불가"
          : `활성 ${health.metrics.activeMembers}명 · ${health.issues.filter((issue) => issue.area === "Members").length}개 확인 필요`,
    },
    {
      title: "Publications",
      path: "/admin/publications",
      meta:
        health.metrics.publications === null
          ? "상태 확인 불가"
          : `전체 ${health.metrics.publications}편 · Featured ${health.metrics.featuredPublications}/${MAX_FEATURED_PUBLICATIONS}`,
    },
    {
      title: "Projects",
      path: "/admin/projects",
      meta:
        health.metrics.projects === null
          ? "상태 확인 불가"
          : `전체 ${health.metrics.projects}개 · ${health.issues.filter((issue) => issue.area === "Projects").length}개 확인 필요`,
    },
    {
      title: "Gallery",
      path: "/admin/gallery",
      meta:
        health.metrics.galleryAlbums === null
          ? "상태 확인 불가"
          : `행사 ${health.metrics.galleryAlbums}개 · 사진 ${health.metrics.galleryPhotos}장`,
    },
  ];

  return (
    <AdminLayout>
      <PageHeader>
        <div>
          <PageTitle>Content Dashboard</PageTitle>
          <PageDescription>
            공개 홈페이지에서 보완할 콘텐츠를 확인하고 편집 화면으로
            바로 이동합니다.
            {checkedAt &&
              ` · 마지막 확인 ${checkedAt.toLocaleString("ko-KR")}`}
          </PageDescription>
        </div>
        <RefreshButton onClick={loadDashboard} disabled={loading}>
          {loading ? "확인 중..." : "새로고침"}
        </RefreshButton>
      </PageHeader>

      {errors.length > 0 && (
        <Alert>
          일부 정보를 불러오지 못했습니다. 나머지 점검 결과만
          표시합니다.
          <br />
          {errors.join(" · ")}
        </Alert>
      )}

      {loading && !checkedAt ? (
        <LoadingState>콘텐츠 상태를 확인하고 있습니다...</LoadingState>
      ) : (
        <>
          <SummaryGrid aria-label="콘텐츠 점검 요약">
            <SummaryCard $tone="urgent">
              <SummaryLabel>즉시 확인</SummaryLabel>
              <SummaryValue>{health.urgentCount}</SummaryValue>
              <SummaryHint>공개 화면에 영향을 줄 수 있는 항목</SummaryHint>
            </SummaryCard>
            <SummaryCard $tone="recommended">
              <SummaryLabel>보완 권장</SummaryLabel>
              <SummaryValue>{health.recommendedCount}</SummaryValue>
              <SummaryHint>추가하면 콘텐츠가 더 완성되는 항목</SummaryHint>
            </SummaryCard>
            <SummaryCard $tone="healthy">
              <SummaryLabel>Featured publications</SummaryLabel>
              <SummaryValue>
                {health.metrics.featuredPublications ?? "—"}/
                {MAX_FEATURED_PUBLICATIONS}
              </SummaryValue>
              <SummaryHint>메인 화면 대표 논문 선택 상태</SummaryHint>
            </SummaryCard>
          </SummaryGrid>

          <Section aria-labelledby="content-issues-title">
            <SectionHeader>
              <SectionTitle id="content-issues-title">
                수정이 필요한 콘텐츠
              </SectionTitle>
              <SectionMeta>{health.issues.length}개 항목</SectionMeta>
            </SectionHeader>

            {health.issues.length === 0 ? (
              <HealthyState>
                현재 점검 기준에서 수정이 필요한 콘텐츠가 없습니다.
              </HealthyState>
            ) : (
              <IssueList>
                {health.issues.map((issue) => (
                  <IssueItem key={issue.key}>
                    <Severity $severity={issue.severity}>
                      {issue.severity === "urgent"
                        ? "즉시 확인"
                        : "보완 권장"}
                    </Severity>
                    <div>
                      <IssueArea>{issue.area}</IssueArea>
                      <IssueTitle title={issue.title}>
                        {issue.title}
                      </IssueTitle>
                      <IssueMessage>{issue.message}</IssueMessage>
                    </div>
                    <ActionLink to={issue.path}>
                      {issue.actionLabel}
                    </ActionLink>
                  </IssueItem>
                ))}
              </IssueList>
            )}
          </Section>

          <Section aria-labelledby="content-pages-title">
            <SectionHeader>
              <SectionTitle id="content-pages-title">
                페이지별 상태
              </SectionTitle>
            </SectionHeader>
            <PageGrid>
              {pageCards.map((page) => (
                <PageCard key={page.path} to={page.path}>
                  <PageCardTitle>{page.title}</PageCardTitle>
                  <PageCardMeta>{page.meta}</PageCardMeta>
                </PageCard>
              ))}
            </PageGrid>
          </Section>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
