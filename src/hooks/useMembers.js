import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const ROLE_ORDER = [
  "professor",
  "research_professor",
  "phd_student",
  "ms_student",
  "bs_student",
];

export const useMembers = () => {
  const [activeMembers, setActiveMembers] = useState({});
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("role")
        .order("display_order");

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // active 멤버를 role별로 그룹핑
      const grouped = {};
      ROLE_ORDER.forEach((role) => {
        grouped[role] = [];
      });

      data.forEach((member) => {
        if (member.status === "active") {
          if (grouped[member.role]) {
            grouped[member.role].push(member);
          }
        } else if (member.status === "alumni") {
          setAlumni((prev) => [...prev, member]);
        }
      });

      // alumni는 별도로 처리
      const alumniList = data.filter((m) => m.status === "alumni");
      alumniList.sort((a, b) => (b.graduation_year || 0) - (a.graduation_year || 0));

      setActiveMembers(grouped);
      setAlumni(alumniList);
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return { activeMembers, alumni, loading, error, ROLE_ORDER };
};
