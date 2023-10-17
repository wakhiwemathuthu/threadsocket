type Props = {
  title: string;
  onClick?: any;
  bgColor?: string;
  textColor?: string;
  className?: string;
};

function FilledButton({
  title,
  onClick,
  className,
  bgColor = "bg-green-200",
  textColor = "text-white",
}: Props){
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${className} ${bgColor} ${textColor}`}
    >
      {title}
    </button>
  );
}

export default FilledButton;
