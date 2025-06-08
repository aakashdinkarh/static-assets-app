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

export const uploadGithubContent = async ({
  file,
  directory,
  filename,
  commitMessage,
}: {
  file: File;
  directory: string;
  filename: string;
  commitMessage: string;
}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('directory', directory);
  formData.append('filename', filename);
  formData.append('commit_message', commitMessage);

  const response = await fetch(UPLOAD_GITHUB_CONTENT.url, {
    method: UPLOAD_GITHUB_CONTENT.method,
    headers: getCommonHeaders(),
    body: formData,
  });

  if (!response.ok) throw new Error('Failed to upload content');
  const responseData = await response.json();
  return responseData.data;
};

export const updateGithubContent = async ({
  path,
  content,
  commitMessage,
  sha,
}: {
  path: string;
  content: string;
  commitMessage: string;
  sha: string;
}) => {
  const response = await fetch(UPDATE_GITHUB_CONTENT.url, {
    method: UPDATE_GITHUB_CONTENT.method,
    headers: getCommonHeaders(),
    body: JSON.stringify({
      path,
      content,
      commitMessage,
      sha,
    }),
  });

  if (!response.ok) throw new Error('Failed to update content');

  const responseData = await response.json();
  return responseData.data;
};

