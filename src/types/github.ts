export interface GithubUploadResponse {
  success: boolean;
  message: string;
  url?: string;
  sha?: string;
}

export interface RepoItem {
  name: string;
  path: string;
  type: 'file' | 'dir';
  sha: string;
  size?: number;
  download_url?: string;
}

export interface CacheEntry {
  data: RepoItem[];
  timestamp: number;
}
