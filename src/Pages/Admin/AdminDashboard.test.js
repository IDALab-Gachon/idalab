import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { supabase } from "../../lib/supabase";

jest.mock("../../Components/Admin/AdminLayout", () => ({ children }) => children);
jest.mock("../../lib/supabase", () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const tableData = {
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
  ],
  professor_details: [
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
      id: "paper",
      title: "Featured paper",
      year: 2026,
      is_featured: true,
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
  gallery_groups: [
    {
      id: "album",
      year: 2026,
      label: "",
      gallery_photos: [],
    },
  ],
};

beforeEach(() => {
  supabase.from.mockImplementation((table) => ({
    select: jest.fn(async () => ({
      data: tableData[table],
      error: null,
    })),
  }));
});

test("shows content issues with direct edit links", async () => {
  const { getAllByRole, getByRole, getByText } = render(
    <MemoryRouter>
      <AdminDashboard />
    </MemoryRouter>,
  );

  expect(
    getByRole("heading", { name: "Content Dashboard" }),
  ).toBeInTheDocument();
  await waitFor(() =>
    expect(getByText("Student")).toBeInTheDocument(),
  );
  expect(
    getAllByRole("link", { name: "바로 수정" }).some(
      (link) =>
        link.getAttribute("href") ===
        "/admin/members?edit=student",
    ),
  ).toBe(true);
  expect(
    getByRole("link", { name: /^Members/ }),
  ).toHaveAttribute("href", "/admin/members");
});
