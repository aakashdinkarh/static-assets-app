type IClass = string | Record<string, boolean> | undefined;

export const mergeClasses = (...classes: IClass[]): string => {
  return classes
    .filter(Boolean)
    .map(item => {
      if (typeof item === 'string') {
        return item;
      }
      if (typeof item === 'object') {
        return Object.keys(item)
          .filter(key => item[key])
          .join(' ');
      }
      return '';
    })
    .join(' ');
};
