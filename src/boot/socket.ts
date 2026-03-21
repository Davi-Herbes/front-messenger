import { boot } from "quasar/wrappers";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false,
  transports: ["websocket"],
});

export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
