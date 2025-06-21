export const checkError = async (response: Response) => {
  if (response.ok) return;

  if (response.status === 401) {
    throw new Error('User not logged in or session expired');
  }

  const error = await response.json();
  throw new Error(error.error || 'Failed to fetch repository contents');
};
