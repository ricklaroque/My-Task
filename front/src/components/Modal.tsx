import { IoCloseSharp } from "react-icons/io5";
import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-[10px] min-w-[320px] w-[60vw] h-[60vh] pl-[3rem]">
        <button
          onClick={onClose}
          className="ml-auto mb-2 block px-2 py-1"
        >
          <IoCloseSharp />
        </button>
        {children ?? <h1></h1>}
      </div>
    </div>
  );
}
