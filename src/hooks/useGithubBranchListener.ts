import { useEffect } from 'react';
import { useRepoBrowserStore } from 'store/RepoBrowserStore';
import { getBranch } from 'api/githubBranch';

export const useGithubBranchListener = () => {
  const { branch, setBranch } = useRepoBrowserStore();

  useEffect(() => {
    if (branch) return;
    getBranch().then(setBranch);
  }, [branch, setBranch]);
};
