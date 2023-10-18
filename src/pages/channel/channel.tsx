import { FaAngleDown } from "react-icons/fa";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import FilledButton from "../../components/filled-button";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Theme } from "emoji-picker-react";
import { GoSidebarCollapse, GoSidebarExpand, GoSmiley } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { BsHash } from "react-icons/bs";
import Modal from "../../components/modal/modal";

type Props = {
  state: string;
  toggleSideBar: any;
};

function Channel({ state, toggleSideBar }: Props) {
  const [emojiModal, setEmojiModal] = useState<"visible" | "hidden">("hidden");
  const [channelInfoModal, setChannelInfoModal] = useState<
    "visible" | "hidden"
  >("hidden");
  const [input, setInput] = useState<string>("");
  const [searchInputFocus, setSearchInputFocus] = useState<boolean>(false);
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const message = input.replaceAll(" ", "");
  const isMessageEmpty = message === "";
  const isEmojiModalOpen = emojiModal === "visible";
  const isSideBarOpen = state === "visible";

  //A function to toggle the emoji modal.
  const toggleEmojiModal = () => {
    setEmojiModal((value) => {
      const previousValue = value;
      if (previousValue === "hidden") {
        return "visible";
      } else {
        return "hidden";
      }
    });
  };

  useEffect(() => {
    const handleFocus = () => {
      setSearchInputFocus(true);
    };
    const handleBlur = () => {
      setSearchInputFocus(false);
    };

    if (searchInputRef.current) {
      searchInputRef.current.addEventListener("focus", handleFocus);
      searchInputRef.current.addEventListener("blur", handleBlur);
    }

    return () => {
      if (searchInputRef.current) {
        searchInputRef.current.removeEventListener("focus", handleFocus);
        searchInputRef.current.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  // and when changes are detected on the emojiModal value.
  //This side effect auto focuses the message input.
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
      //get the input value.
      const inputValue = messageInputRef.current.value;
      //Place the cursor at the end of any text inside the input.
      messageInputRef.current.selectionStart = inputValue.length;
      messageInputRef.current.selectionEnd = inputValue.length;
    }
  }, [emojiModal]);

  //Side effect that adds a keyboard event listener to the current window
  //and listens for the shortcut `ctrl + e` to open the emojiModal.
  //This side effect only runs on the initial render of the component.
  useEffect(() => {
    const handleEmojiShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "e") {
        if (emojiButtonRef.current) {
          event.preventDefault();
          emojiButtonRef.current.click();
        }
      }
    };
    window.addEventListener("keydown", handleEmojiShortcut);

    return () => {
      window.removeEventListener("keydown", handleEmojiShortcut);
    };
  }, []);

  return (
    <div className="relative h-full">
      <div className="p-2 h-12 flex items-center justify-between border-b border-gray-300">
        <button
          onClick={toggleSideBar}
          className="w-9 h-9 flex items-center justify-center cursor-pointer"
        >
          {isSideBarOpen ? (
            <GoSidebarExpand size={24} color="#908f93" />
          ) : (
            <GoSidebarCollapse size={24} color="#908f93" />
          )}
        </button>
        <div className="relative w-96">
          <input
            ref={searchInputRef}
            placeholder="Search people on this channel"
            type="text"
            className="caret-white text-white p-1 bg-transparent border border-gray-300 rounded w-full focus:outline-2 focus:outline-green-200 md:w-96"
          />
          <div
            className={` bg-purple-900 h-72 absolute top-10 left-0 right-0 rounded ${
              searchInputFocus ? "block" : "hidden"
            }`}
          ></div>
        </div>
        <button
          onClick={() => setChannelInfoModal("visible")}
          className="flex items-center gap-1 p-1 rounded cursor-pointer hover:bg-black-50"
        >
          <BsHash color={"#908f93"} size={18} />
          <p className="text-gray-300">Channel name</p>
          <FaAngleDown size={18} color="#908f93" />
        </button>
      </div>
      <div className="m-3">
        <div className="flex gap-2 p-3 rounded-md bg-black-200">
          <AiOutlineInfoCircle size={24} color="white" />
          <div>
            <p className="font-bold text-white">
              Channel messages and files older than 60 days are concealed.
            </p>
            <p className="text-white">
              Join Thread Socket Premium for extended file retention, ensuring
              your data remains accessible for an extended duration plus all the
              premium features of the Pro plan.
            </p>
            <FilledButton className="mt-3" title="Learn More" />
          </div>
        </div>
      </div>

      <div className="absolute bg-black-200 bottom-0 left-0 m-3 p-2 flex items-end gap-2 right-0 border border-gray-300 rounded-md">
        <button
          ref={emojiButtonRef}
          onClick={toggleEmojiModal}
          className="p-2 w-fit rounded"
        >
          <GoSmiley size={20} color="#908f93" />
        </button>
        <input
          ref={messageInputRef}
          placeholder="Type a Message"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          className="p-2 resize-none flex-1 bg-transparent caret-white text-white border-none outline-none"
        />
        <button
          onClick={() => alert("Hello World")}
          disabled={isMessageEmpty}
          className={`p-2 ${
            isMessageEmpty ? "bg-black-50" : "bg-green-200"
          } w-fit rounded`}
        >
          <IoSend size={20} color={isMessageEmpty ? "#908f93" : "white"} />
        </button>
      </div>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setEmojiModal("hidden");
          }
        }}
        className={`${
          isEmojiModalOpen ? "block" : "hidden"
        } absolute top-0 left-0 bottom-0 right-0`}
      >
        <div className="absolute bottom-20 left-3">
          <EmojiPicker
            theme={Theme.LIGHT}
            onEmojiClick={(emoji) => {
              setInput((value) => {
                return value + emoji.emoji;
              });
            }}
          />
        </div>
      </div>
      <Modal state={channelInfoModal}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BsHash color={"#d1d2d3"} size={24} />
            <p className="text-gray-200 font-bold">Channel Name</p>
          </div>
          <button
            onClick={() => setChannelInfoModal("hidden")}
            className="rounded cursor-pointer hover:bg-black-50 p-1"
          >
            <AiOutlineClose size={24} color="#908f93" />
          </button>
        </div>
        <div>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <p className="text-gray-200 font-bold">Created By :</p>
              <p className="text-white">John Doe</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-200 font-bold">Date Created :</p>
              <p className="text-white">2023-10-18 17:00</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-200 font-bold">Total members :</p>
              <p className="text-white">167</p>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-white" htmlFor="topic">
              Channel Topic
            </label>
            <input
              id="topic"
              placeholder="Topic here"
              type="text"
              className="flex-1 placeholder:text-gray-300 caret-white text-white p-1 mt-1 bg-transparent border border-gray-300 rounded w-full focus:outline-2 focus:outline-green-200"
            />
          </div>
          <div className="mt-3">
            <label className="text-white" htmlFor="description">
              Channel Description
            </label>
            <textarea
              id="description"
              placeholder="Topic here"
              rows={5}
              className="flex-1 resize-none placeholder:text-gray-300 caret-white text-white p-1 mt-1 bg-transparent border border-gray-300 rounded w-full focus:outline-2 focus:outline-green-200"
            />
          </div>
          <button className="py-2 bg-green-200 mt-3 text-white font-bold w-full rounded shadow">
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Channel;
