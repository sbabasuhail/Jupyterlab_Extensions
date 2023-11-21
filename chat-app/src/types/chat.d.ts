interface ChatModel {
  id: string;
  name: string;
  message?: string;
  type: string;
}

interface ChatFormData {
  message: string;
}
