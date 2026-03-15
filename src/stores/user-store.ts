import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    isLoggedIn: false,
  }),

  actions: {
    async registerUser(name: string, email: string): Promise<boolean> {
      try {
        const { status } = await api.post("/user", {
          name,
          email,
        });

        return status === 200;
      } catch (e) {
        return false;
      }
    },

    async confirmRegistration(
      name: string,
      email: string,
      code: string,
      password: string,
    ): Promise<boolean> {
      try {
        const { status } = await api.post("/user/confirm", { code, password });

        if (status !== 200) {
          return false;
        }

        this.name = name;
        this.email = email;
        this.isLoggedIn = true;

        return true;
      } catch (e) {
        return false;
      }
    },

    async login(email: string, password: string): Promise<boolean> {
      try {
        const { status, data } = await api.post("/auth/login", { email, password });

        if (typeof data.name !== "string" || !data.name || status !== 200) {
          return false;
        }

        this.name = data.name;
        this.email = email;
        this.isLoggedIn = true;

        return true;
      } catch (e) {
        return false;
      }
    },

    async logout(): Promise<boolean> {
      const { status } = await api.get("/auth/logout");

      this.isLoggedIn = false;
      return status === 200;
    },
  },
});
