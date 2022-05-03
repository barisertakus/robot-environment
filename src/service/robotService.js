import api from "../helpers/api"

export const getLastStatus = () => {
  return api.get("robot");
}

export const sendScript = (scriptText) => {
  return api.post("robot", { scriptText });
}