import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../Styles/Theme";
import ImageUploader from "./ImageUploader";

const mockUpload = jest.fn();
const mockGetPublicUrl = jest.fn();

jest.mock("../../lib/supabase", () => ({
  supabase: {
    storage: {
      from: () => ({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl,
      }),
    },
  },
}));

const renderUploader = (
  onUpload = jest.fn(),
  onUploadingChange = jest.fn()
) =>
  render(
    <ThemeProvider theme={Theme}>
      <ImageUploader
        bucket="member-photos"
        currentUrl=""
        onUpload={onUpload}
        onUploadingChange={onUploadingChange}
      />
    </ThemeProvider>
  );

beforeEach(() => {
  mockUpload.mockReset();
  mockGetPublicUrl.mockReset();
});

test("exposes a native file input through the visible selection control", () => {
  const { getByLabelText } = renderUploader();
  const fileInput = getByLabelText("사진 파일 선택");

  expect(fileInput).toHaveAttribute("type", "file");
  expect(fileInput).toHaveAttribute("accept", "image/*");
  expect(fileInput).not.toBeDisabled();
});

test("uploads an image and returns its public URL", async () => {
  const onUpload = jest.fn();
  const onUploadingChange = jest.fn();
  const { container, getByRole } = renderUploader(
    onUpload,
    onUploadingChange
  );
  const fileInput = container.querySelector('input[type="file"]');
  const file = new File(["photo"], "professor.jpg", {
    type: "image/jpeg",
  });

  mockUpload.mockResolvedValue({ error: null });
  mockGetPublicUrl.mockReturnValue({
    data: { publicUrl: "https://example.com/professor.jpg" },
  });

  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() =>
    expect(getByRole("status")).toHaveTextContent(
      "업로드 완료 · 저장 버튼을 눌러 반영하세요."
    )
  );
  expect(onUpload).toHaveBeenCalledWith(
    "https://example.com/professor.jpg"
  );
  expect(onUploadingChange.mock.calls).toEqual([[true], [false]]);
  expect(
    fileInput
  ).toHaveValue("");
});
