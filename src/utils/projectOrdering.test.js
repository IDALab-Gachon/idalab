import {
  compareProjectsByDefault,
  sortProjects,
} from "./projectOrdering";

const projects = [
  {
    id: "completed-early",
    title: "Completed early",
    start_year: 2018,
    end_year: 2020,
    display_order: 0,
  },
  {
    id: "ongoing-later",
    title: "Ongoing later",
    start_year: 2022,
    end_year: null,
    display_order: 1,
  },
  {
    id: "ongoing-earlier",
    title: "Ongoing earlier",
    start_year: 2019,
    end_year: null,
    display_order: 2,
  },
];

test("sorts ongoing projects first and then by descending start year", () => {
  expect([...projects].sort(compareProjectsByDefault).map(({ id }) => id)).toEqual([
    "ongoing-later",
    "ongoing-earlier",
    "completed-early",
  ]);
});

test("uses saved display order when a category is in manual mode", () => {
  expect(sortProjects(projects, true).map(({ id }) => id)).toEqual([
    "completed-early",
    "ongoing-later",
    "ongoing-earlier",
  ]);
});
