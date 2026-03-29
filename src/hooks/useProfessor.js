import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useProfessor = () => {
  const [professor, setProfessor] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessor = async () => {
      const { data: profData, error: profError } = await supabase
        .from("members")
        .select("*")
        .eq("role", "professor")
        .eq("status", "active")
        .single();

      if (profError) {
        setError(profError.message);
        setLoading(false);
        return;
      }

      setProfessor(profData);

      const { data: detailData } = await supabase
        .from("professor_details")
        .select("*")
        .eq("member_id", profData.id)
        .single();

      if (detailData) setDetails(detailData);
      setLoading(false);
    };

    fetchProfessor();
  }, []);

  return { professor, details, loading, error };
};
