import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useGallery = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from("gallery_groups")
        .select(`
          *,
          gallery_photos (
            id,
            photo_url,
            display_order
          )
        `)
        .order("display_order")
        .order("year", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // 각 그룹의 photos를 display_order 기준으로 정렬
      const sorted = data.map((group) => ({
        ...group,
        gallery_photos: (group.gallery_photos || []).sort(
          (a, b) => a.display_order - b.display_order
        ),
      }));

      setGroups(sorted);
      setLoading(false);
    };

    fetchGallery();
  }, []);

  // year별로 그룹핑
  const byYear = groups.reduce((acc, group) => {
    const year = group.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(group);
    return acc;
  }, {});

  return { groups, byYear, loading, error };
};
