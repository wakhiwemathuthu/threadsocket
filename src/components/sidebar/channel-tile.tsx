import { BsHash } from "react-icons/bs";
import { NavLink } from "react-router-dom";

type Props = {
  id: string;
  title: string;
};

function ChannelTile({ id, title }: Props) {
  return (
    <NavLink
      className={({ isActive }) => {
        return isActive
          ? "flex flex-row items-center gap-2 p-1 bg-blue-400 rounded "
          : "flex flex-row items-center gap-2 p-1 rounded hover:bg-black-50";
      }}
      to={`/channel/${id}`}
    >
      {({ isActive }) => {
        return (
          <>
            <BsHash color={`${isActive ? "white" : "#908f93"} `} size={18} />
            <p className={`${isActive ? "text-white" : "text-gray-300"} `}>
              {title}
            </p>
          </>
        );
      }}
    </NavLink>
  );
}

export default ChannelTile;
