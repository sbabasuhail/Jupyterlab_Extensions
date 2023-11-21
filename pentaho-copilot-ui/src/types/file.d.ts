interface FileListModel {
  fileList: HvFileData[];
  setFileList?: (val: Dispatch<SetStateAction<boolean>>) => void;
  loading?: boolean;
}

interface FileDeleteModel {
  filename: string;
}

interface FilesTabModel {
  username: string;
  selectedFiles: any[];
  setSelectedFiles: (val: Dispatch<SetStateAction<any[]>>) => void;
}
