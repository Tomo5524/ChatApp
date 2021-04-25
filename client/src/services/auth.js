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
  // caused an error that brings user back to sign-up component
  // window.location.reload();
}

const getUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

// export default { authHeader, logOut, getUser };
export { authHeader, logOut, getUser };
