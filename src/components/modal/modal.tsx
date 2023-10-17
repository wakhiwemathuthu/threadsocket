import { ReactNode } from "react";

type Props = {
  state: string;
  children?: ReactNode;
  className?: string;
  backdrop?: string;
  backdropClick?: any;
};

function Modal({
  state,
  children,
  backdropClick,
  backdrop = "bg-black-backdrop",
  className = "p-3 w-96 mx-auto mt-24 rounded-md bg-black-800",
}: Props) {
  const isOpen = state === "visible";
  return (
    <div
      onClick={backdropClick}
      className={`absolute ${backdrop} z-50 top-0 left-0 bottom-0 right-0  ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className={`${className}`}>{children}</div>
    </div>
  );
}

export default Modal;
