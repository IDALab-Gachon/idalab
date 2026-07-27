import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { useAdminEditTarget } from "../../hooks/useAdminEditTarget";
import { supabase } from "../../lib/supabase";
import { compareProjectsByDefault, sortProjects } from "../../utils/projectOrdering";

const EMPTY_FORM = {
  title: "",
  description: "",
  category_id: "",
  start_year: "",
  end_year: "",
  pdf_url: "",
  url: "",
};

const PageTitle = styled.h1`
  margin-bottom: 24px;
  color: #1e2a3a;
  font-size: 22px;
  font-weight: 700;
`;

const Section = styled.section`
  margin-bottom: 24px;
  padding: 24px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background: #fff;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  color: #1e2a3a;
  font-size: 16px;
  font-weight: 700;
`;

const SectionDescription = styled.p`
  margin-top: 5px;
  color: #777;
  font-size: 12px;
  line-height: 1.55;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FullRow = styled.div`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  color: #444;
  font-size: 13px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    border-color: #003569;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background: #fff;
  font-size: 14px;

  &:focus {
    border-color: #003569;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;

  &:focus {
    border-color: #003569;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 6px 12px;
  border: ${(props) =>
    props.$variant === "ghost" ? "1px solid #d9dfe5" : "none"};
  border-radius: 5px;
  background: ${(props) => {
    if (props.$variant === "danger") return "#ed4956";
    if (props.$variant === "primary") return "#003569";
    if (props.$variant === "ghost") return "#fff";
    return "#e2e8f0";
  }};
  color: ${(props) =>
    props.$variant === "danger" || props.$variant === "primary"
      ? "#fff"
      : "#333"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.45;
  }
`;

const FormActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
`;

const CategoryForm = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1fr) auto;
  align-items: end;
  gap: 10px;
  max-width: 620px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const InlineActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const CategoryList = styled.div`
  display: grid;
  gap: 9px;
  margin-top: 18px;
`;

const CategoryRow = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid #e6e6e6;
  border-radius: 7px;
  background: #f9fafb;

  @media (max-width: 620px) {
    grid-template-columns: auto minmax(0, 1fr);

    ${InlineActions} {
      grid-column: 1 / -1;
    }
  }
`;

const OrderControls = styled.div`
  display: flex;
  gap: 4px;
`;

const OrderButton = styled.button`
  min-width: 32px;
  min-height: 30px;
  padding: 4px 7px;
  border: 1px solid #d7dde3;
  border-radius: 4px;
  background: #fff;
  color: #444;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: #003569;
    color: #003569;
  }

  &:disabled {
    cursor: default;
    opacity: 0.32;
  }
`;

const CategoryName = styled.h3`
  overflow-wrap: anywhere;
  color: #1e2a3a;
  font-size: 14px;
  font-weight: 700;
`;

const CategoryMeta = styled.p`
  margin-top: 3px;
  color: #777;
  font-size: 11px;
`;

const ProjectCategory = styled.section`
  & + & {
    margin-top: 28px;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 10px;
  padding-bottom: 9px;
  border-bottom: 1px solid #e6e6e6;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CategoryHeading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const CategoryTitle = styled.h3`
  color: #1e2a3a;
  font-size: 15px;
  font-weight: 700;
`;

const ModeBadge = styled.span`
  padding: 3px 8px;
  border-radius: 12px;
  background: ${(props) => (props.$manual ? "#fff3dc" : "#e9f7ef")};
  color: ${(props) => (props.$manual ? "#8a5700" : "#1d6f42")};
  font-size: 10px;
  font-weight: 700;
`;

const ProjectList = styled.div`
  display: grid;
  gap: 8px;
`;

const ProjectRow = styled.article`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border: 1px solid #e7eaee;
  border-radius: 7px;
  background: #fff;

  @media (max-width: 680px) {
    grid-template-columns: auto minmax(0, 1fr);

    ${InlineActions} {
      grid-column: 1 / -1;
    }
  }
`;

const ProjectTitle = styled.h4`
  color: #1e2a3a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
`;

const ProjectMeta = styled.p`
  margin-top: 4px;
  color: #777;
  font-size: 11px;
  line-height: 1.45;
`;

const EmptyMessage = styled.p`
  padding: 18px;
  border: 1px dashed #d9dfe5;
  border-radius: 7px;
  color: #888;
  font-size: 12px;
  text-align: center;
`;

const StatusMessage = styled.p`
  padding: 18px;
  color: #777;
  font-size: 13px;
  text-align: center;
`;

const getProjectPeriod = (project) => {
  if (!project.start_year) return "기간 미입력";
  return `${project.start_year} – ${project.end_year || "진행 중"}`;
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [savingCategory, setSavingCategory] = useState(false);
  const [reorderingId, setReorderingId] = useState(null);
  const projectFormRef = useRef(null);

  const fetchData = async () => {
    const [projectResult, categoryResult] = await Promise.all([
      supabase.from("projects").select("*"),
      supabase
        .from("project_categories")
        .select("*")
        .order("display_order")
        .order("name"),
    ]);

    const error = projectResult.error || categoryResult.error;
    if (error) {
      setLoadError(error.message);
      setLoading(false);
      return;
    }

    const nextCategories = categoryResult.data || [];
    setProjects(projectResult.data || []);
    setCategories(nextCategories);
    setForm((current) => {
      const categoryStillExists = nextCategories.some(
        (category) => category.id === current.category_id,
      );
      return categoryStillExists || nextCategories.length === 0
        ? current
        : { ...current, category_id: nextCategories[0].id };
    });
    setLoadError("");
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryGroups = useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        projects: sortProjects(
          projects.filter((project) => project.category_id === category.id),
          category.manual_order,
        ),
      })),
    [categories, projects],
  );

  const setField = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const resetProjectForm = () => {
    setForm({
      ...EMPTY_FORM,
      category_id: categories[0]?.id || "",
    });
    setEditingId(null);
  };

  const startEdit = (project) => {
    setForm({
      ...EMPTY_FORM,
      ...project,
      description: project.description || "",
      category_id:
        project.category_id ||
        categories.find((category) => category.name === project.category)?.id ||
        "",
      start_year: project.start_year || "",
      end_year: project.end_year || "",
      pdf_url: project.pdf_url || "",
      url: project.url || "",
    });
    setEditingId(project.id);
    projectFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useAdminEditTarget({
    items: projects,
    loading,
    onOpen: startEdit,
  });

  const handleSave = async () => {
    const title = form.title.trim();
    const category = categories.find(
      (item) => item.id === form.category_id,
    );

    if (!title) return alert("프로젝트명을 입력하세요.");
    if (!category) return alert("카테고리를 선택하세요.");

    setSaving(true);
    const currentProject = projects.find((project) => project.id === editingId);
    const targetProjects = projects.filter(
      (project) => project.category_id === category.id,
    );
    const isMovingCategory =
      currentProject && currentProject.category_id !== category.id;
    const displayOrder =
      currentProject && !isMovingCategory
        ? currentProject.display_order
        : Math.max(
            -1,
            ...targetProjects.map((project) =>
              Number(project.display_order || 0),
            ),
          ) + 1;
    const payload = {
      title,
      description: form.description.trim(),
      category_id: category.id,
      category: category.name,
      start_year: form.start_year ? parseInt(form.start_year, 10) : null,
      end_year: form.end_year ? parseInt(form.end_year, 10) : null,
      pdf_url: form.pdf_url.trim(),
      url: form.url.trim(),
      display_order: displayOrder,
    };

    const result = editingId
      ? await supabase.from("projects").update(payload).eq("id", editingId)
      : await supabase.from("projects").insert(payload);

    if (result.error) {
      alert(`프로젝트 저장에 실패했습니다: ${result.error.message}`);
      setSaving(false);
      return;
    }

    await fetchData();
    resetProjectForm();
    setSaving(false);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`삭제하시겠습니까?\n"${title}"`)) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      alert(`프로젝트 삭제에 실패했습니다: ${error.message}`);
      return;
    }
    await fetchData();
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPdfUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("project-pdfs")
      .upload(fileName, file, { upsert: true });

    if (error) {
      alert(`PDF 업로드에 실패했습니다: ${error.message}`);
      setPdfUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("project-pdfs").getPublicUrl(fileName);
    setField("pdf_url", publicUrl);
    event.target.value = "";
    setPdfUploading(false);
  };

  const saveCategory = async () => {
    const name = categoryName.trim();
    if (!name) return alert("카테고리명을 입력하세요.");

    const duplicate = categories.find(
      (category) =>
        category.id !== editingCategoryId &&
        category.name.toLowerCase() === name.toLowerCase(),
    );
    if (duplicate) return alert("같은 이름의 카테고리가 이미 있습니다.");

    setSavingCategory(true);
    let result;
    if (editingCategoryId) {
      result = await supabase
        .from("project_categories")
        .update({ name })
        .eq("id", editingCategoryId);

      if (!result.error) {
        const legacyUpdate = await supabase
          .from("projects")
          .update({ category: name })
          .eq("category_id", editingCategoryId);
        if (legacyUpdate.error) result = legacyUpdate;
      }
    } else {
      const nextOrder =
        Math.max(
          -1,
          ...categories.map((category) =>
            Number(category.display_order || 0),
          ),
        ) + 1;
      result = await supabase.from("project_categories").insert({
        name,
        display_order: nextOrder,
        manual_order: false,
      });
    }

    if (result.error) {
      alert(`카테고리 저장에 실패했습니다: ${result.error.message}`);
      setSavingCategory(false);
      return;
    }

    setCategoryName("");
    setEditingCategoryId(null);
    await fetchData();
    setSavingCategory(false);
  };

  const startEditCategory = (category) => {
    setCategoryName(category.name);
    setEditingCategoryId(category.id);
  };

  const cancelEditCategory = () => {
    setCategoryName("");
    setEditingCategoryId(null);
  };

  const deleteCategory = async (category) => {
    const projectCount = projects.filter(
      (project) => project.category_id === category.id,
    ).length;
    if (projectCount > 0) {
      alert(
        `이 카테고리에 프로젝트가 ${projectCount}개 있습니다. 프로젝트를 다른 카테고리로 옮긴 후 삭제하세요.`,
      );
      return;
    }
    if (!window.confirm(`카테고리 "${category.name}"을 삭제하시겠습니까?`)) {
      return;
    }

    const { error } = await supabase
      .from("project_categories")
      .delete()
      .eq("id", category.id);
    if (error) {
      alert(`카테고리 삭제에 실패했습니다: ${error.message}`);
      return;
    }
    await fetchData();
  };

  const reorderCategories = async (categoryId, direction) => {
    const currentIndex = categories.findIndex(
      (category) => category.id === categoryId,
    );
    const targetIndex = currentIndex + direction;
    if (
      currentIndex < 0 ||
      targetIndex < 0 ||
      targetIndex >= categories.length
    ) {
      return;
    }

    const reordered = [...categories];
    [reordered[currentIndex], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[currentIndex],
    ];
    setReorderingId(categoryId);
    const results = await Promise.all(
      reordered.map((category, index) =>
        supabase
          .from("project_categories")
          .update({ display_order: index })
          .eq("id", category.id),
      ),
    );
    const failed = results.find((result) => result.error);
    if (failed) {
      alert(`카테고리 순서 변경에 실패했습니다: ${failed.error.message}`);
    }
    await fetchData();
    setReorderingId(null);
  };

  const reorderProject = async (category, projectId, direction) => {
    const ordered = sortProjects(category.projects, category.manual_order);
    const currentIndex = ordered.findIndex(
      (project) => project.id === projectId,
    );
    const targetIndex = currentIndex + direction;
    if (
      currentIndex < 0 ||
      targetIndex < 0 ||
      targetIndex >= ordered.length
    ) {
      return;
    }

    [ordered[currentIndex], ordered[targetIndex]] = [
      ordered[targetIndex],
      ordered[currentIndex],
    ];
    setReorderingId(category.id);
    const results = await Promise.all([
      supabase
        .from("project_categories")
        .update({ manual_order: true })
        .eq("id", category.id),
      ...ordered.map((project, index) =>
        supabase
          .from("projects")
          .update({ display_order: index })
          .eq("id", project.id),
      ),
    ]);
    const failed = results.find((result) => result.error);
    if (failed) {
      alert(`프로젝트 순서 변경에 실패했습니다: ${failed.error.message}`);
    }
    await fetchData();
    setReorderingId(null);
  };

  const resetDefaultOrder = async (category) => {
    const ordered = [...category.projects].sort(compareProjectsByDefault);
    setReorderingId(category.id);
    const results = await Promise.all([
      supabase
        .from("project_categories")
        .update({ manual_order: false })
        .eq("id", category.id),
      ...ordered.map((project, index) =>
        supabase
          .from("projects")
          .update({ display_order: index })
          .eq("id", project.id),
      ),
    ]);
    const failed = results.find((result) => result.error);
    if (failed) {
      alert(`기본 순서 적용에 실패했습니다: ${failed.error.message}`);
    }
    await fetchData();
    setReorderingId(null);
  };

  return (
    <AdminLayout>
      <PageTitle>Projects 관리</PageTitle>

      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>카테고리 관리</SectionTitle>
            <SectionDescription>
              프로젝트 입력 시 사용할 카테고리를 추가하고 표시 순서를
              조정합니다.
            </SectionDescription>
          </div>
        </SectionHeader>

        <CategoryForm>
          <div>
            <Label htmlFor="project-category-name">
              {editingCategoryId ? "카테고리명 수정" : "새 카테고리명"}
            </Label>
            <Input
              id="project-category-name"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="예: Research Projects"
            />
          </div>
          <InlineActions>
            <Button
              type="button"
              $variant="primary"
              onClick={saveCategory}
              disabled={savingCategory}
            >
              {savingCategory
                ? "저장 중..."
                : editingCategoryId
                  ? "수정 저장"
                  : "카테고리 추가"}
            </Button>
            {editingCategoryId && (
              <Button type="button" onClick={cancelEditCategory}>
                취소
              </Button>
            )}
          </InlineActions>
        </CategoryForm>

        <CategoryList>
          {categories.map((category, index) => {
            const projectCount = projects.filter(
              (project) => project.category_id === category.id,
            ).length;
            return (
              <CategoryRow key={category.id}>
                <OrderControls aria-label={`${category.name} 카테고리 순서`}>
                  <OrderButton
                    type="button"
                    onClick={() => reorderCategories(category.id, -1)}
                    disabled={index === 0 || reorderingId !== null}
                    aria-label={`${category.name} 위로 이동`}
                  >
                    ↑
                  </OrderButton>
                  <OrderButton
                    type="button"
                    onClick={() => reorderCategories(category.id, 1)}
                    disabled={
                      index === categories.length - 1 || reorderingId !== null
                    }
                    aria-label={`${category.name} 아래로 이동`}
                  >
                    ↓
                  </OrderButton>
                </OrderControls>
                <div>
                  <CategoryName>{category.name}</CategoryName>
                  <CategoryMeta>
                    프로젝트 {projectCount}개 ·{" "}
                    {category.manual_order ? "수동 순서" : "자동 순서"}
                  </CategoryMeta>
                </div>
                <InlineActions>
                  <Button
                    type="button"
                    $variant="ghost"
                    onClick={() => startEditCategory(category)}
                  >
                    이름 수정
                  </Button>
                  <Button
                    type="button"
                    $variant="danger"
                    onClick={() => deleteCategory(category)}
                  >
                    삭제
                  </Button>
                </InlineActions>
              </CategoryRow>
            );
          })}
          {!loading && categories.length === 0 && (
            <EmptyMessage>
              먼저 프로젝트 카테고리를 추가해 주세요.
            </EmptyMessage>
          )}
        </CategoryList>
      </Section>

      <Section>
        <SectionHeader>
          <div>
            <SectionTitle>프로젝트 표시 순서</SectionTitle>
            <SectionDescription>
              자동 순서는 진행 중 프로젝트를 먼저, 같은 상태에서는 시작
              연도가 빠른 순서로 표시합니다. 위아래 버튼을 누르면 해당
              카테고리가 수동 순서로 전환됩니다.
            </SectionDescription>
          </div>
        </SectionHeader>

        {loading && <StatusMessage>Loading...</StatusMessage>}
        {!loading && loadError && (
          <StatusMessage>
            프로젝트 정보를 불러오지 못했습니다: {loadError}
          </StatusMessage>
        )}
        {!loading &&
          !loadError &&
          categoryGroups.map((category) => (
            <ProjectCategory key={category.id}>
              <CategoryHeader>
                <CategoryHeading>
                  <CategoryTitle>{category.name}</CategoryTitle>
                  <ModeBadge $manual={category.manual_order}>
                    {category.manual_order ? "수동 순서" : "자동 순서"}
                  </ModeBadge>
                </CategoryHeading>
                <Button
                  type="button"
                  $variant="ghost"
                  onClick={() => resetDefaultOrder(category)}
                  disabled={
                    category.projects.length < 2 ||
                    reorderingId === category.id
                  }
                >
                  기본 순서로 재정렬
                </Button>
              </CategoryHeader>

              {category.projects.length === 0 ? (
                <EmptyMessage>이 카테고리에 프로젝트가 없습니다.</EmptyMessage>
              ) : (
                <ProjectList>
                  {category.projects.map((project, index) => (
                    <ProjectRow key={project.id}>
                      <OrderControls aria-label={`${project.title} 표시 순서`}>
                        <OrderButton
                          type="button"
                          onClick={() =>
                            reorderProject(category, project.id, -1)
                          }
                          disabled={index === 0 || reorderingId !== null}
                          aria-label={`${project.title} 위로 이동`}
                        >
                          ↑
                        </OrderButton>
                        <OrderButton
                          type="button"
                          onClick={() =>
                            reorderProject(category, project.id, 1)
                          }
                          disabled={
                            index === category.projects.length - 1 ||
                            reorderingId !== null
                          }
                          aria-label={`${project.title} 아래로 이동`}
                        >
                          ↓
                        </OrderButton>
                      </OrderControls>
                      <div>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectMeta>
                          {getProjectPeriod(project)} ·{" "}
                          {project.end_year ? "Completed" : "Ongoing"} ·{" "}
                          {index + 1}/{category.projects.length}번째
                        </ProjectMeta>
                      </div>
                      <InlineActions>
                        <Button
                          type="button"
                          $variant="ghost"
                          onClick={() => startEdit(project)}
                        >
                          편집
                        </Button>
                        <Button
                          type="button"
                          $variant="danger"
                          onClick={() =>
                            handleDelete(project.id, project.title)
                          }
                        >
                          삭제
                        </Button>
                      </InlineActions>
                    </ProjectRow>
                  ))}
                </ProjectList>
              )}
            </ProjectCategory>
          ))}
      </Section>

      <Section ref={projectFormRef}>
        <SectionHeader>
          <div>
            <SectionTitle>
              {editingId ? "프로젝트 편집" : "새 프로젝트 추가"}
            </SectionTitle>
            <SectionDescription>
              표시 순서는 선택한 카테고리의 정렬 방식에 따라 자동으로
              결정됩니다.
            </SectionDescription>
          </div>
        </SectionHeader>
        <Grid>
          <FullRow>
            <Label htmlFor="project-title">프로젝트명 *</Label>
            <Textarea
              id="project-title"
              rows={2}
              value={form.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="프로젝트 제목"
            />
          </FullRow>
          <FullRow>
            <Label htmlFor="project-description">설명 (기관명 등)</Label>
            <Input
              id="project-description"
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="예: National Research Foundation of Korea (NRF)"
            />
          </FullRow>
          <FullRow>
            <Label htmlFor="project-category">카테고리 *</Label>
            <Select
              id="project-category"
              value={form.category_id}
              onChange={(event) => setField("category_id", event.target.value)}
              disabled={categories.length === 0}
            >
              {categories.length === 0 && (
                <option value="">카테고리를 먼저 추가해 주세요</option>
              )}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FullRow>
          <div>
            <Label htmlFor="project-start-year">시작 연도</Label>
            <Input
              id="project-start-year"
              type="number"
              value={form.start_year}
              onChange={(event) => setField("start_year", event.target.value)}
              placeholder="2023"
            />
          </div>
          <div>
            <Label htmlFor="project-end-year">
              종료 연도 (빈칸 = 진행 중)
            </Label>
            <Input
              id="project-end-year"
              type="number"
              value={form.end_year}
              onChange={(event) => setField("end_year", event.target.value)}
              placeholder="2026"
            />
          </div>
          <div>
            <Label htmlFor="project-url">URL</Label>
            <Input
              id="project-url"
              type="url"
              value={form.url}
              onChange={(event) => setField("url", event.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label htmlFor="project-pdf">PDF 업로드</Label>
            <Input
              id="project-pdf"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handlePdfUpload}
              disabled={pdfUploading}
            />
          </div>
          {form.pdf_url && (
            <FullRow>
              <a
                href={form.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#003569", fontSize: 13, fontWeight: 600 }}
              >
                현재 PDF 보기 ↗
              </a>
            </FullRow>
          )}
        </Grid>
        <FormActions>
          <Button
            type="button"
            $variant="primary"
            onClick={handleSave}
            disabled={saving || categories.length === 0}
          >
            {saving ? "저장 중..." : editingId ? "저장" : "추가"}
          </Button>
          {editingId && (
            <Button type="button" onClick={resetProjectForm}>
              취소
            </Button>
          )}
        </FormActions>
      </Section>
    </AdminLayout>
  );
};

export default AdminProjects;
