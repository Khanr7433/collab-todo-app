// Utility functions for conflict resolution

/**
 * Check if there are any conflicts between two task versions
 * @param {Object} clientTask - The task version from the client
 * @param {Object} serverTask - The task version from the server
 * @returns {Array} Array of conflict objects
 */
export const detectConflicts = (clientTask, serverTask) => {
  const conflicts = [];

  const fieldsToCheck = ["title", "description", "status", "priority"];

  fieldsToCheck.forEach((field) => {
    if (clientTask[field] !== serverTask[field]) {
      conflicts.push({
        field,
        clientValue: clientTask[field],
        serverValue: serverTask[field],
      });
    }
  });

  return conflicts;
};

/**
 * Merge two task versions intelligently
 * @param {Object} clientTask - The task version from the client
 * @param {Object} serverTask - The task version from the server
 * @param {Object} mergeStrategy - Strategy for merging conflicts
 * @returns {Object} Merged task object
 */
export const mergeTask = (clientTask, serverTask, mergeStrategy = {}) => {
  const defaultStrategy = {
    title: "client", // Prefer client's title changes
    description: "server", // Prefer server's description changes
    status: "server", // Prefer server's status changes (likely from drag & drop)
    priority: "client", // Prefer client's priority changes
  };

  const strategy = { ...defaultStrategy, ...mergeStrategy };
  const merged = { ...serverTask }; // Start with server version

  Object.keys(strategy).forEach((field) => {
    if (strategy[field] === "client") {
      merged[field] = clientTask[field];
    }
    // If strategy[field] === 'server', we keep the server version (already set)
  });

  return merged;
};

/**
 * Format a timestamp for display
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} Formatted timestamp
 */
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

/**
 * Get a human-readable description of changes
 * @param {Object} oldTask - Previous version of the task
 * @param {Object} newTask - New version of the task
 * @returns {Array} Array of change descriptions
 */
export const getChangeDescription = (oldTask, newTask) => {
  const changes = [];

  if (oldTask.title !== newTask.title) {
    changes.push(`Title changed from "${oldTask.title}" to "${newTask.title}"`);
  }

  if (oldTask.description !== newTask.description) {
    changes.push(`Description updated`);
  }

  if (oldTask.status !== newTask.status) {
    changes.push(
      `Status changed from "${oldTask.status}" to "${newTask.status}"`
    );
  }

  if (oldTask.priority !== newTask.priority) {
    changes.push(
      `Priority changed from "${oldTask.priority}" to "${newTask.priority}"`
    );
  }

  return changes;
};
