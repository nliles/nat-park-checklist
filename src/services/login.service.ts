import axios from "axios";

export const login = () => {
  console.log("here");
  return axios.post("http://localhost:5000/login", { crossdomain: true });
};

export const register = () =>
  axios.post("http://localhost:5000/register", { crossdomain: true });
