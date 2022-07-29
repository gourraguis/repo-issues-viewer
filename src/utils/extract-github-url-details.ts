import { RepoDetails } from "../types/repo-details";

export const extractGithubUrlDetails = (address: string): RepoDetails => {
  const url = new URL(address);
  const parts = url.pathname.split("/");

  return {
    user: parts[1],
    repo: parts[2],
  };
};
