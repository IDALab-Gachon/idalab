import { buildContentHealth } from "./contentHealth";

test("builds actionable content issues and summary metrics", () => {
  const result = buildContentHealth({
    members: [
      {
        id: "professor",
        name: "Professor",
        role: "professor",
        status: "active",
        email: "professor@example.com",
        photo_url: "professor.jpg",
      },
      {
        id: "student",
        name: "Student",
        role: "ms_student",
        status: "active",
        email: "",
        photo_url: "",
      },
      {
        id: "alumni",
        name: "Alumni",
        role: "ms_student",
        status: "alumni",
        graduation_year: null,
      },
    ],
    professorDetails: [
      {
        member_id: "professor",
        position_title: "Professor",
        affiliation: "Gachon University",
        office: "AI Building",
        telephone: "1234",
        bio_sketch: "Biography",
        research_interests: [{ title: "AI", items: [] }],
      },
    ],
    publications: [
      {
        id: "featured",
        title: "Featured paper",
        year: 2026,
        is_featured: true,
        url: "",
      },
      {
        id: "recent",
        title: "Recent paper",
        year: 2025,
        is_featured: false,
        url: "",
      },
    ],
    projects: [
      {
        id: "project",
        title: "Project",
        start_year: null,
        description: "",
        category_id: null,
        url: "",
        pdf_url: "",
      },
    ],
    galleryGroups: [
      {
        id: "album",
        year: 2026,
        label: "",
        gallery_photos: [],
      },
    ],
  });

  expect(result.metrics).toEqual(
    expect.objectContaining({
      activeMembers: 2,
      publications: 2,
      featuredPublications: 1,
      projects: 1,
      galleryAlbums: 1,
      galleryPhotos: 0,
    }),
  );
  expect(result.urgentCount).toBeGreaterThan(0);
  expect(result.recommendedCount).toBeGreaterThan(0);
  expect(result.issues).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        key: "member-student",
        path: "/admin/members?edit=student",
        severity: "urgent",
      }),
      expect.objectContaining({
        key: "publication-featured-url-featured",
        path: "/admin/publications?edit=featured",
      }),
      expect.objectContaining({
        key: "project-project",
        path: "/admin/projects?edit=project",
      }),
      expect.objectContaining({
        key: "gallery-album",
        path: "/admin/gallery?edit=album",
      }),
    ]),
  );
});
