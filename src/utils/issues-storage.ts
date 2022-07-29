import { KanbanIssue } from "../types/kanban-issue";
import { RepoDetails } from "../types/repo-details";

export const saveIssues = (details: RepoDetails, issues: KanbanIssue[]) => {
  const key = `${details.user}/${details.repo}`;

  localStorage.setItem(key, JSON.stringify(issues));
};

export const loadIssues = (details: RepoDetails): KanbanIssue[] => {
  const key = `${details.user}/${details.repo}`;
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : [];
};
