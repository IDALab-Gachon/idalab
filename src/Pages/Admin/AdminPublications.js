import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { useAdminEditTarget } from "../../hooks/useAdminEditTarget";
import { supabase } from "../../lib/supabase";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "../../hooks/usePublications";
import {
  canSelectFeaturedPublication,
  MAX_FEATURED_PUBLICATIONS,
} from "../../utils/publicationOrdering";

const MONTH_OPTIONS = [
  { value: "", label: "월 선택 (선택)" },
  { value: 1,  label: "1월 (Jan)" },
  { value: 2,  label: "2월 (Feb)" },
  { value: 3,  label: "3월 (Mar)" },
  { value: 4,  label: "4월 (Apr)" },
  { value: 5,  label: "5월 (May)" },
  { value: 6,  label: "6월 (Jun)" },
  { value: 7,  label: "7월 (Jul)" },
  { value: 8,  label: "8월 (Aug)" },
  { value: 9,  label: "9월 (Sep)" },
  { value: 10, label: "10월 (Oct)" },
  { value: 11, label: "11월 (Nov)" },
  { value: 12, label: "12월 (Dec)" },
];

const EMPTY_FORM = {
  title: "", authors: "", venue: "", year: "", month: "",
  category: "international_journal_sci",
  index_type: "", impact_factor: "", url: "", is_featured: false,
  display_order: 0,
};

const PageTitle    = styled.h1`font-size:22px;font-weight:700;margin-bottom:24px;color:#1e2a3a;`;
const PageHeader   = styled.div`display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:10px;`;
const Section      = styled.section`background:#fff;border:1px solid #e6e6e6;border-radius:8px;padding:24px;margin-bottom:24px;`;
const SectionTitle = styled.h2`font-size:16px;font-weight:700;margin-bottom:16px;color:#1e2a3a;`;
const Table        = styled.table`width:100%;border-collapse:collapse;font-size:13px;`;
const Th           = styled.th`text-align:left;padding:8px 10px;border-bottom:2px solid #e6e6e6;color:#666;font-weight:600;`;
const Td           = styled.td`padding:8px 10px;border-bottom:1px solid #f0f0f0;vertical-align:top;`;
const Btn          = styled.button`padding:4px 10px;border-radius:4px;border:none;cursor:pointer;font-size:12px;font-weight:500;background:${p=>p.$variant==="danger"?"#ed4956":p.$variant==="primary"?"#003569":p.$variant==="add"?"#22863a":"#e2e8f0"};color:${p=>(["danger","primary","add"].includes(p.$variant))?"#fff":"#333"};margin-right:4px;&:disabled{opacity:.5;}`;
const Grid         = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:14px;@media(max-width:600px){grid-template-columns:1fr;}`;
const FullRow      = styled.div`grid-column:1/-1;`;
const Label        = styled.label`font-size:13px;font-weight:600;color:#444;display:block;margin-bottom:4px;`;
const Input        = styled.input`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;&:focus{border-color:#003569;outline:none;}`;
const Select       = styled.select`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;background:#fff;`;
const Textarea     = styled.textarea`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;resize:vertical;&:focus{border-color:#003569;outline:none;}`;
const FormActions  = styled.div`display:flex;gap:10px;margin-top:20px;`;
const Tabs         = styled.div`display:flex;gap:0;margin-bottom:16px;border-bottom:2px solid #e6e6e6;flex-wrap:wrap;`;
const Tab          = styled.button`padding:7px 14px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:${p=>p.$active?700:400};color:${p=>p.$active?"#003569":"#666"};border-bottom:${p=>p.$active?"2px solid #003569":"2px solid transparent"};margin-bottom:-2px;`;
const FeaturedSummary = styled.p`
  margin: -6px 0 16px;
  color: ${p => p.$overLimit ? "#c53030" : "#555"};
  font-size: 13px;
  font-weight: ${p => p.$overLimit ? 650 : 400};
`;
const FeaturedCheckbox = styled.input`width:18px;height:18px;cursor:pointer;accent-color:#003569;&:disabled{cursor:not-allowed;opacity:.45;}`;
const CheckboxLabel = styled.label`display:flex;align-items:center;gap:8px;min-height:38px;font-size:14px;color:#444;`;

const AdminPublications = () => {
  const [pubs,      setPubs]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [form,      setForm]      = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving,    setSaving]    = useState(false);
  const [updatingFeaturedId, setUpdatingFeaturedId] = useState(null);
  const [tab,       setTab]       = useState("international_journal_sci");

  const formRef = useRef(null);

  const fetchPubs = async () => {
    const { data, error } = await supabase.from("publications").select("*").order("display_order").order("year", { ascending: false });
    if (error) {
      alert(`논문 목록을 불러오지 못했습니다: ${error.message}`);
      setLoading(false);
      return;
    }
    setPubs(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPubs(); }, []);

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setForm({ ...EMPTY_FORM, ...p, year: p.year || "", month: p.month || "", impact_factor: p.impact_factor || "", index_type: p.index_type || "", url: p.url || "", is_featured: Boolean(p.is_featured) });
    setEditingId(p.id);
    setTab(p.category);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useAdminEditTarget({
    items: pubs,
    loading,
    onOpen: startEdit,
  });

  const cancelEdit = () => { setForm(EMPTY_FORM); setEditingId(null); };

  const scrollToAdd = () => {
    cancelEdit();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSave = async () => {
    if (!(form.title || "").trim()) return alert("제목을 입력하세요.");
    const currentPublication = pubs.find(p => p.id === editingId);
    if (
      form.is_featured &&
      !canSelectFeaturedPublication(pubs, currentPublication)
    ) {
      return alert(
        `대표 논문은 최대 ${MAX_FEATURED_PUBLICATIONS}개까지 선택할 수 있습니다.`
      );
    }

    setSaving(true);
    const payload = {
      title: (form.title || "").trim(),
      authors: (form.authors || "").trim(),
      venue: (form.venue || "").trim(),
      year: form.year ? parseInt(form.year, 10) : null,
      month: form.month ? parseInt(form.month, 10) : null,
      category: form.category,
      index_type: (form.index_type || "").trim(),
      impact_factor: (form.impact_factor || "").trim(),
      url: (form.url || "").trim(),
      is_featured: Boolean(form.is_featured),
      display_order: parseInt(form.display_order, 10) || 0,
    };
    const { error } = editingId
      ? await supabase.from("publications").update(payload).eq("id", editingId)
      : await supabase.from("publications").insert(payload);
    if (error) {
      alert(`논문 저장에 실패했습니다: ${error.message}`);
      setSaving(false);
      return;
    }
    await fetchPubs();
    cancelEdit();
    setSaving(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`삭제하시겠습니까?\n"${title.slice(0, 60)}..."`)) return;
    await supabase.from("publications").delete().eq("id", id);
    fetchPubs();
  };

  const tabPubs = pubs.filter(p => p.category === tab);
  const featuredCount = pubs.filter(p => p.is_featured).length;

  const toggleFeatured = async (publication) => {
    const nextValue = !publication.is_featured;
    if (nextValue && !canSelectFeaturedPublication(pubs, publication)) {
      alert(
        `대표 논문은 최대 ${MAX_FEATURED_PUBLICATIONS}개까지 선택할 수 있습니다.`
      );
      return;
    }

    setUpdatingFeaturedId(publication.id);
    const { error } = await supabase
      .from("publications")
      .update({ is_featured: nextValue })
      .eq("id", publication.id);

    if (error) {
      alert(`대표 논문 설정에 실패했습니다: ${error.message}`);
    } else {
      setPubs(current =>
        current.map(item =>
          item.id === publication.id
            ? { ...item, is_featured: nextValue }
            : item
        )
      );
    }
    setUpdatingFeaturedId(null);
  };

  const formatYearMonth = (year, month) => {
    if (!year) return "-";
    if (!month) return String(year);
    const mon = MONTH_OPTIONS.find(m => m.value === month);
    return `${year} / ${mon ? mon.label.split(" ")[1] : month}월`;
  };

  return (
    <AdminLayout>
      <PageHeader>
        <PageTitle style={{ margin: 0 }}>Publications 관리</PageTitle>
        <Btn $variant="add" onClick={scrollToAdd}>＋ 새 논문 추가</Btn>
      </PageHeader>

      <Section>
        <FeaturedSummary
          $overLimit={featuredCount > MAX_FEATURED_PUBLICATIONS}
        >
          메인 화면 대표 논문: <strong>{featuredCount}/{MAX_FEATURED_PUBLICATIONS}</strong>
          {" · "}선택된 논문은 연도와 Impact Factor가 높은 순서로 표시됩니다.
          {featuredCount > MAX_FEATURED_PUBLICATIONS &&
            ` 기존 선택에서 ${featuredCount - MAX_FEATURED_PUBLICATIONS}개를 해제해 주세요.`}
        </FeaturedSummary>
        <Tabs>
          {CATEGORY_ORDER.map(cat => (
            <Tab key={cat} $active={tab === cat} onClick={() => setTab(cat)}>
              {CATEGORY_LABELS[cat]} ({pubs.filter(p => p.category === cat).length})
            </Tab>
          ))}
        </Tabs>
        {loading ? <p>Loading...</p> : (
          <div style={{ overflowX: "auto" }}>
            <Table>
              <thead>
                <tr><Th style={{width:60}}>대표</Th><Th style={{width:40}}>#</Th><Th>제목 / 저자</Th><Th>저널/학회</Th><Th>연도/월</Th><Th>INDEX</Th><Th>IF</Th><Th>액션</Th></tr>
              </thead>
              <tbody>
                {tabPubs.map((p) => (
                  <tr key={p.id}>
                    <Td>
                      <FeaturedCheckbox
                        type="checkbox"
                        checked={Boolean(p.is_featured)}
                        disabled={
                          Boolean(updatingFeaturedId) ||
                          !canSelectFeaturedPublication(pubs, p)
                        }
                        onChange={() => toggleFeatured(p)}
                        aria-label={`${p.title} 대표 논문`}
                      />
                    </Td>
                    <Td>{p.display_order}</Td>
                    <Td>
                      <div style={{ fontWeight: 600, marginBottom: 2 }}>{p.title}</div>
                      <div style={{ color: "#666", fontSize: 12 }}>{p.authors}</div>
                    </Td>
                    <Td style={{ fontSize: 12 }}>{p.venue}</Td>
                    <Td style={{ whiteSpace: "nowrap" }}>{formatYearMonth(p.year, p.month)}</Td>
                    <Td>{p.index_type}</Td>
                    <Td>{p.impact_factor}</Td>
                    <Td>
                      <Btn onClick={() => startEdit(p)}>편집</Btn>
                      <Btn $variant="danger" onClick={() => handleDelete(p.id, p.title)}>삭제</Btn>
                    </Td>
                  </tr>
                ))}
                {tabPubs.length === 0 && <tr><Td colSpan={8} style={{ color: "#999", textAlign: "center" }}>데이터 없음</Td></tr>}
              </tbody>
            </Table>
          </div>
        )}
      </Section>

      <Section ref={formRef}>
        <SectionTitle>{editingId ? "논문 편집" : "새 논문 추가"}</SectionTitle>
        <Grid>
          <FullRow>
            <Label>제목 *</Label>
            <Textarea rows={2} value={form.title} onChange={e => setField("title", e.target.value)} placeholder="논문 제목" />
          </FullRow>
          <FullRow>
            <Label>저자 *</Label>
            <Input value={form.authors} onChange={e => setField("authors", e.target.value)} placeholder="Author1, Author2, and Author3" />
          </FullRow>
          <FullRow>
            <Label>저널/학회명 (권호 포함)</Label>
            <Input value={form.venue} onChange={e => setField("venue", e.target.value)} placeholder="예: IEEE Access, Vol.9" />
          </FullRow>
          <div>
            <Label>카테고리 *</Label>
            <Select value={form.category} onChange={e => setField("category", e.target.value)}>
              {CATEGORY_ORDER.map(cat => <option key={cat} value={cat}>{CATEGORY_LABELS[cat]}</option>)}
            </Select>
          </div>
          <div>
            <Label>연도</Label>
            <Input type="number" value={form.year} onChange={e => setField("year", e.target.value)} placeholder="2024" />
          </div>
          <div>
            <Label>월</Label>
            <Select value={form.month} onChange={e => setField("month", e.target.value)}>
              {MONTH_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </Select>
          </div>
          <div>
            <Label>색인 (SCIE / ESCI / SCOPUS)</Label>
            <Input value={form.index_type} onChange={e => setField("index_type", e.target.value)} placeholder="SCIE" />
          </div>
          <div>
            <Label>Impact Factor</Label>
            <Input value={form.impact_factor} onChange={e => setField("impact_factor", e.target.value)} placeholder="6.2" />
          </div>
          <div>
            <Label>URL</Label>
            <Input value={form.url} onChange={e => setField("url", e.target.value)} placeholder="https://doi.org/..." />
          </div>
          <div>
            <Label>표시 순서</Label>
            <Input type="number" value={form.display_order} onChange={e => setField("display_order", e.target.value)} />
          </div>
          <div>
            <Label>메인 화면</Label>
            <CheckboxLabel>
              <FeaturedCheckbox
                type="checkbox"
                checked={Boolean(form.is_featured)}
                disabled={
                  !form.is_featured &&
                  !pubs.find(p => p.id === editingId)?.is_featured &&
                  featuredCount >= MAX_FEATURED_PUBLICATIONS
                }
                onChange={e => setField("is_featured", e.target.checked)}
              />
              대표 논문으로 표시
            </CheckboxLabel>
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

export default AdminPublications;
