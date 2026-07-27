import { MAX_FEATURED_PUBLICATIONS } from "./publicationOrdering";

const isBlank = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "");

const editPath = (basePath, id) =>
  id ? `${basePath}?edit=${encodeURIComponent(id)}` : basePath;

const makeIssue = ({
  key,
  area,
  title,
  message,
  severity,
  path,
  actionLabel = "바로 수정",
}) => ({
  key,
  area,
  title,
  message,
  severity,
  path,
  actionLabel,
});

const AREA_ORDER = {
  Professor: 0,
  Members: 1,
  Publications: 2,
  Projects: 3,
  Gallery: 4,
};

export const buildContentHealth = ({
  members = null,
  professorDetails = null,
  publications = null,
  projects = null,
  galleryGroups = null,
}) => {
  const issues = [];
  const metrics = {
    professorAvailable: Array.isArray(members),
    activeMembers: null,
    publications: null,
    featuredPublications: null,
    projects: null,
    galleryAlbums: null,
    galleryPhotos: null,
  };

  const activeProfessor = Array.isArray(members)
    ? members.find(
        (member) =>
          member.role === "professor" && member.status === "active",
      )
    : null;

  if (Array.isArray(members)) {
    const activeMembers = members.filter(
      (member) => member.status === "active",
    );
    const nonProfessorMembers = activeMembers.filter(
      (member) => member.role !== "professor",
    );
    const alumni = members.filter((member) => member.status === "alumni");
    metrics.activeMembers = activeMembers.length;

    nonProfessorMembers.forEach((member) => {
      const missing = [];
      if (isBlank(member.photo_url)) missing.push("사진");
      if (isBlank(member.email)) missing.push("이메일");
      if (missing.length === 0) return;

      issues.push(
        makeIssue({
          key: `member-${member.id}`,
          area: "Members",
          title: member.name || "이름 없는 멤버",
          message: `${missing.join(", ")} 정보가 없습니다.`,
          severity: "urgent",
          path: editPath("/admin/members", member.id),
        }),
      );
    });

    const alumniMissingYear = alumni.filter((member) =>
      isBlank(member.graduation_year),
    ).length;
    if (alumniMissingYear > 0) {
      issues.push(
        makeIssue({
          key: "members-alumni-year",
          area: "Members",
          title: "Alumni 졸업 연도",
          message: `${alumniMissingYear}명의 졸업 연도가 입력되지 않았습니다.`,
          severity: "recommended",
          path: "/admin/members",
          actionLabel: "목록 보기",
        }),
      );
    }
  }

  if (Array.isArray(members) && Array.isArray(professorDetails)) {
    const details = activeProfessor
      ? professorDetails.find(
          (item) => item.member_id === activeProfessor.id,
        )
      : null;
    const missing = [];

    if (!activeProfessor) {
      missing.push("활성 교수 정보");
    } else {
      if (isBlank(activeProfessor.photo_url)) missing.push("사진");
      if (isBlank(activeProfessor.email)) missing.push("이메일");
      if (!details) {
        missing.push("상세 프로필");
      } else {
        if (isBlank(details.position_title)) missing.push("직책");
        if (isBlank(details.affiliation)) missing.push("소속");
        if (isBlank(details.office)) missing.push("연구실 위치");
        if (isBlank(details.telephone)) missing.push("전화번호");
        if (isBlank(details.bio_sketch)) missing.push("약력");
        if (
          !Array.isArray(details.research_interests) ||
          details.research_interests.length === 0
        ) {
          missing.push("연구 관심 분야");
        }
      }
    }

    if (missing.length > 0) {
      issues.push(
        makeIssue({
          key: "professor-profile",
          area: "Professor",
          title: "Professor 프로필",
          message: `${missing.join(", ")} 정보가 필요합니다.`,
          severity: "urgent",
          path: "/admin/professor",
        }),
      );
    }
  }

  if (Array.isArray(publications)) {
    metrics.publications = publications.length;
    const featured = publications.filter(
      (publication) => publication.is_featured,
    );
    metrics.featuredPublications = featured.length;

    if (featured.length !== MAX_FEATURED_PUBLICATIONS) {
      issues.push(
        makeIssue({
          key: "publications-featured-count",
          area: "Publications",
          title: "Featured publications",
          message: `${featured.length}/${MAX_FEATURED_PUBLICATIONS}편이 선택되어 있습니다.`,
          severity: "urgent",
          path: "/admin/publications",
          actionLabel: "선택 관리",
        }),
      );
    }

    featured
      .filter((publication) => isBlank(publication.url))
      .forEach((publication) => {
        issues.push(
          makeIssue({
            key: `publication-featured-url-${publication.id}`,
            area: "Publications",
            title: publication.title || "제목 없는 대표 논문",
            message: "대표 논문의 URL이 없습니다.",
            severity: "urgent",
            path: editPath("/admin/publications", publication.id),
          }),
        );
      });

    const latestYear = Math.max(
      0,
      ...publications.map((publication) =>
        Number(publication.year || 0),
      ),
    );
    const recentPublications = publications.filter(
      (publication) =>
        Number(publication.year || 0) >= latestYear - 1,
    );
    const recentMissingUrl = recentPublications.filter((publication) =>
      isBlank(publication.url),
    ).length;

    if (recentMissingUrl > 0) {
      issues.push(
        makeIssue({
          key: "publications-recent-url",
          area: "Publications",
          title: "최근 논문 링크",
          message: `최근 2개 연도의 논문 ${recentMissingUrl}편에 URL이 없습니다.`,
          severity: "recommended",
          path: "/admin/publications",
          actionLabel: "목록 보기",
        }),
      );
    }
  }

  if (Array.isArray(projects)) {
    metrics.projects = projects.length;
    projects.forEach((project) => {
      const required = [];
      const recommended = [];
      if (isBlank(project.start_year)) required.push("시작 연도");
      if (isBlank(project.description)) required.push("설명");
      if (isBlank(project.category_id)) required.push("카테고리");
      if (isBlank(project.url) && isBlank(project.pdf_url)) {
        recommended.push("관련 링크 또는 PDF");
      }
      if (required.length === 0 && recommended.length === 0) return;

      const missing = [...required, ...recommended];
      issues.push(
        makeIssue({
          key: `project-${project.id}`,
          area: "Projects",
          title: project.title || "제목 없는 프로젝트",
          message: `${missing.join(", ")} 정보가 없습니다.`,
          severity: required.length > 0 ? "urgent" : "recommended",
          path: editPath("/admin/projects", project.id),
        }),
      );
    });
  }

  if (Array.isArray(galleryGroups)) {
    metrics.galleryAlbums = galleryGroups.length;
    metrics.galleryPhotos = galleryGroups.reduce(
      (total, group) =>
        total + (group.gallery_photos || []).length,
      0,
    );

    galleryGroups.forEach((group) => {
      const missing = [];
      if (isBlank(group.label)) missing.push("행사명");
      if ((group.gallery_photos || []).length === 0) {
        missing.push("사진");
      }
      if (missing.length === 0) return;

      issues.push(
        makeIssue({
          key: `gallery-${group.id}`,
          area: "Gallery",
          title: group.label || `${group.year || "연도 미상"} 앨범`,
          message: `${missing.join(", ")} 정보가 없습니다.`,
          severity: isBlank(group.label) ? "urgent" : "recommended",
          path: editPath("/admin/gallery", group.id),
        }),
      );
    });
  }

  issues.sort(
    (issueA, issueB) =>
      Number(issueA.severity === "recommended") -
        Number(issueB.severity === "recommended") ||
      AREA_ORDER[issueA.area] - AREA_ORDER[issueB.area] ||
      issueA.title.localeCompare(issueB.title),
  );

  return {
    issues,
    urgentCount: issues.filter((issue) => issue.severity === "urgent")
      .length,
    recommendedCount: issues.filter(
      (issue) => issue.severity === "recommended",
    ).length,
    metrics,
  };
};
