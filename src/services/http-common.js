import axios from "axios";

export const http = axios.create({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user"),
  },
});
