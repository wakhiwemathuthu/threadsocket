import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title?: string;
  subtitle?: string;
  onClick?: any;
  ref?: any;
};

function BigIconButton({
  icon,
  title,
  subtitle,
  onClick,
  ref,
}: Props) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="bg-black-800 w-96 flex flex-row items-center gap-2 p-3 rounded border border-gray-300 hover:bg-black-50"
    >
      <div className="flex items-center justify-center w-9 h-9 bg-black-50 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-gray-200 text-start font-bold">{title}</p>
        <p className="text-gray-300 text-start text-sm">{subtitle}</p>
      </div>
    </button>
  );
}

export default BigIconButton;
