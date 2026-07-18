import React, { useState } from "react";
import styled from "styled-components";
import { supabase } from "../../lib/supabase";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Preview = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e6e6e6;
`;

const FilePicker = styled.label`
  position: relative;
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border: 1px solid #cfd8e1;
  border-radius: 6px;
  background: #fff;
  color: #003569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: #003569;
    background: #f5f8fb;
  }

  &:focus-within {
    outline: 3px solid #3897f0;
    outline-offset: 3px;
  }
`;

const FileInput = styled.input`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

const PickerText = styled.span`
  pointer-events: none;
`;

const UploadStatus = styled.span`
  font-size: 12px;
  color: ${(props) => (props.$error ? "#ed4956" : "#999")};
`;

const ImageUploader = ({ bucket, onUpload, currentUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setStatusMsg("업로드 중...");

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName);

      onUpload(publicUrl);
      setStatusMsg("업로드 완료 · 저장 버튼을 눌러 반영하세요.");
    } catch (error) {
      setStatusMsg(`업로드 실패: ${error.message || "알 수 없는 오류"}`);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <Wrapper>
      {currentUrl && <Preview src={currentUrl} alt="현재 프로필 사진 미리보기" />}
      <FilePicker
        style={uploading ? { opacity: 0.5, cursor: "default" } : undefined}
      >
        <PickerText>
          {uploading ? "업로드 중..." : "사진 파일 선택"}
        </PickerText>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          aria-label="사진 파일 선택"
        />
      </FilePicker>
      {statusMsg && (
        <UploadStatus
          role="status"
          aria-live="polite"
          $error={statusMsg.startsWith("업로드 실패")}
        >
          {statusMsg}
        </UploadStatus>
      )}
    </Wrapper>
  );
};

export default ImageUploader;
