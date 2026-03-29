import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order")
        .order("start_year", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // category별 그룹핑
  const groupedProjects = projects.reduce((acc, project) => {
    const cat = project.category || "기타";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(project);
    return acc;
  }, {});

  return { projects, groupedProjects, loading, error };
};
