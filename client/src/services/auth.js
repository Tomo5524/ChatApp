// const API_URL = "http://localhost:5000/api";

function authHeader() {
  const user = getUser();
  if (user && user.token) {
    return `Bearer ${user.token}`;
  } else {
    return {};
  }
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

function getUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// export default { authHeader, logOut, getUser };
export { authHeader, logOut, getUser };
