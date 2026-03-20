import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

const router = useRouter();

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    isLoggedIn: false,
  }),
  persist: true,

  actions: {
    clearState() {
      this.id = "";
      this.name = "";
      this.email = "";
      this.isLoggedIn = false;
    },

    async registerUser(name: string, email: string): Promise<boolean> {
      try {
        const { status } = await api.post("/user", {
          name,
          email,
        });

        return status === 200;
      } catch (e) {
        this.clearState();
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
        const {
          status,
          data: { userId },
        } = await api.post("/user/confirm", { code, password });

        if (status !== 200 || !userId || typeof userId !== "string") {
          this.clearState();
          return false;
        }

        this.id = userId;
        this.name = name;
        this.email = email;
        this.isLoggedIn = true;

        return true;
      } catch (e) {
        this.clearState();
        return false;
      }
    },

    async login(email: string, password: string): Promise<boolean> {
      try {
        const {
          status,
          data: { user },
        } = await api.post("/auth/login", { email, password });

        if (
          status !== 200 ||
          typeof user.name !== "string" ||
          !user.name ||
          !user.id ||
          typeof user.id !== "string"
        ) {
          return false;
        }

        this.id = user.id;
        this.name = user.name;
        this.email = email;
        this.isLoggedIn = true;

        return true;
      } catch (e) {
        console.log(e);
        this.clearState();
        return false;
      }
    },

    async logout(): Promise<void> {
      const { status } = await api.get("/auth/logout");

      this.clearState();
      await router.push("login");
    },
  },
});
