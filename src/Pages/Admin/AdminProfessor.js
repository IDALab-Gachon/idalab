import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import ImageUploader from "../../Components/Admin/ImageUploader";
import {
  DEFAULT_PROFESSOR_PROFILE,
  getProfessorProfile,
} from "../../constants/professorProfile";
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
  const [photoUrl,  setPhotoUrl]  = useState("");
  const [positionTitle, setPositionTitle] = useState(DEFAULT_PROFESSOR_PROFILE.position_title);
  const [affiliation, setAffiliation] = useState(DEFAULT_PROFESSOR_PROFILE.affiliation);
  const [office, setOffice] = useState(DEFAULT_PROFESSOR_PROFILE.office);
  const [telephone, setTelephone] = useState(DEFAULT_PROFESSOR_PROFILE.telephone);
  const [orcidUrl, setOrcidUrl] = useState(DEFAULT_PROFESSOR_PROFILE.orcid_url);
  const [googleScholarUrl, setGoogleScholarUrl] = useState(DEFAULT_PROFESSOR_PROFILE.google_scholar_url);
  const [scopusUrl, setScopusUrl] = useState(DEFAULT_PROFESSOR_PROFILE.scopus_url);

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
        setPhotoUrl(prof.photo_url || "");

        const { data: det } = await supabase.from("professor_details").select("*").eq("member_id", prof.id).single();
        if (det) {
          const profile = getProfessorProfile(det);
          setDetailId(det.id);
          setPositionTitle(profile.position_title);
          setAffiliation(profile.affiliation);
          setOffice(profile.office);
          setTelephone(profile.telephone);
          setOrcidUrl(profile.orcid_url);
          setGoogleScholarUrl(profile.google_scholar_url);
          setScopusUrl(profile.scopus_url);
          setBioSketch(det.bio_sketch || "");
          setInterests(det.research_interests || []);
          setExperiences(det.experiences || []);
        }
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const getDetailsPayload = () => ({
    member_id: profId,
    position_title: positionTitle.trim(),
    affiliation: affiliation.trim(),
    office: office.trim(),
    telephone: telephone.trim(),
    orcid_url: orcidUrl.trim(),
    google_scholar_url: googleScholarUrl.trim(),
    scopus_url: scopusUrl.trim(),
    bio_sketch: bioSketch,
    research_interests: interests,
    experiences,
    updated_at: new Date().toISOString(),
  });

  const saveDetailsRecord = async (payload) => {
    if (detailId) {
      return supabase
        .from("professor_details")
        .update(payload)
        .eq("id", detailId);
    }

    const result = await supabase
      .from("professor_details")
      .insert(payload)
      .select()
      .single();
    if (result.data) setDetailId(result.data.id);
    return result;
  };

  const handleSaveBasic = async () => {
    if (!profId) return;
    setSaving(true);
    try {
      const { error: memberError } = await supabase
        .from("members")
        .update({
          name: name.trim(),
          email: email.trim(),
          photo_url: photoUrl,
        })
        .eq("id", profId);
      if (memberError) throw memberError;

      const { error: detailError } = await saveDetailsRecord(
        getDetailsPayload()
      );
      if (detailError) throw detailError;

      alert("기본 정보가 저장되었습니다.");
    } catch (error) {
      alert(`기본 정보 저장에 실패했습니다: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDetails = async () => {
    if (!profId) return;
    setSaving(true);
    try {
      const { error } = await saveDetailsRecord(getDetailsPayload());
      if (error) throw error;
      alert("상세 정보가 저장되었습니다.");
    } catch (error) {
      alert(`상세 정보 저장에 실패했습니다: ${error.message}`);
    } finally {
      setSaving(false);
    }
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
        <SectionTitle>기본 정보 및 연락처</SectionTitle>
        <Grid>
          <div>
            <Label htmlFor="professor-name">이름</Label>
            <Input id="professor-name" value={name} onChange={e => setName(e.target.value)} placeholder="Prof. OkRan Jeong" />
          </div>
          <div>
            <Label htmlFor="professor-email">이메일</Label>
            <Input id="professor-email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="professor-position">직책</Label>
            <Input id="professor-position" value={positionTitle} onChange={e => setPositionTitle(e.target.value)} placeholder="Professor" />
          </div>
          <div>
            <Label htmlFor="professor-telephone">전화번호</Label>
            <Input id="professor-telephone" type="tel" value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+82-31-750-5831" />
          </div>
          <FullRow>
            <Label htmlFor="professor-affiliation">소속</Label>
            <Textarea id="professor-affiliation" rows={3} value={affiliation} onChange={e => setAffiliation(e.target.value)} placeholder={"School of Computing\nCollege of IT Convergence\nGachon University"} />
          </FullRow>
          <FullRow>
            <Label htmlFor="professor-office">연구실 / 주소</Label>
            <Input id="professor-office" value={office} onChange={e => setOffice(e.target.value)} placeholder="#425, AI Building, Gachon University, Republic of Korea" />
          </FullRow>
          <div>
            <Label htmlFor="professor-orcid">ORCID URL</Label>
            <Input id="professor-orcid" type="url" value={orcidUrl} onChange={e => setOrcidUrl(e.target.value)} placeholder="https://orcid.org/..." />
          </div>
          <div>
            <Label htmlFor="professor-google-scholar">Google Scholar URL</Label>
            <Input id="professor-google-scholar" type="url" value={googleScholarUrl} onChange={e => setGoogleScholarUrl(e.target.value)} placeholder="https://scholar.google.com/citations?user=..." />
          </div>
          <FullRow>
            <Label htmlFor="professor-scopus">Scopus URL</Label>
            <Input id="professor-scopus" type="url" value={scopusUrl} onChange={e => setScopusUrl(e.target.value)} placeholder="https://www.scopus.com/authid/detail.uri?authorId=..." />
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
        <Label htmlFor="professor-bio">약력</Label>
        <Textarea id="professor-bio" rows={6} value={bioSketch} onChange={e => setBioSketch(e.target.value)} placeholder="교수 약력을 입력하세요..." />
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
