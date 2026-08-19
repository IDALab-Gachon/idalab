import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const CATEGORY_LABELS = {
  international_journal_sci:    "International Journals (SCIE)",
  international_journal_scopus: "International Journals (SCOPUS)",
  international_conference:     "International Conferences",
  domestic_journal:             "Korean Journals",
  domestic_conference:          "Korean Conferences",
};

export const CATEGORY_ORDER = [
  "international_journal_sci",
  "international_journal_scopus",
  "international_conference",
  "domestic_journal",
  "domestic_conference",
];

export const usePublications = () => {
  const [publications, setPublications] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublications = async () => {
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("display_order")
        .order("year", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // category별로 그룹핑
      const grouped = {};
      CATEGORY_ORDER.forEach((cat) => {
        grouped[cat] = [];
      });

      data.forEach((pub) => {
        if (grouped[pub.category] !== undefined) {
          grouped[pub.category].push(pub);
        }
      });

      setPublications(grouped);
      setLoading(false);
    };

    fetchPublications();
  }, []);

  return { publications, loading, error };
};
