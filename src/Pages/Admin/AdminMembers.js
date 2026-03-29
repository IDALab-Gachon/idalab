import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import ImageUploader from "../../Components/Admin/ImageUploader";
import { supabase } from "../../lib/supabase";

const ROLE_LABELS = {
  professor:          "Professor",
  research_professor: "Research Professor",
  phd_student:        "Ph.D. Student",
  ms_student:         "M.S. Student",
  bs_student:         "B.S. Student",
};

const ROLE_FILTERS = [
  { key: "all",               label: "전체" },
  { key: "professor",         label: "Professor" },
  { key: "research_professor",label: "Research Prof." },
  { key: "phd_student",       label: "Ph.D." },
  { key: "ms_student",        label: "M.S." },
  { key: "bs_student",        label: "B.S." },
];

const EMPTY_FORM = {
  name: "", role: "ms_student", status: "active",
  email: "", website: "", photo_url: "", bio: "",
  final_degree: "", graduation_year: "", current_organization: "",
  display_order: 0,
};

// ── Styles ───────────────────────────────────────────────────
const PageTitle    = styled.h1`font-size: 22px; font-weight: 700; margin-bottom: 24px; color: #1e2a3a;`;
const PageHeader   = styled.div`display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 10px;`;
const Section      = styled.section`background: #fff; border: 1px solid #e6e6e6; border-radius: 8px; padding: 24px; margin-bottom: 24px;`;
const SectionTitle = styled.h2`font-size: 16px; font-weight: 700; margin-bottom: 16px; color: #1e2a3a;`;
const Table        = styled.table`width: 100%; border-collapse: collapse; font-size: 14px;`;
const Th           = styled.th`text-align: left; padding: 8px 10px; border-bottom: 2px solid #e6e6e6; color: #666; font-weight: 600;`;
const Td           = styled.td`padding: 8px 10px; border-bottom: 1px solid #f0f0f0; vertical-align: middle;`;
const Avatar       = styled.img`width: 40px; height: 40px; border-radius: 50%; object-fit: cover;`;
const AvatarPlaceholder = styled.div`width:40px;height:40px;border-radius:50%;background:#e6e6e6;`;

const Btn = styled.button`
  padding: 5px 12px; border-radius: 4px; border: none; cursor: pointer; font-size: 13px; font-weight: 500;
  background: ${p => p.$variant === "danger" ? "#ed4956" : p.$variant === "warn" ? "#f6ad55" : p.$variant === "primary" ? "#003569" : p.$variant === "add" ? "#22863a" : "#e2e8f0"};
  color: ${p => (["danger","primary","add"].includes(p.$variant)) ? "#fff" : "#333"};
  margin-right: 6px;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Grid        = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 14px; @media(max-width:600px){grid-template-columns:1fr;}`;
const Label       = styled.label`font-size: 13px; font-weight: 600; color: #444; display: block; margin-bottom: 4px;`;
const Input       = styled.input`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;&:focus{border-color:#003569;outline:none;}`;
const Select      = styled.select`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;background:#fff;`;
const FormActions = styled.div`display:flex;gap:10px;margin-top:20px;`;
const Tabs        = styled.div`display:flex;gap:0;margin-bottom:12px;border-bottom:2px solid #e6e6e6;`;
const Tab         = styled.button`padding:8px 18px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${p=>p.$active?700:400};color:${p=>p.$active?"#003569":"#666"};border-bottom:${p=>p.$active?"2px solid #003569":"2px solid transparent"};margin-bottom:-2px;`;

const RoleFilterBar = styled.div`display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;`;
const RoleBtn       = styled.button`padding:4px 12px;border-radius:14px;border:1.5px solid ${p=>p.$active?"#003569":"#d0d5dd"};background:${p=>p.$active?"#003569":"#fff"};color:${p=>p.$active?"#fff":"#555"};font-size:12px;font-weight:${p=>p.$active?600:400};cursor:pointer;transition:all 0.15s;`;

const DragHandle   = styled.span`cursor:grab;color:#bbb;font-size:16px;padding:0 4px;user-select:none;&:active{cursor:grabbing;}`;

const DraggableRow = styled.tr`
  background: ${p => p.$isDragOver ? "#ebf4ff" : "transparent"};
  opacity: ${p => p.$isDragging ? 0.4 : 1};
  transition: background 0.1s;
`;

const AdminMembers = () => {
  const [members,    setMembers]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [editingId,  setEditingId]  = useState(null);
  const [saving,     setSaving]     = useState(false);
  const [tab,        setTab]        = useState("active");
  const [roleFilter, setRoleFilter] = useState("all");
  const [gradForm,   setGradForm]   = useState(null);

  // drag-and-drop state
  const [dragIdx,     setDragIdx]     = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  const formRef = useRef(null);

  const fetchMembers = async () => {
    const { data } = await supabase.from("members").select("*").order("display_order");
    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const startEdit = (m) => {
    setForm({ ...EMPTY_FORM, ...m, graduation_year: m.graduation_year || "", final_degree: m.final_degree || "", current_organization: m.current_organization || "" });
    setEditingId(m.id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const cancelEdit = () => { setForm(EMPTY_FORM); setEditingId(null); };

  const scrollToAdd = () => {
    cancelEdit();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSave = async () => {
    if (!form.name) return alert("이름을 입력하세요.");
    setSaving(true);
    const payload = { ...form, graduation_year: form.graduation_year ? parseInt(form.graduation_year) : null, display_order: parseInt(form.display_order) || 0 };
    if (editingId) {
      await supabase.from("members").update(payload).eq("id", editingId);
    } else {
      await supabase.from("members").insert(payload);
    }
    await fetchMembers();
    cancelEdit();
    setSaving(false);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`"${name}"을(를) 삭제하시겠습니까?`)) return;
    await supabase.from("members").delete().eq("id", id);
    fetchMembers();
  };

  const handleGraduate = async () => {
    if (!gradForm) return;
    await supabase.from("members").update({
      status: "alumni",
      final_degree: gradForm.final_degree,
      graduation_year: parseInt(gradForm.graduation_year) || null,
      current_organization: gradForm.current_organization,
    }).eq("id", gradForm.id);
    setGradForm(null);
    fetchMembers();
  };

  // ── Drag-and-drop handlers ──────────────────────────────────
  const handleDragStart = (e, idx) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    if (idx !== dragOverIdx) setDragOverIdx(idx);
  };

  const handleDrop = async (dropIdx) => {
    if (dragIdx === null || dragIdx === dropIdx) {
      setDragIdx(null); setDragOverIdx(null); return;
    }

    const newList = [...roleFiltered];
    const [moved] = newList.splice(dragIdx, 1);
    newList.splice(dropIdx, 0, moved);

    // Reuse the same display_order values (sorted) for the new arrangement
    const sortedOrders = [...roleFiltered]
      .sort((a, b) => a.display_order - b.display_order)
      .map(m => m.display_order);
    const updates = newList.map((m, i) => ({ id: m.id, display_order: sortedOrders[i] }));

    // Optimistic UI update
    const updMap = Object.fromEntries(updates.map(u => [u.id, u.display_order]));
    setMembers(prev =>
      prev.map(m => updMap[m.id] !== undefined ? { ...m, display_order: updMap[m.id] } : m)
          .sort((a, b) => a.display_order - b.display_order)
    );

    setDragIdx(null); setDragOverIdx(null);

    await Promise.all(updates.map(({ id, display_order }) =>
      supabase.from("members").update({ display_order }).eq("id", id)
    ));
  };

  const handleDragEnd = () => { setDragIdx(null); setDragOverIdx(null); };

  // ── Derived lists ────────────────────────────────────────────
  const activeList  = members.filter(m => m.status === "active");
  const alumniList  = members.filter(m => m.status === "alumni");

  const roleFiltered = (() => {
    if (tab !== "active") return alumniList;
    if (roleFilter === "all") return activeList;
    return activeList.filter(m => m.role === roleFilter);
  })();

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle style={{ margin: 0 }}>Members 관리</PageTitle>
        <Btn $variant="add" onClick={scrollToAdd}>＋ 새 멤버 추가</Btn>
      </PageHeader>

      {/* 졸업 처리 모달 */}
      {gradForm && (
        <Section style={{ border: "2px solid #f6ad55" }}>
          <SectionTitle>🎓 졸업 처리 — {members.find(m => m.id === gradForm.id)?.name}</SectionTitle>
          <Grid>
            <div>
              <Label>최종 학위</Label>
              <Select value={gradForm.final_degree} onChange={e => setGradForm(g => ({ ...g, final_degree: e.target.value }))}>
                <option value="">선택</option>
                <option value="BS">BS</option>
                <option value="MS">MS</option>
                <option value="PhD">PhD</option>
              </Select>
            </div>
            <div>
              <Label>졸업년도</Label>
              <Input type="number" value={gradForm.graduation_year} onChange={e => setGradForm(g => ({ ...g, graduation_year: e.target.value }))} placeholder="2025" />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <Label>현재 소속</Label>
              <Input value={gradForm.current_organization} onChange={e => setGradForm(g => ({ ...g, current_organization: e.target.value }))} placeholder="회사 또는 기관명" />
            </div>
          </Grid>
          <FormActions>
            <Btn $variant="warn" onClick={handleGraduate}>졸업 처리 확정</Btn>
            <Btn onClick={() => setGradForm(null)}>취소</Btn>
          </FormActions>
        </Section>
      )}

      {/* 목록 */}
      <Section>
        <Tabs>
          <Tab $active={tab === "active"} onClick={() => { setTab("active"); setRoleFilter("all"); }}>재학/재직 ({activeList.length})</Tab>
          <Tab $active={tab === "alumni"} onClick={() => setTab("alumni")}>동문 ({alumniList.length})</Tab>
        </Tabs>

        {/* 역할 필터 (재학/재직 탭만) */}
        {tab === "active" && (
          <RoleFilterBar>
            {ROLE_FILTERS.map(({ key, label }) => {
              const count = key === "all" ? activeList.length : activeList.filter(m => m.role === key).length;
              if (key !== "all" && count === 0) return null;
              return (
                <RoleBtn key={key} $active={roleFilter === key} onClick={() => setRoleFilter(key)}>
                  {label} ({count})
                </RoleBtn>
              );
            })}
          </RoleFilterBar>
        )}

        <div style={{ overflowX: "auto" }}>
          <Table>
            <thead>
              <tr>
                {tab === "active" && <Th style={{ width: 32 }}></Th>}
                <Th>사진</Th><Th>이름</Th><Th>역할</Th>
                {tab === "alumni" && <><Th>학위</Th><Th>졸업년도</Th><Th>소속</Th></>}
                <Th>이메일</Th><Th>순서</Th><Th>액션</Th>
              </tr>
            </thead>
            <tbody>
              {roleFiltered.map((m, idx) => (
                <DraggableRow
                  key={m.id}
                  draggable={tab === "active"}
                  $isDragging={tab === "active" && dragIdx === idx}
                  $isDragOver={tab === "active" && dragOverIdx === idx}
                  onDragStart={tab === "active" ? e => handleDragStart(e, idx) : undefined}
                  onDragOver={tab === "active" ? e => handleDragOver(e, idx) : undefined}
                  onDrop={tab === "active" ? () => handleDrop(idx) : undefined}
                  onDragEnd={tab === "active" ? handleDragEnd : undefined}
                >
                  {tab === "active" && (
                    <Td><DragHandle title="드래그하여 순서 변경">⠿</DragHandle></Td>
                  )}
                  <Td>{m.photo_url ? <Avatar src={m.photo_url} alt={m.name} /> : <AvatarPlaceholder />}</Td>
                  <Td><b>{m.name}</b></Td>
                  <Td>{ROLE_LABELS[m.role] || m.role}</Td>
                  {tab === "alumni" && <><Td>{m.final_degree || "-"}</Td><Td>{m.graduation_year || "-"}</Td><Td>{m.current_organization || "-"}</Td></>}
                  <Td style={{ fontSize: 12 }}>{m.email || "-"}</Td>
                  <Td>{m.display_order}</Td>
                  <Td>
                    <Btn onClick={() => startEdit(m)}>편집</Btn>
                    {m.status === "active" && (
                      <Btn $variant="warn" onClick={() => setGradForm({ id: m.id, final_degree: "", graduation_year: "", current_organization: "" })}>졸업</Btn>
                    )}
                    <Btn $variant="danger" onClick={() => handleDelete(m.id, m.name)}>삭제</Btn>
                  </Td>
                </DraggableRow>
              ))}
              {roleFiltered.length === 0 && (
                <tr><Td colSpan={10} style={{ color: "#999", textAlign: "center" }}>데이터 없음</Td></tr>
              )}
            </tbody>
          </Table>
        </div>
      </Section>

      {/* 추가/편집 폼 */}
      <Section ref={formRef}>
        <SectionTitle>{editingId ? "멤버 편집" : "새 멤버 추가"}</SectionTitle>
        <Grid>
          <div>
            <Label>이름 *</Label>
            <Input value={form.name} onChange={e => setField("name", e.target.value)} placeholder="예: DaeHo Kim" />
          </div>
          <div>
            <Label>역할 *</Label>
            <Select value={form.role} onChange={e => setField("role", e.target.value)}>
              {Object.entries(ROLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </Select>
          </div>
          <div>
            <Label>이메일</Label>
            <Input type="email" value={form.email} onChange={e => setField("email", e.target.value)} placeholder="name@example.com" />
          </div>
          <div>
            <Label>개인 웹사이트</Label>
            <Input value={form.website} onChange={e => setField("website", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <Label>표시 순서</Label>
            <Input type="number" value={form.display_order} onChange={e => setField("display_order", e.target.value)} />
          </div>
          <div>
            <Label>상태</Label>
            <Select value={form.status} onChange={e => setField("status", e.target.value)}>
              <option value="active">재학/재직</option>
              <option value="alumni">동문</option>
            </Select>
          </div>
          {form.status === "alumni" && (
            <>
              <div>
                <Label>최종 학위</Label>
                <Select value={form.final_degree} onChange={e => setField("final_degree", e.target.value)}>
                  <option value="">선택</option>
                  <option value="BS">BS</option>
                  <option value="MS">MS</option>
                  <option value="PhD">PhD</option>
                </Select>
              </div>
              <div>
                <Label>졸업년도</Label>
                <Input type="number" value={form.graduation_year} onChange={e => setField("graduation_year", e.target.value)} placeholder="2025" />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <Label>현재 소속</Label>
                <Input value={form.current_organization} onChange={e => setField("current_organization", e.target.value)} placeholder="회사 또는 기관명" />
              </div>
            </>
          )}
          <div style={{ gridColumn: "1/-1" }}>
            <Label>프로필 사진</Label>
            <ImageUploader bucket="member-photos" currentUrl={form.photo_url} onUpload={url => setField("photo_url", url)} />
          </div>
        </Grid>
        <FormActions>
          <Btn $variant="primary" onClick={handleSave} disabled={saving}>{saving ? "저장 중..." : editingId ? "저장" : "추가"}</Btn>
          {editingId && <Btn onClick={cancelEdit}>취소</Btn>}
        </FormActions>
      </Section>
    </AdminLayout>
  );
};

export default AdminMembers;
