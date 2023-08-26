export const signOut = (e) => {
  e.preventDefault();
  localStorage.clear()
  window.location.reload()
  window.location.href = "/login"
};

