import {
  DELETE_GITHUB_CONTENT,
  GET_GITHUB_CONTENT,
  UPDATE_GITHUB_CONTENT,
  UPLOAD_GITHUB_CONTENT,
} from 'constants/api.constant';
import { getCommonHeaders } from 'utils/commonHeaders.util';

export const getGithubContent = async (path: string) => {
  const url = `${GET_GITHUB_CONTENT.url}?path=${path}`;
  const response = await fetch(url, {
    headers: getCommonHeaders(),
  });

  if (!response.ok) throw new Error('Failed to fetch repository contents');
  const responseData = await response.json();

  const data = responseData.data.data;
  const items = Array.isArray(data) ? data : [data];

  return items;
};

