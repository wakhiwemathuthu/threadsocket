import { useState } from "react";
import SideBar from "./components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import DirectMessage from "./pages/direct-message/direct-message";
import Modal from "./components/modal/modal";
import FilledButton from "./components/filled-button";
import Channel from "./pages/channel/channel";

function App(): JSX.Element {
  const [sideBar, setSideBar] = useState<"visible" | "hidden">("visible");
  const [LogoutModalState, setLogoutModalState] = useState<
    "visible" | "hidden"
  >("hidden");

  const toggleSideBar = () => {
    setSideBar((value) => {
      return value === "visible" ? "hidden" : "visible";
    });
  };

  const closeLogoutModal = () => {
    setLogoutModalState("hidden");
  };

  const openLogoutModal = () => {
    setLogoutModalState("visible");
  };

  return (
    <div>
      <SideBar state={sideBar} openLogoutModal={openLogoutModal} />
      <div
        className={`bg-black-800 ${
          sideBar === "visible" ? "ml-72" : "ml-0"
        } h-screen`}
      >
        <Routes>
          <Route
            path="/"
            element={<Home state={sideBar} toggleSideBar={toggleSideBar} />}
          />
          <Route
            path="/message/:userId"
            element={
              <DirectMessage state={sideBar} toggleSideBar={toggleSideBar} />
            }
          />
          <Route
            path="/channel/:channelId"
            element={<Channel state={sideBar} toggleSideBar={toggleSideBar} />}
          />
        </Routes>
      </div>
      <Modal state={LogoutModalState}>
        <p className="text-white text-xl font-bold text-center">Logout</p>
        <p className="text-white text-center mt-2">
          Are you certain that you wish to log out?
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <FilledButton onClick={closeLogoutModal} title="Cancel" />
          <FilledButton bgColor="bg-red-500" title="Logout" />
        </div>
      </Modal>
    </div>
  );
}

export default App;
