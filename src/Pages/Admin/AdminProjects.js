import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { supabase } from "../../lib/supabase";

const EMPTY_FORM = {
  title: "", description: "", category: "", start_year: "",
  end_year: "", pdf_url: "", url: "", display_order: 0,
};

const PageTitle   = styled.h1`font-size:22px;font-weight:700;margin-bottom:24px;color:#1e2a3a;`;
const Section     = styled.section`background:#fff;border:1px solid #e6e6e6;border-radius:8px;padding:24px;margin-bottom:24px;`;
const SectionTitle= styled.h2`font-size:16px;font-weight:700;margin-bottom:16px;color:#1e2a3a;`;
const Table       = styled.table`width:100%;border-collapse:collapse;font-size:13px;`;
const Th          = styled.th`text-align:left;padding:8px 10px;border-bottom:2px solid #e6e6e6;color:#666;font-weight:600;`;
const Td          = styled.td`padding:8px 10px;border-bottom:1px solid #f0f0f0;vertical-align:top;`;
const Btn         = styled.button`padding:4px 10px;border-radius:4px;border:none;cursor:pointer;font-size:12px;font-weight:500;background:${p=>p.$variant==="danger"?"#ed4956":p.$variant==="primary"?"#003569":"#e2e8f0"};color:${p=>(p.$variant==="danger"||p.$variant==="primary")?"#fff":"#333"};margin-right:4px;&:disabled{opacity:.5;}`;
const Grid        = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:14px;@media(max-width:600px){grid-template-columns:1fr;}`;
const FullRow     = styled.div`grid-column:1/-1;`;
const Label       = styled.label`font-size:13px;font-weight:600;color:#444;display:block;margin-bottom:4px;`;
const Input       = styled.input`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;&:focus{border-color:#003569;outline:none;}`;
const Textarea    = styled.textarea`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;resize:vertical;&:focus{border-color:#003569;outline:none;}`;
const FormActions = styled.div`display:flex;gap:10px;margin-top:20px;`;
const CategoryTag = styled.span`font-size:11px;padding:2px 8px;background:#ebf4ff;color:#003569;border-radius:10px;`;

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [editingId,setEditingId]= useState(null);
  const [saving,   setSaving]   = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("category").order("display_order");
    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setForm({ ...EMPTY_FORM, ...p, start_year: p.start_year || "", end_year: p.end_year || "", pdf_url: p.pdf_url || "", url: p.url || "" });
    setEditingId(p.id);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const cancelEdit = () => { setForm(EMPTY_FORM); setEditingId(null); };

  const handleSave = async () => {
    if (!form.title) return alert("제목을 입력하세요.");
    setSaving(true);
    const payload = { ...form, start_year: form.start_year ? parseInt(form.start_year) : null, end_year: form.end_year ? parseInt(form.end_year) : null, display_order: parseInt(form.display_order) || 0 };
    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);
    } else {
      await supabase.from("projects").insert(payload);
    }
    await fetchProjects();
    cancelEdit();
    setSaving(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`삭제하시겠습니까?\n"${title}"`)) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPdfUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("project-pdfs").upload(fileName, file, { upsert: true });
    if (error) { alert("PDF 업로드 실패: " + error.message); setPdfUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("project-pdfs").getPublicUrl(fileName);
    setField("pdf_url", publicUrl);
    setPdfUploading(false);
  };

  // 카테고리별 그룹핑
  const grouped = projects.reduce((acc, p) => {
    const cat = p.category || "기타";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <PageTitle>Projects 관리</PageTitle>

      <Section>
        <SectionTitle>프로젝트 목록</SectionTitle>
        {loading ? <p>Loading...</p> : (
          <div style={{ overflowX: "auto" }}>
            <Table>
              <thead>
                <tr><Th>카테고리</Th><Th>프로젝트명</Th><Th>기간</Th><Th>순서</Th><Th>액션</Th></tr>
              </thead>
              <tbody>
                {Object.entries(grouped).map(([cat, list]) =>
                  list.map((p, i) => (
                    <tr key={p.id}>
                      {i === 0 && <Td rowSpan={list.length} style={{ verticalAlign: "top" }}><CategoryTag>{cat}</CategoryTag></Td>}
                      <Td>
                        <div style={{ fontWeight: 600 }}>{p.title}</div>
                        {p.description && <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>{p.description}</div>}
                      </Td>
                      <Td style={{ fontSize: 12, whiteSpace: "nowrap" }}>
                        {p.start_year}{p.end_year ? ` – ${p.end_year}` : p.start_year ? " –" : "-"}
                      </Td>
                      <Td>{p.display_order}</Td>
                      <Td>
                        <Btn onClick={() => startEdit(p)}>편집</Btn>
                        <Btn $variant="danger" onClick={() => handleDelete(p.id, p.title)}>삭제</Btn>
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Section>

      <Section>
        <SectionTitle>{editingId ? "프로젝트 편집" : "새 프로젝트 추가"}</SectionTitle>
        <Grid>
          <FullRow>
            <Label>프로젝트명 *</Label>
            <Textarea rows={2} value={form.title} onChange={e => setField("title", e.target.value)} placeholder="프로젝트 제목" />
          </FullRow>
          <FullRow>
            <Label>설명 (기관명 등)</Label>
            <Input value={form.description} onChange={e => setField("description", e.target.value)} placeholder="예: National Research Foundation of Korea (NRF)" />
          </FullRow>
          <FullRow>
            <Label>카테고리</Label>
            <Input value={form.category} onChange={e => setField("category", e.target.value)} placeholder="예: Research Projects, Apache AsterixDB Project" />
          </FullRow>
          <div>
            <Label>시작년도</Label>
            <Input type="number" value={form.start_year} onChange={e => setField("start_year", e.target.value)} placeholder="2023" />
          </div>
          <div>
            <Label>종료년도 (빈칸 = 진행 중)</Label>
            <Input type="number" value={form.end_year} onChange={e => setField("end_year", e.target.value)} placeholder="2026" />
          </div>
          <div>
            <Label>URL</Label>
            <Input value={form.url} onChange={e => setField("url", e.target.value)} placeholder="https://..." />
          </div>
          <div>
            <Label>표시 순서</Label>
            <Input type="number" value={form.display_order} onChange={e => setField("display_order", e.target.value)} />
          </div>
          <FullRow>
            <Label>PDF 업로드</Label>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <input type="file" accept=".pdf" onChange={handlePdfUpload} disabled={pdfUploading} />
              {pdfUploading && <span style={{ fontSize: 13, color: "#999" }}>업로드 중...</span>}
              {form.pdf_url && <a href={form.pdf_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13 }}>현재 PDF 보기</a>}
            </div>
          </FullRow>
        </Grid>
        <FormActions>
          <Btn $variant="primary" onClick={handleSave} disabled={saving}>{saving ? "저장 중..." : editingId ? "저장" : "추가"}</Btn>
          {editingId && <Btn onClick={cancelEdit}>취소</Btn>}
        </FormActions>
      </Section>
    </AdminLayout>
  );
};

export default AdminProjects;
