import { defineStore } from "pinia";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";
import z from "zod";

const SearchResponseSchema = z.array(
  z.object({ id: z.string(), name: z.string(), email: z.email() }),
);

type SearchResults = z.infer<typeof SearchResponseSchema>;

export const useSearchStore = defineStore("search", () => {
  const searchResults = ref<SearchResults>([]);
  const $q = useQuasar();

  const searchQuery = async (query: string) => {
    $q.loading.show();
    try {
      const { status, data } = await api.get(`/user/search/${query}`);

      if (status !== 200) {
        throw new Error("Status não correspondente");
      }

      const parsed = SearchResponseSchema.parse(data);

      searchResults.value = parsed;
    } catch (e) {
      $q.notify({
        color: "red",
        message: "Algo deu errado ao pesquisar por usuário.",
      });
      console.log(e);
    }
    $q.loading.hide();
  };

  return { searchResults, searchQuery };
});
