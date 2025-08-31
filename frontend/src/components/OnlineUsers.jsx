import React from "react";
import { useAuth } from "../context/AuthContext";

const OnlineUsers = ({ onlineUsers = [] }) => {
  const { user } = useAuth();

  const getCurrentUserId = () => {
    return user?.data?.user?._id || user?._id;
  };

  const isCurrentUser = (onlineUser) => {
    const currentUserId = getCurrentUserId();
    const onlineUserId = onlineUser?._id || onlineUser;
    return currentUserId === onlineUserId;
  };

  const getUserDisplayName = (onlineUser) => {
    if (typeof onlineUser === "string") return `User ${onlineUser.slice(-4)}`;
    return (
      onlineUser?.fullName ||
      onlineUser?.name ||
      onlineUser?.email ||
      "Unknown User"
    );
  };

  if (onlineUsers.length === 0) {
    return (
      <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-white">Online Users</h3>
        </div>
        <div className="text-center py-6">
          <svg
            className="w-12 h-12 text-gray-500 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-sm text-gray-400">No users currently online</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-white">Online Users</h3>
        </div>
        <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-600/30">
          {onlineUsers.length}
        </span>
      </div>
      <div className="space-y-3">
        {onlineUsers.map((onlineUser) => {
          const userId = onlineUser?._id || onlineUser;
          const displayName = getUserDisplayName(onlineUser);

          return (
            <div
              key={userId}
              className="group flex items-center p-3 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <div className="flex-1">
                <span
                  className={`text-sm font-medium ${isCurrentUser(onlineUser) ? "text-blue-400" : "text-gray-300 group-hover:text-white"} transition-colors`}
                >
                  {isCurrentUser(onlineUser) ? "You" : displayName}
                </span>
                <p className="text-xs text-gray-500">Online now</p>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnlineUsers;
