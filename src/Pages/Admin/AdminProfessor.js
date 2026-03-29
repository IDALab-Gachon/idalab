import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import ImageUploader from "../../Components/Admin/ImageUploader";
import { supabase } from "../../lib/supabase";

const PageTitle    = styled.h1`font-size:22px;font-weight:700;margin-bottom:24px;color:#1e2a3a;`;
const Section      = styled.section`background:#fff;border:1px solid #e6e6e6;border-radius:8px;padding:24px;margin-bottom:24px;`;
const SectionTitle = styled.h2`font-size:16px;font-weight:700;margin-bottom:16px;color:#1e2a3a;`;
const Grid         = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:14px;@media(max-width:600px){grid-template-columns:1fr;}`;
const FullRow      = styled.div`grid-column:1/-1;`;
const Label        = styled.label`font-size:13px;font-weight:600;color:#444;display:block;margin-bottom:4px;`;
const Input        = styled.input`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;&:focus{border-color:#003569;outline:none;}`;
const Textarea     = styled.textarea`width:100%;padding:8px 10px;border:1px solid #e6e6e6;border-radius:6px;font-size:14px;resize:vertical;&:focus{border-color:#003569;outline:none;}`;
const SaveBtn      = styled.button`padding:9px 24px;background:#003569;color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:pointer;&:hover{background:#00254d;}&:disabled{opacity:.5;}`;
const ItemRow      = styled.div`display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;`;
const RemoveBtn    = styled.button`padding:4px 8px;background:#ed4956;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;flex-shrink:0;`;
const AddBtn       = styled.button`padding:6px 14px;background:#e2e8f0;color:#333;border:none;border-radius:4px;cursor:pointer;font-size:13px;margin-top:4px;`;

const AdminProfessor = () => {
  const [profId,    setProfId]    = useState(null);
  const [detailId,  setDetailId]  = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);

  // 기본 정보
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [website,   setWebsite]   = useState("");
  const [photoUrl,  setPhotoUrl]  = useState("");

  // 상세 정보
  const [bioSketch, setBioSketch] = useState("");
  const [interests, setInterests] = useState([]); // [{title, items:[]}]
  const [experiences, setExperiences] = useState([]); // [{role, org, period}]

  useEffect(() => {
    const fetch = async () => {
      const { data: prof } = await supabase.from("members").select("*").eq("role", "professor").eq("status", "active").single();
      if (prof) {
        setProfId(prof.id);
        setName(prof.name || "");
        setEmail(prof.email || "");
        setWebsite(prof.website || "");
        setPhotoUrl(prof.photo_url || "");

        const { data: det } = await supabase.from("professor_details").select("*").eq("member_id", prof.id).single();
        if (det) {
          setDetailId(det.id);
          setBioSketch(det.bio_sketch || "");
          setInterests(det.research_interests || []);
          setExperiences(det.experiences || []);
        }
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSaveBasic = async () => {
    if (!profId) return;
    setSaving(true);
    await supabase.from("members").update({ name, email, website, photo_url: photoUrl }).eq("id", profId);
    setSaving(false);
    alert("기본 정보가 저장되었습니다.");
  };

  const handleSaveDetails = async () => {
    if (!profId) return;
    setSaving(true);
    const payload = { member_id: profId, bio_sketch: bioSketch, research_interests: interests, experiences, updated_at: new Date().toISOString() };
    if (detailId) {
      await supabase.from("professor_details").update(payload).eq("id", detailId);
    } else {
      const { data } = await supabase.from("professor_details").insert(payload).select().single();
      if (data) setDetailId(data.id);
    }
    setSaving(false);
    alert("상세 정보가 저장되었습니다.");
  };

  // ── Research Interests 편집 ──
  const addInterest = () => setInterests(p => [...p, { title: "", items: [] }]);
  const updateInterestTitle = (i, v) => setInterests(p => p.map((x, idx) => idx === i ? { ...x, title: v } : x));
  const removeInterest = (i) => setInterests(p => p.filter((_, idx) => idx !== i));
  const addInterestItem = (i) => setInterests(p => p.map((x, idx) => idx === i ? { ...x, items: [...x.items, ""] } : x));
  const updateInterestItem = (i, j, v) => setInterests(p => p.map((x, idx) => idx === i ? { ...x, items: x.items.map((it, jdx) => jdx === j ? v : it) } : x));
  const removeInterestItem = (i, j) => setInterests(p => p.map((x, idx) => idx === i ? { ...x, items: x.items.filter((_, jdx) => jdx !== j) } : x));

  // ── Experiences 편집 ──
  const addExp = () => setExperiences(p => [...p, { role: "", org: "", period: "" }]);
  const updateExp = (i, k, v) => setExperiences(p => p.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const removeExp = (i) => setExperiences(p => p.filter((_, idx) => idx !== i));

  if (loading) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <PageTitle>Professor 관리</PageTitle>

      {/* 기본 정보 */}
      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <Grid>
          <div>
            <Label>이름</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Prof. OkRan Jeong" />
          </div>
          <div>
            <Label>이메일</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <FullRow>
            <Label>개인 웹사이트</Label>
            <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="http://..." />
          </FullRow>
          <FullRow>
            <Label>프로필 사진</Label>
            <ImageUploader bucket="member-photos" currentUrl={photoUrl} onUpload={setPhotoUrl} />
          </FullRow>
        </Grid>
        <div style={{ marginTop: 20 }}>
          <SaveBtn onClick={handleSaveBasic} disabled={saving}>기본 정보 저장</SaveBtn>
        </div>
      </Section>

      {/* Bio Sketch */}
      <Section>
        <SectionTitle>Bio Sketch</SectionTitle>
        <Textarea rows={6} value={bioSketch} onChange={e => setBioSketch(e.target.value)} placeholder="교수 약력을 입력하세요..." />
      </Section>

      {/* Research Interests */}
      <Section>
        <SectionTitle>Research Interests</SectionTitle>
        {interests.map((item, i) => (
          <div key={i} style={{ marginBottom: 16, padding: 14, background: "#f7f8fa", borderRadius: 6 }}>
            <ItemRow>
              <Input value={item.title} onChange={e => updateInterestTitle(i, e.target.value)} placeholder="관심 분야 제목" />
              <RemoveBtn onClick={() => removeInterest(i)}>−</RemoveBtn>
            </ItemRow>
            {item.items.map((sub, j) => (
              <ItemRow key={j} style={{ paddingLeft: 16 }}>
                <Input value={sub} onChange={e => updateInterestItem(i, j, e.target.value)} placeholder="세부 항목" />
                <RemoveBtn onClick={() => removeInterestItem(i, j)}>−</RemoveBtn>
              </ItemRow>
            ))}
            <AddBtn onClick={() => addInterestItem(i)} style={{ marginLeft: 16 }}>+ 세부 항목 추가</AddBtn>
          </div>
        ))}
        <AddBtn onClick={addInterest}>+ 관심 분야 추가</AddBtn>
      </Section>

      {/* Experiences */}
      <Section>
        <SectionTitle>Experiences</SectionTitle>
        {experiences.map((exp, i) => (
          <div key={i} style={{ marginBottom: 12, padding: 14, background: "#f7f8fa", borderRadius: 6 }}>
            <Grid>
              <FullRow>
                <Label>직책/역할</Label>
                <ItemRow>
                  <Input value={exp.role} onChange={e => updateExp(i, "role", e.target.value)} placeholder="예: Visiting Researcher, Department of CS" />
                  <RemoveBtn onClick={() => removeExp(i)}>−</RemoveBtn>
                </ItemRow>
              </FullRow>
              <div>
                <Label>소속 기관</Label>
                <Input value={exp.org} onChange={e => updateExp(i, "org", e.target.value)} placeholder="예: Univ. of California, Irvine (UCI)" />
              </div>
              <div>
                <Label>기간</Label>
                <Input value={exp.period} onChange={e => updateExp(i, "period", e.target.value)} placeholder="예: Jun. 2017 – Feb. 2018" />
              </div>
            </Grid>
          </div>
        ))}
        <AddBtn onClick={addExp}>+ 경력 추가</AddBtn>
      </Section>

      <div style={{ marginBottom: 40 }}>
        <SaveBtn onClick={handleSaveDetails} disabled={saving}>상세 정보 저장</SaveBtn>
      </div>
    </AdminLayout>
  );
};

export default AdminProfessor;
