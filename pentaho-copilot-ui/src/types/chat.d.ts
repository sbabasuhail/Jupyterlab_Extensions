interface ChatModel {
  id?: string;
  name: string;
  message?: any;
  fileList?: HvFileData[];
  filename?: HvFileData[];
  type: string;
  time?: string;
  sessionId?: string;
  sources?: string[];
}

interface ChatRequestModel {
  message?: any;
  filename?: HvFileData[];
}

interface ChatFormData {
  message: string;
}

interface ChatHistoryData {
  sessionId: string;
}

interface ChatFormModel {
  chatList: ChatModel[];
  setChatList: (val: Dispatch<SetStateAction<never[]>>) => void;
  setLoading: (val: Dispatch<SetStateAction<boolean>>) => void;
  selectedSentinel: any;
  username: string;
  sessionId: string;
  setSessionId: (val: Dispatch<SetStateAction<string>>) => void;
  selectedFiles: any[];
}

interface ChatAreaModel {
  chatList: ChatModel[];
  setChatList: (val: Dispatch<SetStateAction<never[]>>) => void;
  loading: boolean;
  setLoading: (val: Dispatch<SetStateAction<boolean>>) => void;
  sessionId?: string;
  username: string;
  companion: HvListValue;
}

interface SessionsModel {
  setTabId: (val: Dispatch<SetStateAction<number>>) => void;
  username: string;
  companion: HvListValue;
  sessionId: string;
  setSessionId: (val: Dispatch<SetStateAction<string>>) => void;
}
