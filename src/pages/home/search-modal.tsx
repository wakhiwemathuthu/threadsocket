import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

type Props = {
  setSearchModal: any;
  state: string;
};

function SearchModal({ setSearchModal, state }: Props){
  const isVisible = state === "visible";

  const CloseSearchModal = (e: any) => {
    if (e.target === e.currentTarget) {
      setSearchModal("hidden");
    }
  };

  return (
    <div
      onClick={CloseSearchModal}
      className={`fixed ${
        isVisible ? "block" : "hidden"
      } top-0 left-0 right-0 bottom-0`}
    >
      <div onClick={CloseSearchModal} className="h-full px-2 ml-14  md:ml-72">
        <div className="h-72 w-full mx-auto cursor-pointerpointer-events-none z-10 bg-black-800 rounded-md lg:w-1/2">
          <div className="border-b border-gray-300">
            <div className="flex justify-between items-center p-2">
              <div className="flex gap-2 flex-1 items-center">
                <BiSearch color="#908f93" size={18} />
                <input
                  autoFocus={true}
                  placeholder="Search..."
                  className="flex-1 text-white caret-white bg-transparent p-2 outline-none border-none"
                  type="text"
                />
              </div>
              <div
                onClick={() => setSearchModal("hidden")}
                className="p-2 cursor-pointer"
              >
                <IoMdClose color="#908f93" size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
