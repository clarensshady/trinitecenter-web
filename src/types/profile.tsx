interface IFile {
  FileInfo: {
    file: FileList;
    valid: boolean;
    ImageInfo?: {
      singleFile: File;
      previewImage: string;
    };
  };
}

type IUpload = IFile["FileInfo"] | undefined;

export type { IFile, IUpload };
