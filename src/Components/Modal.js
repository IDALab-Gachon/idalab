import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: rgba(5, 15, 25, 0.88);

  @media (max-width: 520px) {
    padding: 14px;
  }
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  max-width: min(1100px, 100%);
  max-height: calc(100vh - 56px);
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  display: inline-flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 24, 48, 0.78);
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
`;

const ModalImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: calc(100vh - 56px);
  border-radius: 10px;
  object-fit: contain;
`;

const Modal = ({ show, onClose, imgSrc, imageAlt = "Expanded gallery photo" }) => {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!show) return undefined;

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <ModalOverlay
      role="dialog"
      aria-modal="true"
      aria-label="Expanded gallery photo"
      onClick={onClose}
    >
      <ModalContent onClick={(event) => event.stopPropagation()}>
        <CloseButton
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close expanded photo"
        >
          &times;
        </CloseButton>
        <ModalImage src={imgSrc} alt={imageAlt} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
