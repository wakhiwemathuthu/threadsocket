import { LiaRocketSolid } from "react-icons/lia";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import SideBarTile from "./sidebar-tile";
import { NavLink } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import FilledButton from "../filled-button";
import Modal from "../modal/modal";

type Props = {
  state: string;
};

function SideBar({ state }: Props) {
  const [directMessagesVisible, setDirectMessagesVisible] = useState<
    "visible" | "invisible"
  >("invisible");
  const [channelsVisible, setChannelsVisible] = useState<
    "visible" | "invisible"
  >("invisible");
  const [modal, setModal] = useState<"hidden" | "visible">("hidden");

  const toggleModal = () => {
    setModal((val) => {
      return val === "hidden" ? "visible" : "hidden";
    });
  };

  const messages = [
    { name: "Karl" },
    { name: "Tony" },
    { name: "Wakhiwe" },
    { name: "John" },
    { name: "Daniel" },
    { name: "Wakhiwe" },
    { name: "John" },
    { name: "Daniel" },
    { name: "Wakhiwe" },
    { name: "John" },
    { name: "Daniel" },
    { name: "Wakhiwe" },
    { name: "John" },
    { name: "Daniel" },
    { name: "Wakhiwe" },
    { name: "John" },
    { name: "Daniel" },
  ];
  const channels = [
    { name: "Channel 1" },
    { name: "Channel 2" },
    { name: "Channel 3" },
    { name: "Channel 4" },
    { name: "Channel 5" },
    { name: "Channel 6" },
    { name: "Channel 1" },
    { name: "Channel 2" },
    { name: "Channel 3" },
    { name: "Channel 4" },
    { name: "Channel 5" },
    { name: "Channel 6" },
    { name: "Channel 7" },
    { name: "Channel 8" },
    { name: "Channel 9" },
    { name: "Channel 10" },
    { name: "Channel 1" },
    { name: "Channel 2" },
    { name: "Channel 3" },
    { name: "Channel 4" },
    { name: "Channel 5" },
    { name: "Channel 6" },
    { name: "Channel 7" },
    { name: "Channel 8" },
    { name: "Channel 9" },
    { name: "Channel 101" },
  ];
  const isOpen = state === "visible";
  const isMessagesVisible = directMessagesVisible === "visible";
  const isChannelsVisible = channelsVisible === "visible";

  const toggleDirectMessagesVisibility = () => {
    setDirectMessagesVisible((value) => {
      return value === "visible" ? "invisible" : "visible";
    });
  };
  const toggleChannelsVisibility = () => {
    setChannelsVisible((value) => {
      return value === "visible" ? "invisible" : "visible";
    });
  };

  return (
    <>
      <aside
        className={`fixed overflow-hidden bg-purple-900 h-screen top-0 left-0 ${
          isOpen ? "w-72" : "w-0"
        }`}
      >
        <div>
          <div className="p-3 border-b border-black-50">
            <div className="flex items-center justify-between">
              <p className="text-gray-200 font-bold text-lg">Thread Socket</p>
              <button className="p1 flex items-center justify-center rounded-full bg-gray-200 w-9 h-9">
                <FiEdit color="black" size={18} />
              </button>
            </div>
            <button className="flex flex-row justify-center w-full border border-gray-300 p-1 rounded-md items-center gap-2 mt-3 hover:bg-blue-50">
              <LiaRocketSolid color="white" size={24} />
              <p className="text-white">Upgrade Plan</p>
            </button>
          </div>
        </div>
        <div className="h-full">
          <div>
            <div className="px-3 pt-3">
              <NavLink
                className={({ isActive }) => {
                  return isActive
                    ? "flex flex-row items-center gap-2 p-1 bg-blue-400 rounded"
                    : "flex flex-row items-center gap-2 p-1 rounded hover:bg-black-50";
                }}
                to="/"
              >
                {({ isActive }) => {
                  return (
                    <>
                      <BiHome
                        size={18}
                        color={`${isActive ? "white" : "#908f93"} `}
                      />
                      <p
                        className={`${
                          isActive ? "text-white" : "text-gray-300"
                        }`}
                      >
                        Home
                      </p>
                    </>
                  );
                }}
              </NavLink>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between p-3">
                <div className="flex flex-row items-center gap-2">
                  <div
                    onClick={toggleDirectMessagesVisibility}
                    className="bg-black-50 w-fit p-1 rounded cursor-pointer"
                  >
                    {isMessagesVisible ? (
                      <IoMdArrowDropdown color="#908f93" />
                    ) : (
                      <IoMdArrowDropright color="#908f93" />
                    )}
                  </div>
                  <p className="text-gray-300">Direct Messages</p>
                </div>
                <div className="p-1 rounded hover:bg-black-50 w-fit cursor-pointer">
                  <AiOutlinePlus color="#908f93" />
                </div>
              </div>
              <div
                className={`transition-all overflow-y-auto border-t border-b border-black-200 ${
                  isMessagesVisible ? "h-72 p-3" : "h-0 p-0 border-none"
                } `}
              >
                {messages.map((message, index) => {
                  return <SideBarTile to={`/${index}`} title={message.name} />;
                })}
              </div>
            </div>
            <div>
              <div className="flex flex-row items-center justify-between p-3">
                <div className="flex flex-row items-center gap-2">
                  <div
                    onClick={toggleChannelsVisibility}
                    className="bg-black-50 w-fit p-1 rounded cursor-pointer"
                  >
                    {isChannelsVisible ? (
                      <IoMdArrowDropdown color="#908f93" />
                    ) : (
                      <IoMdArrowDropright color="#908f93" />
                    )}
                  </div>
                  <p className="text-gray-300">Channels</p>
                </div>
                <div className="p-1 rounded hover:bg-black-50 w-fit cursor-pointer">
                  <AiOutlinePlus color="#908f93" />
                </div>
              </div>
              <div
                className={`transition-all overflow-y-auto border-t border-b border-black-200 ${
                  isChannelsVisible ? "h-72 p-3" : "h-0 p-0 border-none"
                } `}
              >
                {channels.map((channel, index) => {
                  return (
                    <SideBarTile
                      channel
                      to={`/1${index}`}
                      title={channel.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="p-3">
            <button
              onClick={toggleModal}
              className="flex flex-row w-full items-center gap-2 p-1 rounded hover:bg-black-50"
            >
              <MdLogout color="#908f93" size={18} />
              <p className="text-gray-300">Logout</p>
            </button>
          </div>
        </div>
      </aside>
      <Modal state={modal}>
        <p className="text-white text-xl font-bold text-center">Logout</p>
        <p className="text-white text-center mt-2">
          Are you certain that you wish to log out?
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <FilledButton onClick={toggleModal} title="Cancel" />
          <FilledButton bgColor="bg-red-500" title="Logout" />
        </div>
      </Modal>
    </>
  );
}

export default SideBar;
