export const AUTHORIZATION_COOKIE_NAME = 'Authorization';

export const setCookie = (name: string, value: string, ttl: number) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + ttl * 1000);
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
  } catch (error) {
    console.error(error);
  }
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};
