export const validatorsForTextContentFiles = {
  json: JSON.parse,
};

export const getValidatorForTextContentFile = (filename: string) => {
  if (!isTextContentFile(filename)) return;

  return validatorsForTextContentFiles[
    filename.split('.').pop() as keyof typeof validatorsForTextContentFiles
  ];
};

export const isImageFile = (filename: string): boolean =>
  /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(filename);

export const isPdfFile = (filename: string): boolean => /\.(pdf)$/i.test(filename);

export const isTextContentFile = (filename: string): boolean =>
  filename === 'LICENSE' ||
  /\.(txt|md|json|html|css|js|jsx|ts|tsx|yaml|yml|xml|csv|log)$/i.test(filename);
