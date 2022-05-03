import api from "../helpers/api";

const robotService = {
  getLastStatus: () => {
    return api.get("robot");
  },

  sendScript: (scriptText) => {
    return api.post("robot", { scriptText });
  },
};

export default robotService