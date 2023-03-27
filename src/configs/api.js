// const url = "http://192.168.0.188:3000";
const url = "http://localhost:3000";
const api_link = {
  login: url + "/auth/login",
  register: url + "/auth/register",
  user: url + "/auth/user",
  alluser: url + "/auth/alluser",
  brand: url + "/brand",
  supplier: url + "/supplier",
  voucher: url + "/voucher",
  codex: url + "/codex",
  segment: url + "/segment",
  roles: url + "/roles",
};

export default api_link;
