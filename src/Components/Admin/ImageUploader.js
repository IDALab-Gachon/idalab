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

const FileInput = styled.input`
  font-size: 13px;
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

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setStatusMsg("업로드 실패: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    onUpload(publicUrl);
    setStatusMsg("완료");
    setUploading(false);
  };

  return (
    <Wrapper>
      {currentUrl && <Preview src={currentUrl} alt="preview" />}
      <FileInput
        type="file"
        accept="image/*"
        onChange={handleChange}
        disabled={uploading}
      />
      {statusMsg && <UploadStatus $error={statusMsg.startsWith("업로드 실패")}>{statusMsg}</UploadStatus>}
    </Wrapper>
  );
};

export default ImageUploader;
