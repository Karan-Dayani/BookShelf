"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CustomModalProps } from "../interface";

export function CustomModal({ isOpen, onClose, children }: CustomModalProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return render
    ? createPortal(
        <div className={`modal-overlay ${isOpen && "show"}`} onClick={onClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.querySelector("#modal-container")!
      )
    : null;
}
