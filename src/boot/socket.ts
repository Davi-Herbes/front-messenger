import { boot } from "quasar/wrappers";
import { io } from "socket.io-client";

const socket = io(process.env.API_URL || "https://back-messenger-production-f792.up.railway.app/", {
  autoConnect: false,
  transports: ["websocket"],
});

export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
