export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role; // "admin" or "tenant"
  } catch {
    return null;
  }
};

export const isAdmin = () => getUserRole() === "admin";