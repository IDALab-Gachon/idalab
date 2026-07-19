const getStartYear = (project) => {
  const year = Number(project.start_year);
  return Number.isFinite(year) && year > 0 ? year : Number.MIN_SAFE_INTEGER;
};

export const compareProjectsByDefault = (projectA, projectB) => {
  const statusDifference =
    Number(Boolean(projectA.end_year)) - Number(Boolean(projectB.end_year));

  if (statusDifference !== 0) return statusDifference;

  const yearDifference = getStartYear(projectB) - getStartYear(projectA);
  if (yearDifference !== 0) return yearDifference;

  return (projectA.title || "").localeCompare(projectB.title || "");
};

export const sortProjects = (projects, useManualOrder = false) =>
  [...projects].sort((projectA, projectB) => {
    if (useManualOrder) {
      const orderDifference =
        Number(projectA.display_order || 0) -
        Number(projectB.display_order || 0);
      if (orderDifference !== 0) return orderDifference;
    }

    return compareProjectsByDefault(projectA, projectB);
  });
