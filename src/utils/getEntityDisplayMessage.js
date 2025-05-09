// Returns a display message for delete confirmation modal
export const getEntityDisplayMessage = (entity) => {
  if (!entity) return "this item";

  // Employee or Guest
  if (entity.fullName) return entity.fullName;

  // User
  if (entity.username) return entity.username;

  // Room
  if (entity.number) return `Room ${entity.number}`;

  // Privilege
  if (entity.module?.name && entity.role?.name) {
    return `${entity.module.name} privilege of ${entity.role.name}`;
  }

  // Inventory Item
  if (entity.itemName) return entity.itemName;

  // Packages & services and etc. (many entities using name)
  if (entity.name) return entity.name;

  // Fallback
  return "this item";
};
