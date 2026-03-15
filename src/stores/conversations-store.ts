import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Ref, ref } from "vue";
import z from "zod";

const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  senderId: z.string(),
});

const MessagesSchema = z.array(MessageSchema);

const ConversationSchema = z.object({
  id: z.string(),
  participants: z.array(
    z.object({ participant: z.object({ name: z.string(), email: z.string() }) }),
  ),
  messages: z.array(MessageSchema),
});

const ConversationsSchema = z.array(ConversationSchema);

type Conversation = z.infer<typeof ConversationSchema>;

export const useConversationsStore = defineStore("conversations", () => {
  const conversations = ref<Conversation[]>([]);

  const loadConversations = async (userId: string) => {
    try {
      const { data } = await api.get(`/conversations/${userId}`);

      conversations.value = ConversationsSchema.parse(data);

      return true;
    } catch (e) {
      return false;
    }
  };

  const loadMessages = async (conversation: Conversation) => {
    try {
      const { data } = await api.get(`/messages/${conversation.id}`);

      conversation.messages = MessagesSchema.parse(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  return { conversations, loadConversations, loadMessages };
});
