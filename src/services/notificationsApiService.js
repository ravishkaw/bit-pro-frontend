import axiosInstance from "./axiosInstance";

export const fetchUserNotifications = async (userId) => {
  try {
    const response = await axiosInstance.get(`/notifications/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const markNotificationAsRead = async (notificationId, userId) => {
  try {
    await axiosInstance.put(`/notifications/${notificationId}/read`, {
      userId,
    });
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

export const markAllNotificationsAsRead = async (userId) => {
  try {
    await axiosInstance.put(`/notifications/mark-all-read`, {
      userId,
    });
    return true;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return false;
  }
};

export const getUnreadNotificationCount = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/notifications/user/${userId}/unread-count`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching unread notification count:", error);
    return 0;
  }
};

export const markNotificationAsResolved = async (notificationId) => {
  try {
    await axiosInstance.put(`/notifications/${notificationId}/resolve`);
    return true;
  } catch (error) {
    console.error("Error marking notification as resolved:", error);
    return false;
  }
};
