// Returns a display message for delete confirmation modal
export const getEntityDisplayMessage = (entity) => {
  if (!entity) return "this item";

  // Employee or Guest
  if (entity.fullName) return entity.fullName;

  // User
  if (entity.username) return entity.username;

  // Room
  if (entity.roomNumber) return `Room ${entity.roomNumber}`;

  // Privilege
  if (entity.moduleId?.name && entity.roleId?.name) {
    return `${entity.moduleId.name} privilege of ${entity.roleId.name}`;
  }

  // Fallback
  return "this item";
};
