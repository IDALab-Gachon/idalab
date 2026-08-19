import {
  canSelectFeaturedPublication,
  getFeaturedPublications,
  getImpactFactorValue,
  MAX_FEATURED_PUBLICATIONS,
} from "./publicationOrdering";

test("sorts featured publications by year and then impact factor", () => {
  const publications = [
    {
      id: "older-high-if",
      title: "Older high IF",
      year: 2025,
      impact_factor: "12.0",
      is_featured: true,
    },
    {
      id: "newer-low-if",
      title: "Newer low IF",
      year: 2026,
      impact_factor: "2.2",
      is_featured: true,
    },
    {
      id: "newer-high-if",
      title: "Newer high IF",
      year: 2026,
      impact_factor: "IF 6.2",
      is_featured: true,
    },
    {
      id: "not-featured",
      title: "Not featured",
      year: 2027,
      impact_factor: "20.0",
      is_featured: false,
    },
    {
      id: "oldest-featured",
      title: "Oldest featured",
      year: 2024,
      impact_factor: "15.0",
      is_featured: true,
    },
  ];

  expect(
    getFeaturedPublications(publications).map(({ id }) => id)
  ).toEqual(["newer-high-if", "newer-low-if", "older-high-if"]);
});

test("parses numeric impact factor values and puts missing values last", () => {
  expect(getImpactFactorValue("IF 6.2")).toBe(6.2);
  expect(getImpactFactorValue("")).toBe(Number.NEGATIVE_INFINITY);
});

test("allows at most three featured publications", () => {
  const publications = Array.from(
    { length: MAX_FEATURED_PUBLICATIONS },
    (_, index) => ({ id: index, is_featured: true })
  );

  expect(
    canSelectFeaturedPublication(publications, { is_featured: false })
  ).toBe(false);
  expect(
    canSelectFeaturedPublication(publications, publications[0])
  ).toBe(true);
});
