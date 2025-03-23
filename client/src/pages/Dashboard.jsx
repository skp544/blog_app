import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashboard/DashSidebar.jsx";
import DashProfile from "../components/dashboard/DashProfile.jsx";
import DashPosts from "../components/dashboard/DashPosts.jsx";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/*  Dashboard Sidebar */}
      <div className={"md:w-56"}>
        <DashSidebar />
      </div>

      {tab === "profile" && <DashProfile />}

      {tab === "posts" && <DashPosts />}
    </div>
  );
};
export default Dashboard;
