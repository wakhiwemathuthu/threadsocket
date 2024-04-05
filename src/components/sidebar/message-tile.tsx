import { NavLink } from "react-router-dom";
import { FiAtSign } from "react-icons/fi";

type Props = {
  id: string;
  title: string;
};

function MessageTile({ id, title }: Props) {
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? "flex flex-row items-center gap-2 p-1 bg-blue-400 rounded "
          : "flex flex-row items-center gap-2 p-1 rounded hover:bg-black-50";
      }}
      to={`/message/${id}`}
    >
      {({ isActive }) => {
        return (
          <>
            <FiAtSign color={`${isActive ? "white" : "#908f93"} `} size={18} />
            <p className={`${isActive ? "text-white" : "text-gray-300"} `}>
              {title}
            </p>
          </>
        );
      }}
    </NavLink>
  );
}

export default MessageTile;
