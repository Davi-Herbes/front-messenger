import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import z from "zod";
import { useUserStore } from "./user-store";

const SearchResponseSchema = z.array(
  z.object({ id: z.string(), name: z.string(), email: z.email() }),
);

type SearchResults = z.infer<typeof SearchResponseSchema>;

export const useSearchStore = defineStore("search", () => {
  const searchResults = ref<SearchResults>([]);
  const $q = useQuasar();

  const searchQuery = async (query: string) => {
    const usersStore = useUserStore();
    $q.loading.show();
    try {
      const { status, data } = await api.get(`/user/search/${query}`);

      if (status !== 200) {
        throw new Error("Status não correspondente");
      }

      const parsed = SearchResponseSchema.parse(data);

      searchResults.value = parsed;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          $q.notify({
            color: "red",
            message: "Sua sessão expirou.",
          });

          $q.loading.hide();
          await usersStore.logout();
          return;
        }
      }

      $q.notify({
        color: "red",
        message: "Algo deu errado ao pesquisar por usuário.",
      });
    }
    $q.loading.hide();
  };

  return { searchResults, searchQuery };
});
