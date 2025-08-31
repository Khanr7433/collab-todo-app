import React from "react";
import { ProjectsList, OnlineUsers, ProjectTasks } from "../components";
import useSocket from "../hooks/useSocket";
import { useAuth } from "../context/AuthContext";

const Projects = () => {
  const { user } = useAuth();
  const { onlineUsers } = useSocket(() => {}, user);

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Projects Content */}
          <div className="lg:col-span-3">
            <ProjectsList />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OnlineUsers onlineUsers={onlineUsers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
