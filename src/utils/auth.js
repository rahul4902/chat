export const isLogin = () => {
  // Check if a user is logged in by looking for a token in local storage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo || !userInfo._token) return false;
  return true;
};

export const authUser = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo ? userInfo : null;
}
