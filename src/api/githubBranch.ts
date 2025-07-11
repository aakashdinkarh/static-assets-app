import { GET_GITHUB_BRANCH } from 'constants/api.constant';
import { checkError } from 'utils/apiHandlers.util';

type BranchResponse = {
  data: {
    branch: string;
  };
};

export const getBranch = async (): Promise<string | null> => {
  try {
    const response = await fetch(GET_GITHUB_BRANCH.url, {
      method: GET_GITHUB_BRANCH.method,
    });

    await checkError(response);
    const data: BranchResponse = await response.json();
    return data.data.branch;
  } catch (error) {
    console.error(error);
    return null;
  }
};
