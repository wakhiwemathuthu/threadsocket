import { FiAtSign } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FilledButton from "../../components/filled-button";
import { useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { Theme } from "emoji-picker-react";
import { GoSidebarCollapse, GoSidebarExpand, GoSmiley } from "react-icons/go";
import { IoSend } from "react-icons/io5";

type Props = {
  state: string;
  toggleSideBar: any;
};

function DirectMessage({ state, toggleSideBar }: Props){
  const { userId } = useParams();
  const [emojiModal, setEmojiModal] = useState<"visible" | "hidden">("hidden");
  const [input, setInput] = useState<string>("");
  const messageInputRef = useRef<HTMLInputElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);

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

  //Side effect that runs on the initial render
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
        <div
          onClick={toggleSideBar}
          className="w-9 h-9 flex items-center justify-center cursor-pointer"
        >
          {isSideBarOpen ? (
            <GoSidebarExpand size={24} color="#908f93" />
          ) : (
            <GoSidebarCollapse size={24} color="#908f93" />
          )}
        </div>
        <div className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-black-50">
          <FiAtSign size={18} color="#908f93" />
          <p className="text-gray-300">Person's Name</p>
          <FaAngleDown size={18} color="#908f93" />
        </div>
      </div>
      <div className="m-3">
        <div className="flex gap-2 p-3 rounded-md bg-black-200">
          <AiOutlineInfoCircle size={24} color="white" />
          <div>
            <p className="font-bold text-white">
              Messages and files older than 60 days are concealed.
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
    </div>
  );
}

export default DirectMessage;
