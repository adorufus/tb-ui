export function setCurrentUser(user) {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
}

export function getCurrentUser() {
  let user = null;
  try {
    user =
      localStorage.getItem("currentUser") != null
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null;
  } catch (error) {
    console.log(">>>>: src/helpers/Utils.js  : getCurrentUser -> error", error);
    user = null;
  }

  return user
}
