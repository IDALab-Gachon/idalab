import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { useAdminEditTarget } from "../../hooks/useAdminEditTarget";
import { supabase } from "../../lib/supabase";

const EMPTY_GROUP = { year: "", label: "" };

const PageTitle    = styled.h1`font-size:22px;font-weight:700;margin-bottom:24px;color:#1e2a3a;`;
const Section      = styled.section`background:#fff;border:1px solid #e6e6e6;border-radius:8px;padding:24px;margin-bottom:24px;`;
const SectionTitle = styled.h2`font-size:16px;font-weight:700;margin-bottom:16px;color:#1e2a3a;display:flex;justify-content:space-between;align-items:center;`;
const Btn          = styled.button`padding:5px 12px;border-radius:4px;border:none;cursor:pointer;font-size:13px;font-weight:500;background:${p=>p.$variant==="danger"?"#ed4956":p.$variant==="primary"?"#003569":p.$variant==="ghost"?"transparent":"#e2e8f0"};color:${p=>(p.$variant==="danger"||p.$variant==="primary")?"#fff":p.$variant==="ghost"?"#666":"#333"};margin-right:6px;border:${p=>p.$variant==="ghost"?"1px solid #e6e6e6":"none"};&:disabled{opacity:.5;}`;
const Grid2        = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:12px;@media(max-width:600px){grid-template-columns:1fr;}`;
const FullRow      = styled.div`grid-column:1/-1;`;
const Label        = styled.label`font-size:13px;font-weight:600;color:#444;display:block;margin-bottom:4px;`;
const Input        = styled.input`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;&:focus{border-color:#003569;outline:none;}`;
const FormActions  = styled.div`display:flex;gap:10px;margin-top:16px;`;
const GroupCard    = styled.div`border:1px solid #e6e6e6;border-radius:8px;margin-bottom:16px;overflow:hidden;`;
const YearSection  = styled.section`margin-bottom:28px;`;
const YearHeader   = styled.div`display:flex;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #e6e6e6;`;
const YearTitle    = styled.h2`color:#1e2a3a;font-size:18px;font-weight:700;`;
const YearCount    = styled.span`padding:2px 8px;border-radius:12px;background:#ebf4ff;color:#003569;font-size:11px;font-weight:700;`;
const GroupHeader  = styled.div`background:#f7f8fa;padding:14px 16px;display:flex;gap:16px;justify-content:space-between;align-items:center;@media(max-width:600px){align-items:flex-start;flex-direction:column;}`;
const GroupName    = styled.h3`font-weight:700;font-size:15px;color:#1e2a3a;`;
const GroupMeta    = styled.p`margin-top:2px;color:#777;font-size:12px;`;
const GroupActions = styled.div`display:flex;align-items:center;flex-wrap:wrap;gap:6px;`;
const OrderControls = styled.div`display:flex;gap:4px;margin-right:4px;`;
const OrderButton  = styled.button`padding:5px 8px;border:1px solid #d7dde3;border-radius:4px;background:#fff;color:#444;font-size:12px;font-weight:600;cursor:pointer;&:hover:not(:disabled){border-color:#003569;color:#003569;}&:disabled{opacity:.35;cursor:default;}`;
const PhotoGrid    = styled.div`display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;padding:16px;`;
const PhotoItem    = styled.div`min-width:0;padding:8px;border:1px solid #e6e6e6;border-radius:7px;background:#fff;`;
const PhotoThumb   = styled.div`position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:5px;background:#eef1f4;`;
const ThumbImg     = styled.img`width:100%;height:100%;object-fit:cover;display:block;`;
const DeletePhotoBtn = styled.button`position:absolute;top:3px;right:3px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;`;
const MoveLabel    = styled.label`display:block;margin-top:8px;color:#555;font-size:11px;font-weight:600;`;
const MoveRow      = styled.div`display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px;margin-top:4px;`;
const MoveSelect   = styled.select`min-width:0;width:100%;padding:5px 6px;border:1px solid #d9dfe5;border-radius:4px;background:#fff;color:#444;font-size:11px;`;
const MoveButton   = styled.button`padding:5px 8px;border:0;border-radius:4px;background:#003569;color:#fff;font-size:11px;font-weight:600;cursor:pointer;&:disabled{opacity:.45;cursor:default;}`;
const NoDestination = styled.p`margin-top:8px;color:#999;font-size:11px;`;

const AdminGallery = () => {
  const [groups,      setGroups]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [groupForm,   setGroupForm]   = useState(EMPTY_GROUP);
  const [editGroupId, setEditGroupId] = useState(null);
  const [savingGroup, setSavingGroup] = useState(false);
  const [uploadingFor,setUploadingFor]= useState(null); // group id
  const [moveTargets, setMoveTargets] = useState({});
  const [movingPhotoId, setMovingPhotoId] = useState(null);
  const [reorderingYear, setReorderingYear] = useState(null);
  const groupFormRef = useRef(null);

  const fetchGroups = async () => {
    const { data } = await supabase
      .from("gallery_groups")
      .select("*, gallery_photos(id, photo_url, display_order)")
      .order("year", { ascending: false })
      .order("display_order");
    setGroups((data || []).map(g => ({ ...g, gallery_photos: (g.gallery_photos || []).sort((a, b) => a.display_order - b.display_order) })));
    setLoading(false);
  };

  useEffect(() => { fetchGroups(); }, []);

  const setGField = (k, v) => setGroupForm(f => ({ ...f, [k]: v }));

  const startEditGroup = (g) => {
    setGroupForm({ year: g.year, label: g.label || "" });
    setEditGroupId(g.id);
    groupFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useAdminEditTarget({
    items: groups,
    loading,
    onOpen: startEditGroup,
  });

  const cancelEditGroup = () => { setGroupForm(EMPTY_GROUP); setEditGroupId(null); };

  const saveGroup = async () => {
    if (!groupForm.year) return alert("연도를 입력하세요.");
    if (!groupForm.label.trim()) return alert("행사명을 입력하세요.");
    setSavingGroup(true);
    const year = parseInt(groupForm.year);
    const editingGroup = groups.find((group) => group.id === editGroupId);
    const groupsInTargetYear = groups.filter(
      (group) => group.year === year && group.id !== editGroupId
    );
    const lastOrder = Math.max(
      -1,
      ...groupsInTargetYear.map((group) => group.display_order || 0)
    );
    const displayOrder =
      editingGroup && editingGroup.year === year
        ? editingGroup.display_order
        : lastOrder + 1;
    const payload = {
      year,
      label: groupForm.label.trim(),
      display_order: displayOrder,
    };
    if (editGroupId) {
      await supabase.from("gallery_groups").update(payload).eq("id", editGroupId);
    } else {
      await supabase.from("gallery_groups").insert(payload);
    }
    await fetchGroups();
    cancelEditGroup();
    setSavingGroup(false);
  };

  const deleteGroup = async (id, label) => {
    if (!window.confirm(`그룹 "${label || id}"을(를) 삭제하시겠습니까?\n포함된 모든 사진도 삭제됩니다.`)) return;
    await supabase.from("gallery_groups").delete().eq("id", id);
    fetchGroups();
  };

  const uploadPhotos = async (e, groupId) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploadingFor(groupId);
    const existing = groups.find(g => g.id === groupId)?.gallery_photos || [];

    for (const [fileIndex, file] of files.entries()) {
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage.from("gallery").upload(fileName, file, { upsert: true });
      if (error) { console.error(error); continue; }
      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);
      await supabase.from("gallery_photos").insert({ group_id: groupId, photo_url: publicUrl, display_order: existing.length + fileIndex });
    }

    e.target.value = "";
    setUploadingFor(null);
    fetchGroups();
  };

  const deletePhoto = async (photoId) => {
    if (!window.confirm("사진을 삭제하시겠습니까?")) return;
    await supabase.from("gallery_photos").delete().eq("id", photoId);
    fetchGroups();
  };

  const movePhoto = async (photoId, currentGroupId) => {
    const targetGroupId = moveTargets[photoId];
    if (!targetGroupId || targetGroupId === currentGroupId) return;

    const targetGroup = groups.find((group) => group.id === targetGroupId);
    if (!targetGroup) return;

    setMovingPhotoId(photoId);
    const { error } = await supabase
      .from("gallery_photos")
      .update({
        group_id: targetGroupId,
        display_order: targetGroup.gallery_photos.length,
      })
      .eq("id", photoId);

    if (error) {
      alert(`사진 이동에 실패했습니다: ${error.message}`);
      setMovingPhotoId(null);
      return;
    }

    setMoveTargets((current) => {
      const next = { ...current };
      delete next[photoId];
      return next;
    });
    await fetchGroups();
    setMovingPhotoId(null);
  };

  const reorderGroup = async (year, groupId, direction) => {
    const yearGroups = groups.filter((group) => group.year === year);
    const currentIndex = yearGroups.findIndex((group) => group.id === groupId);
    const targetIndex = currentIndex + direction;

    if (
      currentIndex === -1 ||
      targetIndex < 0 ||
      targetIndex >= yearGroups.length
    ) {
      return;
    }

    const reordered = [...yearGroups];
    [reordered[currentIndex], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[currentIndex],
    ];

    setReorderingYear(year);
    const results = await Promise.all(
      reordered.map((group, index) =>
        supabase
          .from("gallery_groups")
          .update({ display_order: index })
          .eq("id", group.id)
      )
    );
    const failed = results.find((result) => result.error);

    if (failed) {
      alert(`행사 순서 변경에 실패했습니다: ${failed.error.message}`);
    }

    await fetchGroups();
    setReorderingYear(null);
  };

  const groupsByYear = groups.reduce((acc, group) => {
    if (!acc[group.year]) acc[group.year] = [];
    acc[group.year].push(group);
    return acc;
  }, {});

  const yearEntries = Object.entries(groupsByYear).sort(
    ([yearA], [yearB]) => Number(yearB) - Number(yearA)
  );

  return (
    <AdminLayout>
      <PageTitle>Gallery 관리</PageTitle>

      {/* 그룹 추가/편집 폼 */}
      <Section ref={groupFormRef}>
        <SectionTitle>{editGroupId ? "행사 앨범 편집" : "새 행사 앨범 추가"}</SectionTitle>
        <Grid2>
          <div>
            <Label>연도 *</Label>
            <Input type="number" value={groupForm.year} onChange={e => setGField("year", e.target.value)} placeholder="2025" />
          </div>
          <FullRow>
            <Label>행사명 *</Label>
            <Input value={groupForm.label} onChange={e => setGField("label", e.target.value)} placeholder="예: 2025.02 졸업식" />
          </FullRow>
        </Grid2>
        <FormActions>
          <Btn $variant="primary" onClick={saveGroup} disabled={savingGroup}>{savingGroup ? "저장 중..." : editGroupId ? "저장" : "행사 앨범 추가"}</Btn>
          {editGroupId && <Btn onClick={cancelEditGroup}>취소</Btn>}
        </FormActions>
      </Section>

      {/* 그룹 목록 */}
      {loading ? <p>Loading...</p> : yearEntries.map(([year, yearGroups]) => (
        <YearSection key={year}>
          <YearHeader>
            <YearTitle>{year}</YearTitle>
            <YearCount>{yearGroups.length}개 행사</YearCount>
          </YearHeader>
          {yearGroups.map((g, index) => (
            <GroupCard key={g.id}>
              <GroupHeader>
                <div>
                  <GroupName>{g.label || "행사명 미입력"}</GroupName>
                  <GroupMeta>사진 {g.gallery_photos.length}장 · {index + 1}/{yearGroups.length}번째</GroupMeta>
                </div>
                <GroupActions>
                  <OrderControls aria-label={`${g.label || year} 표시 순서`}>
                    <OrderButton
                      type="button"
                      onClick={() => reorderGroup(g.year, g.id, -1)}
                      disabled={index === 0 || reorderingYear === g.year}
                      aria-label={`${g.label || year} 위로 이동`}
                    >
                      ↑ 위로
                    </OrderButton>
                    <OrderButton
                      type="button"
                      onClick={() => reorderGroup(g.year, g.id, 1)}
                      disabled={
                        index === yearGroups.length - 1 ||
                        reorderingYear === g.year
                      }
                      aria-label={`${g.label || year} 아래로 이동`}
                    >
                      ↓ 아래로
                    </OrderButton>
                  </OrderControls>
                  <Btn $variant="ghost" onClick={() => startEditGroup(g)}>행사명/연도 수정</Btn>
                  <Btn $variant="danger" onClick={() => deleteGroup(g.id, g.label || String(g.year))}>삭제</Btn>
                </GroupActions>
              </GroupHeader>
              <div style={{ padding: "12px 16px 4px", borderTop: "1px solid #f0f0f0" }}>
                <label style={{ fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {uploadingFor === g.id ? "업로드 중..." : "📷 사진 추가 (복수 선택 가능)"}
                  <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => uploadPhotos(e, g.id)} disabled={uploadingFor === g.id} />
                </label>
              </div>
              <PhotoGrid>
                {g.gallery_photos.map(p => (
                  <PhotoItem key={p.id}>
                    <PhotoThumb>
                      <ThumbImg src={p.photo_url} alt="" loading="lazy" decoding="async" />
                      <DeletePhotoBtn
                        type="button"
                        onClick={() => deletePhoto(p.id)}
                        aria-label={`${g.label || g.year} 앨범에서 사진 삭제`}
                      >
                        ×
                      </DeletePhotoBtn>
                    </PhotoThumb>
                    {groups.length > 1 ? (
                      <>
                        <MoveLabel htmlFor={`move-photo-${p.id}`}>다른 행사로 이동</MoveLabel>
                        <MoveRow>
                          <MoveSelect
                            id={`move-photo-${p.id}`}
                            value={moveTargets[p.id] || ""}
                            onChange={(e) =>
                              setMoveTargets((current) => ({
                                ...current,
                                [p.id]: e.target.value,
                              }))
                            }
                          >
                            <option value="">행사 선택</option>
                            {groups
                              .filter((target) => target.id !== g.id)
                              .map((target) => (
                                <option key={target.id} value={target.id}>
                                  {target.year} · {target.label || "행사명 미입력"}
                                </option>
                              ))}
                          </MoveSelect>
                          <MoveButton
                            type="button"
                            onClick={() => movePhoto(p.id, g.id)}
                            disabled={!moveTargets[p.id] || movingPhotoId === p.id}
                          >
                            {movingPhotoId === p.id ? "이동 중" : "이동"}
                          </MoveButton>
                        </MoveRow>
                      </>
                    ) : (
                      <NoDestination>이동할 다른 행사가 없습니다.</NoDestination>
                    )}
                  </PhotoItem>
                ))}
                {g.gallery_photos.length === 0 && <span style={{ fontSize: 13, color: "#999" }}>사진 없음</span>}
              </PhotoGrid>
            </GroupCard>
          ))}
        </YearSection>
      ))}
    </AdminLayout>
  );
};

export default AdminGallery;
