export function currentUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return null;
  }

  return user;
}
