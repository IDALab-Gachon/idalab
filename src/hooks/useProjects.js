import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { sortProjects } from "../utils/projectOrdering";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const [projectResult, categoryResult] = await Promise.all([
        supabase.from("projects").select("*"),
        supabase
          .from("project_categories")
          .select("*")
          .order("display_order")
          .order("name"),
      ]);

      const fetchError = projectResult.error || categoryResult.error;
      if (fetchError) {
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      setProjects(projectResult.data || []);
      setCategories(categoryResult.data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const categoryGroups = useMemo(() => {
    const knownCategoryIds = new Set(categories.map((category) => category.id));
    const groups = categories
      .map((category) => ({
        ...category,
        projects: sortProjects(
          projects.filter((project) => project.category_id === category.id),
          category.manual_order,
        ),
      }))
      .filter((category) => category.projects.length > 0);

    const legacyProjects = projects.filter(
      (project) => !knownCategoryIds.has(project.category_id),
    );
    const legacyGroups = legacyProjects.reduce((result, project) => {
      const categoryName = project.category || "Other";
      let group = result.find((item) => item.name === categoryName);
      if (!group) {
        group = {
          id: `legacy-${categoryName}`,
          name: categoryName,
          display_order: Number.MAX_SAFE_INTEGER,
          manual_order: false,
          projects: [],
        };
        result.push(group);
      }
      group.projects.push(project);
      return result;
    }, []);

    legacyGroups.forEach((group) => {
      group.projects = sortProjects(group.projects);
    });

    return [...groups, ...legacyGroups].sort(
      (categoryA, categoryB) =>
        categoryA.display_order - categoryB.display_order ||
        categoryA.name.localeCompare(categoryB.name),
    );
  }, [categories, projects]);

  return {
    projects,
    categories,
    categoryGroups,
    loading,
    error,
  };
};
