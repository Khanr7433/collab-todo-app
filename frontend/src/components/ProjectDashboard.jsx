import React, { useState, useEffect } from "react";
import { getProjects } from "../services/projectApi.js";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      setProjects(response.data.data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load project dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getProjectStats = () => {
    const total = projects.length;
    const active = projects.filter(p => p.status === "active").length;
    const completed = projects.filter(p => p.status === "completed").length;
    const archived = projects.filter(p => p.status === "archived").length;
    const owned = projects.filter(p => p.owner?._id === user?._id).length;
    const member = projects.filter(p => 
      p.members?.some(m => m._id === user?._id) && p.owner?._id !== user?._id
    ).length;

    return { total, active, completed, archived, owned, member };
  };

  const getRecentProjects = () => {
    return projects
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, 5);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-900 text-green-200 border-green-700";
      case "completed":
        return "bg-blue-900 text-blue-200 border-blue-700";
      case "archived":
        return "bg-gray-700 text-gray-300 border-gray-600";
      default:
        return "bg-gray-700 text-gray-300 border-gray-600";
    }
  };

  const stats = getProjectStats();
  const recentProjects = getRecentProjects();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Project Dashboard</h1>
        <p className="text-gray-400">Welcome back, {user?.fullName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-black border border-gray-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-gray-400">Total Projects</div>
        </div>
        
        <div className="bg-black border border-green-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{stats.active}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        
        <div className="bg-black border border-blue-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-400">{stats.completed}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        
        <div className="bg-black border border-gray-600 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-400">{stats.archived}</div>
          <div className="text-sm text-gray-400">Archived</div>
        </div>
        
        <div className="bg-black border border-purple-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-400">{stats.owned}</div>
          <div className="text-sm text-gray-400">Owned</div>
        </div>
        
        <div className="bg-black border border-yellow-700 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-400">{stats.member}</div>
          <div className="text-sm text-gray-400">Member</div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-black border border-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Projects</h2>
        
        {recentProjects.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">No projects yet</h3>
            <p className="mt-1 text-sm text-gray-400">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project._id}
                className="flex justify-between items-center p-3 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status?.charAt(0).toUpperCase() +
                        project.status?.slice(1)}
                    </span>
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>Owner: {project.owner?.fullName}</span>
                    <span>Members: {project.members?.length || 0}</span>
                    <span>Updated: {formatDate(project.updatedAt || project.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-black border border-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-colors text-left">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div>
              <div className="font-medium text-white">Create New Project</div>
              <div className="text-sm text-gray-400">Start a new collaborative project</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 hover:bg-gray-800 transition-colors text-left">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <div>
              <div className="font-medium text-white">View All Tasks</div>
              <div className="text-sm text-gray-400">Manage your tasks across projects</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
