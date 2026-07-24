export const getImpactFactorValue = (impactFactor) => {
  const match = String(impactFactor || "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.NEGATIVE_INFINITY;
};

export const MAX_FEATURED_PUBLICATIONS = 3;

export const compareFeaturedPublications = (publicationA, publicationB) => {
  const yearDifference =
    Number(publicationB.year || 0) - Number(publicationA.year || 0);
  if (yearDifference !== 0) return yearDifference;

  const impactFactorA = getImpactFactorValue(publicationA.impact_factor);
  const impactFactorB = getImpactFactorValue(publicationB.impact_factor);
  if (impactFactorA !== impactFactorB) return impactFactorB - impactFactorA;

  return (
    Number(publicationB.month || 0) - Number(publicationA.month || 0) ||
    (publicationA.title || "").localeCompare(publicationB.title || "")
  );
};

export const getFeaturedPublications = (
  publications,
  limit = MAX_FEATURED_PUBLICATIONS
) =>
  publications
    .filter((publication) => publication.is_featured)
    .sort(compareFeaturedPublications)
    .slice(0, limit);

export const canSelectFeaturedPublication = (
  publications,
  publication
) =>
  Boolean(publication?.is_featured) ||
  publications.filter((item) => item.is_featured).length <
    MAX_FEATURED_PUBLICATIONS;
