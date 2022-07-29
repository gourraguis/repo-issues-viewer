export interface RepoIssue {
  id: string;
  title: string;
  url: string;
  number: number;
  createdAt: Date;
  author: {
    name?: string;
    url?: string;
  };
}
