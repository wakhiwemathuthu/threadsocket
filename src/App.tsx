import { useState } from "react";
import SideBar from "./components/sidebar/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import DirectMessage from "./pages/direct-message/direct-message";
import Channel from "./pages/channel/channel";

function App() {
  const [sideBar, setSideBar] = useState<"visible" | "hidden">("visible");

  const toggleSideBar = () => {
    setSideBar((value) => {
      return value === "visible" ? "hidden" : "visible";
    });
  };

  return (
    <div>
      <SideBar state={sideBar} />
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
    </div>
  );
}

export default App;
