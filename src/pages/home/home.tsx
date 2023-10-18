import { FiEdit } from "react-icons/fi";
import { LuKeyboard } from "react-icons/lu";
import { IoIosHelpCircleOutline, IoMdAdd } from "react-icons/io";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchModal from "./search-modal";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal";
import { AiOutlineClose } from "react-icons/ai";
import users from "../../static-data";
import { BsHash } from "react-icons/bs";

import ChatIcon from "../../assets/svg/chat.svg";
import ClockIcon from "../../assets/svg/clock.svg";
import GiftIcon from "../../assets/svg/gift.svg";
import AnnouncementIcon from "../../assets/svg/announce.svg";

type Props = {
  state: string;
  toggleSideBar: any;
};

function Home({ state, toggleSideBar }: Props) {
  const navigate = useNavigate();
  const [searchModal, setSearchModal] = useState<"visible" | "hidden">(
    "hidden"
  );
  const [directMessageModal, setDirectMessageModal] = useState<
    "visible" | "hidden"
  >("hidden");
  const [createChannelModal, setCreateChannelModal] = useState<
    "visible" | "hidden"
  >("hidden");
  const [createChannelPage, setCreateChannelPage] = useState<
    "first" | "second"
  >("first");
  const [supportModal, setSupportModal] = useState<"visible" | "hidden">(
    "hidden"
  );
  const [directMessageSearch, setDirectMessageSearch] = useState<string>("");
  const [channelName, setChannelName] = useState<string>("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const [channelExposure, setChannelExposure] = useState<string>("");

  const name = channelName.trim().replaceAll(" ", "");
  const description = channelDescription.trim().replaceAll(" ", "");

  const isSideBarOpen = state === "visible";
  const isSearchModalOpen = searchModal === "visible";
  const isDirectMessageModalOpen = directMessageModal === "visible";
  const isCreateChannelModalOpen = createChannelModal === "visible";
  const isSupportModalOpen = supportModal === "visible";

  const helpButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const sidebarButtonRef = useRef<HTMLButtonElement | null>(null);
  const directMessageButtonRef = useRef<HTMLButtonElement | null>(null);
  const createChannelButtonRef = useRef<HTMLButtonElement | null>(null);

  const toggleSupportModal = () => {
    setSupportModal((value) => {
      const previousValue = value;
      if (previousValue === "hidden") {
        return "visible";
      } else {
        return "hidden";
      }
    });
  };
  const toggleSearchModal = () => {
    setSearchModal((value) => {
      const previousValue = value;
      if (previousValue === "hidden") {
        return "visible";
      } else {
        return "hidden";
      }
    });
  };

  //Side effect that adds `ctrl + h` shortcut to the current window.
  //This shortcut is for opening and closing Help and Support Modal.
  useEffect(() => {
    const handleSupportShortcut = (e: KeyboardEvent) => {
      if (
        !isSearchModalOpen &&
        !isDirectMessageModalOpen &&
        !isCreateChannelModalOpen
      ) {
        if ((e.ctrlKey || e.metaKey) && e.key === "h") {
          if (helpButtonRef.current) {
            e.preventDefault();
            helpButtonRef.current.click();
          }
        }
      }
    };
    window.addEventListener("keydown", handleSupportShortcut);

    return () => {
      window.removeEventListener("keydown", handleSupportShortcut);
    };
  }, [searchModal, directMessageModal, createChannelModal]);

  //Side effect that adds `ctrl + s` shortcut to the current window.
  //This shortcut is for opening and closing Search people and channels Modal.
  useEffect(() => {
    const handleSearchShortcut = (e: KeyboardEvent) => {
      if (
        !isSupportModalOpen &&
        !isCreateChannelModalOpen &&
        !isDirectMessageModalOpen
      ) {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          if (searchButtonRef.current) {
            e.preventDefault();
            searchButtonRef.current.click();
          }
        }
      }
    };
    window.addEventListener("keydown", handleSearchShortcut);

    return () => {
      window.removeEventListener("keydown", handleSearchShortcut);
    };
  }, [supportModal, createChannelModal, directMessageModal]);

  //Side effect that adds `ctrl + alt + d` shortcut to the current window.
  //This shortcut is for opening and closing Sidebar.
  useEffect(() => {
    const handleSideBarShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "d") {
        if (sidebarButtonRef.current) {
          e.preventDefault();
          sidebarButtonRef.current.click();
        }
      }
    };
    window.addEventListener("keydown", handleSideBarShortcut);

    return () => {
      window.removeEventListener("keydown", handleSideBarShortcut);
    };
  }, []);

  //Side effect that adds `ctrl + alt + m` shortcut to the current window.
  //This shortcut is for opening Start a direct message modal.
  useEffect(() => {
    const handleDirectMessageShortcut = (e: KeyboardEvent) => {
      if (
        !isSupportModalOpen &&
        !isSearchModalOpen &&
        !isCreateChannelModalOpen
      ) {
        if (e.altKey && (e.ctrlKey || e.metaKey) && e.key === "m") {
          if (directMessageButtonRef.current) {
            e.preventDefault();
            directMessageButtonRef.current.click();
          }
        }
      }
    };
    window.addEventListener("keydown", handleDirectMessageShortcut);

    return () => {
      window.removeEventListener("keydown", handleDirectMessageShortcut);
    };
  }, [supportModal, searchModal, createChannelModal]);

  //Side effect that adds `ctrl + alt + c` shortcut to the current window.
  //This shortcut is for opening Start a direct message modal.
  useEffect(() => {
    const handleCreateChannelShortcut = (e: KeyboardEvent) => {
      if (
        !isSupportModalOpen &&
        !isSearchModalOpen &&
        !isDirectMessageModalOpen
      ) {
        if (e.altKey && (e.ctrlKey || e.metaKey) && e.key === "c") {
          if (createChannelButtonRef.current) {
            e.preventDefault();
            createChannelButtonRef.current.click();
          }
        }
      }
    };
    window.addEventListener("keydown", handleCreateChannelShortcut);

    return () => {
      window.removeEventListener("keydown", handleCreateChannelShortcut);
    };
  }, [supportModal, searchModal, directMessageModal]);

  return (
    <div className="bg-black-200 h-full">
      <header className="p-2 h-12 items-center flex flex-row justify-between">
        <button
          ref={sidebarButtonRef}
          onClick={toggleSideBar}
          className="w-9 h-9 flex items-center justify-center"
        >
          {isSideBarOpen ? (
            <GoSidebarExpand size={24} color="#908f93" />
          ) : (
            <GoSidebarCollapse size={24} color="#908f93" />
          )}
        </button>
        <button
          ref={searchButtonRef}
          onClick={toggleSearchModal}
          className="w-96 border border-gray-300 rounded flex flex-row items-center px-1 justify-between hover:bg-gray-100"
        >
          <p className="text-gray-300">Search people, channels</p>
          <BiSearch color="#908f93" />
        </button>
        <button
          ref={helpButtonRef}
          onClick={toggleSupportModal}
          className="w-9 h-9 flex items-center justify-center"
        >
          <IoIosHelpCircleOutline size={24} color="#908f93" />
        </button>
      </header>
      <div className="p-4 bg-green-100 w-full">
        <div className="mx-auto md:w-1/2">
          <h1 className="text-gray-200 text-lg font-bold text-center mt-3 md:text-2xl">
            Welcome to ThreadSocket: Where lightning-fast, secure, and real-time
            communication comes together in one powerful app. Stay connected
            like never before.
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 p-3 mt-4 md:flex-row">
        <button
          ref={directMessageButtonRef}
          onClick={() => setDirectMessageModal("visible")}
          className="bg-black-800 w-96 flex flex-row items-center gap-2 p-3 rounded border border-gray-300 hover:bg-black-50"
        >
          <div className="flex items-center justify-center w-9 h-9 bg-black-50 rounded-full">
            <FiEdit color="#908f93" size={18} />
          </div>
          <div>
            <p className="text-gray-200 text-start font-bold">
              Start a direct message
            </p>
            <p className="text-gray-300 text-start text-sm">
              Talk one-on-one with anyone
            </p>
          </div>
        </button>
        <button
          ref={createChannelButtonRef}
          onClick={() => setCreateChannelModal("visible")}
          className="bg-black-800 w-96 flex flex-row items-center gap-2 p-3 rounded border border-gray-300 hover:bg-black-50"
        >
          <div className="flex items-center justify-center w-9 h-9 bg-black-50 rounded-full">
            <IoMdAdd color="#908f93" size={18} />
          </div>
          <div>
            <p className="text-gray-200 text-start font-bold">
              Create a channel
            </p>
            <p className="text-gray-300 text-start text-sm">
              Connect Globally, Conversations Locally
            </p>
          </div>
        </button>
      </div>
      <SearchModal state={searchModal} setSearchModal={setSearchModal} />
      {
        //Direct Message Modal
      }
      <Modal state={directMessageModal}>
        <div className="flex items-center justify-between">
          <p className="text-white font-bold text-xl">Direct Message</p>
          <button
            onClick={() => setDirectMessageModal("hidden")}
            className="rounded cursor-pointer hover:bg-black-50 p-1"
          >
            <AiOutlineClose size={24} color="#908f93" />
          </button>
        </div>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDirectMessageSearch(e.target.value);
          }}
          placeholder="Search people"
          type="text"
          className="flex-1 placeholder:text-gray-300 caret-white text-white p-1 mt-3 bg-transparent border border-gray-300 rounded w-full focus:outline-2 focus:outline-green-200"
        />
        <ul className="h-96 mt-3 overflow-y-auto">
          {users.map((user) => {
            const fullName = user.fullName.trim().toLowerCase();
            const searchQuery = directMessageSearch.trim().toLowerCase();

            if (fullName.includes(searchQuery)) {
              return (
                <li
                  onClick={() => navigate(`/message/${user.id}`)}
                  className="p-2 rounded group cursor-pointer hover:bg-blue-400"
                  key={user.id}
                >
                  <p className="text-gray-300 group-hover:text-white">
                    {user.fullName}
                  </p>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </Modal>
      {
        //Create Channel Modal
      }
      <Modal state={createChannelModal}>
        <div className="flex items-center justify-between">
          <p className="text-white font-bold text-xl">Create a Channel</p>
          <button
            onClick={() => {
              setChannelName("");
              setChannelDescription("");
              setChannelExposure("");
              setCreateChannelPage("first");
              setCreateChannelModal("hidden");
            }}
            className="rounded cursor-pointer hover:bg-black-50 p-1"
          >
            <AiOutlineClose size={24} color="#908f93" />
          </button>
        </div>
        {createChannelPage === "first" ? (
          <div>
            <div>
              <input
                value={channelName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setChannelName(e.target.value);
                }}
                placeholder="Channel name. e.g. my-team"
                type="text"
                className="flex-1 caret-white text-white p-1 mt-3 bg-transparent border border-gray-300 rounded w-full placeholder:text-gray-300 focus:outline-2 focus:outline-green-200"
              />
              <p className="text-sm text-gray-300 mt-2">
                Channels are where conversations happen around a topic. Use a
                name that is easy to find and understand.
              </p>
            </div>
            <div>
              <textarea
                value={channelDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setChannelDescription(e.target.value);
                }}
                rows={5}
                placeholder="Channel description."
                className="resize-none flex-1 caret-white text-white p-1 mt-3 bg-transparent border border-gray-300 rounded w-full placeholder:text-gray-300 focus:outline-2 focus:outline-green-200"
              />
              <p className="text-sm text-gray-300 mt-2">
                The channel description can encompass a variety of elements,
                such as channel rules, an explanation of the channel's content
                and purpose, and other relevant information.
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-gray-300">Step 1 of 2</p>
              <button
                onClick={() => setCreateChannelPage("second")}
                disabled={name === "" || description === ""}
                className={`${
                  name !== "" && description !== ""
                    ? "text-white"
                    : "text-gray-300 "
                } ${
                  name !== "" && description !== ""
                    ? "bg-green-200"
                    : "bg-black-50"
                } py-2 px-4 rounded  font-bold`}
              >
                Next
              </button>
            </div>
          </div>
        ) : createChannelPage === "second" ? (
          <div>
            <div className="flex items-center gap-2 mt-2">
              <BsHash color={"#908f93"} size={18} />
              <p className="text-gray-300">{channelName}</p>
            </div>
            <div className="mt-4">
              <p className="text-white font-bold">Exposure</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  onChange={() => {
                    setChannelExposure("public");
                  }}
                  name="visibility"
                  id="public"
                  type="radio"
                  className="accent-green-200"
                />
                <label className="text-white cursor-pointer" htmlFor="public">
                  Public - Open to anyone in the ThreadSocket.
                </label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  onChange={() => {
                    setChannelExposure("private");
                  }}
                  name="visibility"
                  className="accent-green-200"
                  id="private"
                  type="radio"
                />
                <label className="text-white cursor-pointer" htmlFor="private">
                  Private - Accessible only to specific individuals.
                </label>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-300">Step 2 of 2</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setChannelExposure("");
                      setCreateChannelPage("first");
                    }}
                    className="py-2 px-4 font-bold text-white border border-gray-300 rounded hover:bg-black-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => alert("Channel Created")}
                    disabled={channelExposure === ""}
                    className={`${
                      channelExposure !== "" ? "text-white" : "text-gray-300 "
                    } ${
                      channelExposure !== "" ? "bg-green-200" : "bg-black-50"
                    } py-2 px-4 rounded  font-bold`}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
      {
        //Support Modal
      }
      <Modal
        backdropClick={(e: any) => {
          if (e.target === e.currentTarget) {
            setSupportModal("hidden");
          }
        }}
        backdrop="transparent"
        className="absolute bottom-3 right-3 rounded-md w-96 h-1/2 bg-black-800  overflow-y-auto"
        state={supportModal}
      >
        <div className="flex items-center fixed  h-12 w-96 rounded-t bg-black-800  justify-between p-2 border-b-2 border-black-200">
          <p className="text-gray-200 text-lg font-bold">Help and Support</p>
          <button
            onClick={() => {
              setSupportModal("hidden");
            }}
            className="rounded cursor-pointer hover:bg-black-50 p-1"
          >
            <AiOutlineClose size={24} color="#908f93" />
          </button>
        </div>
        <div className="p-3 mt-12">
          <div className="flex items-center gap-1">
            <IoIosHelpCircleOutline size={18} color="#908f93" />
            <p className="text-gray-300 text-sm">Explore help topics</p>
          </div>
          <div className="mt-3 grid gap-2">
            <button className="p-2 border-2 flex items-center gap-2 text-start border-black-200 rounded-md text-gray-200 w-full">
              <img height={32} width={32} src={ChatIcon} /> Understand Direct
              messages.
            </button>
            <button className="p-2 flex items-center gap-2 border-2 text-start border-black-200 rounded-md text-gray-200 w-full">
              <img src={ClockIcon} height={32} width={32} />
              Set a reminder.
            </button>
            <button className="p-2 flex items-center gap-2 border-2 text-start border-black-200 rounded-md text-gray-200 w-full">
              <img src={AnnouncementIcon} height={32} width={32} />
              Special Announcements
            </button>
            <button className="p-2 flex items-center gap-2 border-2 text-start border-black-200 rounded-md text-gray-200 w-full">
              <img src={GiftIcon} height={32} width={32} />
              What's new in Thread Socket
            </button>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <LuKeyboard size={18} color="#908f93" />
            <p className="text-gray-300 text-sm">Keyboard shortcuts</p>
          </div>
          <div className="mt-3 grid gap-3">
            <div className="flex items-center justify-between">
              <p className="text-gray-200">Toggle Help an Support</p>
              <div className="flex items-center gap-2">
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Ctrl
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  H
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-200">Search people , channels</p>
              <div className="flex items-center gap-2">
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Ctrl
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  S
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-200">Toggle SideBar</p>
              <div className="flex items-center gap-2">
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Ctrl
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Alt
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  D
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-200">Direct Message</p>
              <div className="flex items-center gap-2">
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Ctrl
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Alt
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  M
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-200">Create a Channel</p>
              <div className="flex items-center gap-2">
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Ctrl
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  Alt
                </p>
                <p className="px-2 py-1 bg-black-100 rounded border-b-2 border-b-gray-300 text-gray-200 w-fit">
                  C
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
