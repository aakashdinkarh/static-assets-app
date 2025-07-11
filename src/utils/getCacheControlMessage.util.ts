export const getCacheControlMessage = (cacheControlHeaderValue: string) => {
  return `GitHub caches content for ${Math.floor(
    parseInt(cacheControlHeaderValue.split('=')[1]) / 60
  )} mins.`;
};
