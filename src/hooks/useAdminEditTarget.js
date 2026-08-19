import { useEffect, useRef } from "react";

export const useAdminEditTarget = ({
  items,
  loading,
  onOpen,
}) => {
  const handledIdRef = useRef(null);
  const onOpenRef = useRef(onOpen);
  onOpenRef.current = onOpen;

  useEffect(() => {
    if (loading) return;

    const editId = new URLSearchParams(window.location.search).get("edit");
    if (!editId || handledIdRef.current === editId) return;

    const target = items.find(
      (item) => String(item.id) === String(editId),
    );
    handledIdRef.current = editId;
    if (target) onOpenRef.current(target);
  }, [items, loading]);
};
