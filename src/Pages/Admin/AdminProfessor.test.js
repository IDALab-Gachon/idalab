import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AdminProfessor from "./AdminProfessor";
import { supabase } from "../../lib/supabase";

jest.mock("../../Components/Admin/AdminLayout", () => ({ children }) => children);
jest.mock("../../Components/Admin/ImageUploader", () => () => "Image uploader");

jest.mock("../../lib/supabase", () => ({
  supabase: {
    __updates: [],
    from: jest.fn(),
  },
}));

beforeEach(() => {
  const professor = {
    id: "professor-id",
    name: "Prof. OkRan Jeong",
    email: "professor@example.com",
    photo_url: "professor.jpg",
  };
  const details = {
    id: "details-id",
    member_id: "professor-id",
    position_title: "Professor",
    affiliation: "School of Computing\nGachon University",
    office: "Room 425",
    telephone: "+82-31-750-5831",
    orcid_url: "https://orcid.org/original",
    google_scholar_url: "https://scholar.google.com/original",
    scopus_url: "https://www.scopus.com/original",
    bio_sketch: "Biography from admin.",
    research_interests: [],
    experiences: [],
  };

  supabase.__updates.length = 0;
  supabase.from.mockImplementation((table) => {
    let operation = "select";
    const builder = {
      select: jest.fn(() => builder),
      eq: jest.fn(() => builder),
      single: jest.fn(async () => ({
        data: table === "members" ? professor : details,
        error: null,
      })),
      update: jest.fn((payload) => {
        operation = "update";
        supabase.__updates.push({ table, payload });
        return builder;
      }),
      then: (resolve, reject) =>
        Promise.resolve({
          data: operation === "update" ? null : details,
          error: null,
        }).then(resolve, reject),
    };
    return builder;
  });
  window.alert = jest.fn();
});

test("loads and saves professor profile fields managed by admin", async () => {
  const { getByLabelText, getByRole, getByText } = render(
    <AdminProfessor />
  );

  await waitFor(() =>
    expect(getByText("기본 정보 및 연락처")).toBeInTheDocument()
  );
  expect(getByLabelText("소속")).toHaveValue(
    "School of Computing\nGachon University"
  );
  expect(getByLabelText("연구실 / 주소")).toHaveValue("Room 425");
  expect(getByLabelText("전화번호")).toHaveValue("+82-31-750-5831");
  expect(getByLabelText("약력")).toHaveValue("Biography from admin.");

  fireEvent.change(getByLabelText("ORCID URL"), {
    target: { value: "https://orcid.org/updated" },
  });
  fireEvent.click(getByRole("button", { name: "기본 정보 저장" }));

  await waitFor(() =>
    expect(
      supabase.__updates.find(
        ({ table }) => table === "professor_details"
      )?.payload
    ).toEqual(
      expect.objectContaining({
        affiliation: "School of Computing\nGachon University",
        office: "Room 425",
        telephone: "+82-31-750-5831",
        orcid_url: "https://orcid.org/updated",
        bio_sketch: "Biography from admin.",
      })
    )
  );
});
