import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PropsType = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};
export default function Modal({ children, open, onClose }: PropsType) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(
    function () {
      if (open) {
        ref.current?.showModal();
      } else {
        ref.current?.close();
      }
    },
    [open]
  );

  function handleClose() {
    ref.current?.close();
    onClose();
  }

  return createPortal(
    <dialog
      className="backdrop:bg-gray-800/50 w-[24rem] bg-gray-800 py-8 px-4"
      ref={ref}
      onClose={handleClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")!
  );
}
