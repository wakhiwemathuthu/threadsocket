type Props = {
  title: string;
  onClick?: any;
  borderColor?: string;
  textColor?: string;
  className?: string;
};

function OutlinedButton({
  title,
  onClick,
  borderColor = "border border-white",
  className,
  textColor = "text-white",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${className} ${borderColor} ${textColor} bg-transparent`}
    >
      {title}
    </button>
  );
}

export default OutlinedButton;
