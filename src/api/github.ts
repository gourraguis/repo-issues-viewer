import dayjs from "dayjs";
import { Octokit } from "@octokit/core";
import { RepoIssue } from "../types/repo-issue";
import { RepoDetails } from "../types/repo-details";

// We're not using an personal access token which will cause rate limiting, but exposing such tokens on the front is a security risk
const octokit = new Octokit();

export const loadGithubIssues = async ({ user, repo }: RepoDetails) => {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: user,
    repo,
  });

  const issues: RepoIssue[] = data.map((elem) => ({
    id: elem.id.toString(),
    title: elem.title,
    url: elem.html_url,
    number: elem.number,
    createdAt: dayjs(elem.created_at).toDate(),
    author: {
      name: elem.user?.login,
      url: elem.user?.html_url,
    },
  }));

  return issues;
};
