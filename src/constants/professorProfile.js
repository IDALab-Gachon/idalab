export const DEFAULT_PROFESSOR_PROFILE = Object.freeze({
  position_title: "Professor",
  affiliation:
    "School of Computing\nCollege of IT Convergence\nGachon University",
  office: "#425, AI Building, Gachon University, Republic of Korea",
  telephone: "+82-31-750-5831",
  orcid_url: "https://orcid.org/0000-0003-2182-1679",
  google_scholar_url:
    "https://scholar.google.com/citations?user=pVQaeC8AAAAJ&hl=ko&oi=sra",
  scopus_url:
    "https://www.scopus.com/authid/detail.uri?authorId=6604013896",
});

export const getProfessorProfile = (details) =>
  Object.keys(DEFAULT_PROFESSOR_PROFILE).reduce((profile, key) => {
    profile[key] = details?.[key] ?? DEFAULT_PROFESSOR_PROFILE[key];
    return profile;
  }, {});
