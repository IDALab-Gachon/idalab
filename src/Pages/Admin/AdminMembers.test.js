import { buildMemberPayload } from "./AdminMembers";

jest.mock("../../Components/Admin/AdminLayout", () => ({ children }) => children);
jest.mock("../../Components/Admin/ImageUploader", () => () => null);
jest.mock("../../lib/supabase", () => ({
  supabase: {},
}));

test("normalizes optional member fields and only includes editable columns", () => {
  const payload = buildMemberPayload({
    id: "member-id",
    created_at: "2026-07-19T00:00:00Z",
    name: "  New Member  ",
    role: "ms_student",
    status: "active",
    email: "  member@example.com  ",
    website: "  https://example.com  ",
    photo_url: "https://example.com/member.jpg",
    bio: "  Member biography.  ",
    final_degree: "",
    graduation_year: "",
    current_organization: "",
    display_order: "3",
  });

  expect(payload).toEqual({
    name: "New Member",
    role: "ms_student",
    status: "active",
    email: "member@example.com",
    website: "https://example.com",
    photo_url: "https://example.com/member.jpg",
    bio: "Member biography.",
    final_degree: null,
    graduation_year: null,
    current_organization: "",
    display_order: 3,
  });
  expect(payload).not.toHaveProperty("id");
  expect(payload).not.toHaveProperty("created_at");
});
