export const mbToBytes = (mb: number) => mb * 1024 * 1024;

export const bytesToMb = (bytes: number) => bytes / 1024 / 1024;

export const isAcceptedFile = (file: File, acceptedFiles: string[]) => {
  if (acceptedFiles.length === 0) {
    return true;
  }

  const accepted = acceptedFiles.some((ext) => {
    return file.type === ext || file.name.endsWith(ext);
  });

  return accepted;
};
