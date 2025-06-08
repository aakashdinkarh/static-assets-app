export const getParentPathForCurrentPath = (path: string) => {
  try {
    const splitPath = path.split('/').slice(0, -1);

    if (splitPath.length === 0) {
      return '/';
    }

    return splitPath.join('/');
  } catch {
    return '/';
  }
};
