import React from "react";
import { useAuth } from "../context/AuthContext";

const OnlineUsers = ({ onlineUsers = [] }) => {
  const { user } = useAuth();

  const getCurrentUserId = () => {
    return user?.data?.user?._id || user?._id;
  };

  const isCurrentUser = (userId) => {
    return getCurrentUserId() === userId;
  };

  if (onlineUsers.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
          Online Users
        </h3>
        <p className="text-xs text-gray-500">No users online</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        Online Users ({onlineUsers.length})
      </h3>
      <div className="space-y-2">
        {onlineUsers.map((userId, index) => (
          <div
            key={userId}
            className="flex items-center text-xs"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className={`${isCurrentUser(userId) ? "font-semibold text-blue-600" : "text-gray-700"}`}>
              {isCurrentUser(userId) ? "You" : `User ${index + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;
