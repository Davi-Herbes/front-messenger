import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Ref, ref } from "vue";
import z from "zod";
import { useUserStore } from "./user-store";
import { useQuasar } from "quasar";
import { socket } from "src/boot/socket";

const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.coerce.date(),
  sender: z.object({
    email: z.email(),
  }),
});

const ConversationSchema = z.object({
  id: z.string(),
  messages: z.array(MessageSchema),
  participants: z.array(
    z.object({
      participant: z.object({
        name: z.string(),
        email: z.email(),
      }),
    }),
  ),
});

const ConversationsSchema = z.array(ConversationSchema);

export type Conversation = z.infer<typeof ConversationSchema>;

export const useConversationsStore = defineStore("conversations", () => {
  const $q = useQuasar();
  const conversations = ref<Conversation[]>([]);
  const currentConversation = ref<Conversation | null>();

  const loadConversations = async (userId: string) => {
    try {
      const { data } = await api.get(`/conversations/${userId}`);

      const parsed = ConversationsSchema.parse(data);
      currentConversation.value = null;
      conversations.value = parsed;

      return true;
    } catch (e) {
      return false;
    }
  };

  const addUser = async (firstUserId: string, secondUserId: string) => {
    try {
      const response = await api.post(`/conversations/addUser`, { firstUserId, secondUserId });

      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        return { status: e.status };
      }
      return { status: 400 };
    }
  };

  const changeCurrentConversation = async (conversation: Conversation) => {
    try {
      const response = await api.get(`/messages/${conversation.id}`);
      const parsed = z.array(MessageSchema).parse(response.data);
      conversation.messages = parsed;

      currentConversation.value = conversation;
      socket.emit("join_chat", currentConversation.value.id);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (text: string, conversationId: string) => {
    const userStore = useUserStore();
    try {
      await api.post("/messages", { text, conversationId });

      return true;
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        if (e.status === 401) {
          $q.notify({
            message: "Sua sessão expirou",
            color: "red",
          });

          await userStore.logout();
          return false;
        }
      }

      $q.notify({
        message: "Algo deu errado ao enviar a mensagem",
        color: "red",
      });
      return false;
    }
  };

  return {
    conversations,
    currentConversation,
    loadConversations,
    addUser,
    sendMessage,
    changeCurrentConversation,
  };
});
