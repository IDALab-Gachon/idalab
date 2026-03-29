import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const EMPTY_GROUP = { year: "", label: "", display_order: 0 };

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
const GroupHeader  = styled.div`background:#f7f8fa;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;`;
const GroupTitle   = styled.span`font-weight:600;font-size:15px;`;
const PhotoGrid    = styled.div`display:flex;flex-wrap:wrap;gap:8px;padding:16px;`;
const PhotoThumb   = styled.div`position:relative;width:120px;height:90px;`;
const ThumbImg     = styled.img`width:100%;height:100%;object-fit:cover;border-radius:4px;`;
const DeletePhotoBtn = styled.button`position:absolute;top:3px;right:3px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:20px;height:20px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;`;

const AdminGallery = () => {
  const [groups,      setGroups]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [groupForm,   setGroupForm]   = useState(EMPTY_GROUP);
  const [editGroupId, setEditGroupId] = useState(null);
  const [savingGroup, setSavingGroup] = useState(false);
  const [uploadingFor,setUploadingFor]= useState(null); // group id

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
    setGroupForm({ year: g.year, label: g.label || "", display_order: g.display_order });
    setEditGroupId(g.id);
  };

  const cancelEditGroup = () => { setGroupForm(EMPTY_GROUP); setEditGroupId(null); };

  const saveGroup = async () => {
    if (!groupForm.year) return alert("연도를 입력하세요.");
    setSavingGroup(true);
    const payload = { year: parseInt(groupForm.year), label: groupForm.label, display_order: parseInt(groupForm.display_order) || 0 };
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

    for (const file of files) {
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`;
      const { error } = await supabase.storage.from("gallery").upload(fileName, file, { upsert: true });
      if (error) { console.error(error); continue; }
      const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);
      const existing = groups.find(g => g.id === groupId)?.gallery_photos || [];
      await supabase.from("gallery_photos").insert({ group_id: groupId, photo_url: publicUrl, display_order: existing.length });
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

  return (
    <AdminLayout>
      <PageTitle>Gallery 관리</PageTitle>

      {/* 그룹 추가/편집 폼 */}
      <Section>
        <SectionTitle>{editGroupId ? "그룹 편집" : "새 그룹 추가"}</SectionTitle>
        <Grid2>
          <div>
            <Label>연도 *</Label>
            <Input type="number" value={groupForm.year} onChange={e => setGField("year", e.target.value)} placeholder="2025" />
          </div>
          <div>
            <Label>표시 순서</Label>
            <Input type="number" value={groupForm.display_order} onChange={e => setGField("display_order", e.target.value)} />
          </div>
          <FullRow>
            <Label>레이블 (선택)</Label>
            <Input value={groupForm.label} onChange={e => setGField("label", e.target.value)} placeholder="예: 2025.02 졸업식" />
          </FullRow>
        </Grid2>
        <FormActions>
          <Btn $variant="primary" onClick={saveGroup} disabled={savingGroup}>{savingGroup ? "저장 중..." : editGroupId ? "저장" : "그룹 추가"}</Btn>
          {editGroupId && <Btn onClick={cancelEditGroup}>취소</Btn>}
        </FormActions>
      </Section>

      {/* 그룹 목록 */}
      {loading ? <p>Loading...</p> : groups.map(g => (
        <GroupCard key={g.id}>
          <GroupHeader>
            <GroupTitle>{g.year}{g.label ? ` — ${g.label}` : ""} <span style={{ fontWeight: 400, fontSize: 13, color: "#999" }}>({g.gallery_photos.length}장)</span></GroupTitle>
            <div>
              <Btn $variant="ghost" onClick={() => startEditGroup(g)}>편집</Btn>
              <Btn $variant="danger" onClick={() => deleteGroup(g.id, g.label || String(g.year))}>삭제</Btn>
            </div>
          </GroupHeader>
          <div style={{ padding: "12px 16px 4px", borderTop: "1px solid #f0f0f0" }}>
            <label style={{ fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {uploadingFor === g.id ? "업로드 중..." : "📷 사진 추가 (복수 선택 가능)"}
              <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => uploadPhotos(e, g.id)} disabled={uploadingFor === g.id} />
            </label>
          </div>
          <PhotoGrid>
            {g.gallery_photos.map(p => (
              <PhotoThumb key={p.id}>
                <ThumbImg src={p.photo_url} alt="" />
                <DeletePhotoBtn onClick={() => deletePhoto(p.id)}>×</DeletePhotoBtn>
              </PhotoThumb>
            ))}
            {g.gallery_photos.length === 0 && <span style={{ fontSize: 13, color: "#999" }}>사진 없음</span>}
          </PhotoGrid>
        </GroupCard>
      ))}
    </AdminLayout>
  );
};

export default AdminGallery;
