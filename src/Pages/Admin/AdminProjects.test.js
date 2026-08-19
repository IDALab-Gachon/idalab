import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AdminProjects from "./AdminProjects";
import { supabase } from "../../lib/supabase";

jest.mock("../../Components/Admin/AdminLayout", () => ({ children }) => children);
jest.mock("../../lib/supabase", () => ({
  supabase: {
    __data: {
      categories: [],
      projects: [],
    },
    from: jest.fn(),
    storage: {
      from: jest.fn(),
    },
  },
}));

const makeBuilder = (table) => {
  let operation = "select";
  let payload;
  const filters = [];
  const orders = [];

  const getRows = () =>
    table === "project_categories"
      ? supabase.__data.categories
      : supabase.__data.projects;

  const execute = async () => {
    const rows = getRows();
    const matches = (row) =>
      filters.every(({ column, value }) => row[column] === value);

    if (operation === "insert") {
      const inserted = {
        id: `${table}-${rows.length + 1}`,
        ...payload,
      };
      rows.push(inserted);
      return { data: inserted, error: null };
    }

    if (operation === "update") {
      rows.filter(matches).forEach((row) => Object.assign(row, payload));
      return { data: null, error: null };
    }

    if (operation === "delete") {
      for (let index = rows.length - 1; index >= 0; index -= 1) {
        if (matches(rows[index])) rows.splice(index, 1);
      }
      return { data: null, error: null };
    }

    const selected = rows.filter(matches).map((row) => ({ ...row }));
    selected.sort((rowA, rowB) => {
      for (const { column, ascending } of orders) {
        const difference =
          typeof rowA[column] === "string"
            ? rowA[column].localeCompare(rowB[column])
            : Number(rowA[column] || 0) - Number(rowB[column] || 0);
        if (difference !== 0) return ascending ? difference : -difference;
      }
      return 0;
    });
    return { data: selected, error: null };
  };

  const builder = {
    select: jest.fn(() => builder),
    order: jest.fn((column, options = {}) => {
      orders.push({ column, ascending: options.ascending !== false });
      return builder;
    }),
    eq: jest.fn((column, value) => {
      filters.push({ column, value });
      return builder;
    }),
    insert: jest.fn((nextPayload) => {
      operation = "insert";
      payload = nextPayload;
      return builder;
    }),
    update: jest.fn((nextPayload) => {
      operation = "update";
      payload = nextPayload;
      return builder;
    }),
    delete: jest.fn(() => {
      operation = "delete";
      return builder;
    }),
    then: (resolve, reject) => execute().then(resolve, reject),
  };

  return builder;
};

beforeEach(() => {
  window.history.replaceState({}, "", "/");
  Element.prototype.scrollIntoView = jest.fn();
  supabase.__data.categories = [
    {
      id: "research",
      name: "Research Projects",
      display_order: 0,
      manual_order: false,
    },
    {
      id: "other",
      name: "Other",
      display_order: 1,
      manual_order: false,
    },
  ];
  supabase.__data.projects = [
    {
      id: "completed",
      title: "Completed project",
      category_id: "research",
      category: "Research Projects",
      start_year: 2018,
      end_year: 2020,
      display_order: 0,
    },
    {
      id: "ongoing-later",
      title: "Ongoing later project",
      category_id: "research",
      category: "Research Projects",
      start_year: 2022,
      end_year: null,
      display_order: 1,
    },
    {
      id: "ongoing-earlier",
      title: "Ongoing earlier project",
      category_id: "research",
      category: "Research Projects",
      start_year: 2019,
      end_year: null,
      display_order: 2,
    },
  ];
  supabase.from.mockImplementation(makeBuilder);
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
});

test("opens the requested project from a dashboard edit link", async () => {
  window.history.replaceState(
    {},
    "",
    "/admin/projects?edit=ongoing-later",
  );
  const { getByLabelText, getByText } = render(<AdminProjects />);

  await waitFor(() =>
    expect(getByText("프로젝트 편집")).toBeInTheDocument(),
  );
  expect(getByLabelText("프로젝트명 *")).toHaveValue(
    "Ongoing later project",
  );
});

test("manages categories and switches project ordering from automatic to manual", async () => {
  const {
    getAllByRole,
    getAllByText,
    getByLabelText,
    getByRole,
    getByText,
  } = render(<AdminProjects />);

  await waitFor(() =>
    expect(getAllByText("Research Projects").length).toBeGreaterThan(0)
  );
  expect(getByLabelText("카테고리 *")).toHaveValue("research");
  expect(
    getAllByRole("article").map((row) => row.textContent)
  ).toEqual([
    expect.stringContaining("Ongoing later project"),
    expect.stringContaining("Ongoing earlier project"),
    expect.stringContaining("Completed project"),
  ]);

  fireEvent.change(getByLabelText("새 카테고리명"), {
    target: { value: "Industry Projects" },
  });
  fireEvent.click(getByRole("button", { name: "카테고리 추가" }));

  await waitFor(() =>
    expect(getAllByText("Industry Projects").length).toBeGreaterThan(0)
  );
  expect(
    supabase.__data.categories.some(
      (category) => category.name === "Industry Projects"
    )
  ).toBe(true);

  fireEvent.click(
    getByRole("button", { name: "Ongoing earlier project 위로 이동" })
  );

  await waitFor(() =>
    expect(
      supabase.__data.categories.find(
        (category) => category.id === "research"
      ).manual_order
    ).toBe(true)
  );
  expect(getAllByRole("article")[0]).toHaveTextContent(
    "Ongoing earlier project"
  );
  expect(getByText("수동 순서")).toBeInTheDocument();
});
