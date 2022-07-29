import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import "./App.css";
import { RepoBreadcrumb } from "./components/RepoBreadcrumb/RepoBreadcrumb";
import { IssuesBoard } from "./components/IssuesBoard/IssuesBoard";
import { RepoSearchForm } from "./components/RepoSearchForm/RepoSearchForm";
import { RepoDetails } from "./types/repo-details";
import { RepoIssue } from "./types/repo-issue";

export interface RepoContextInterface {
  repoDetails: RepoDetails | null;
  repoIssues: RepoIssue[];
  updateRepo: (details: RepoDetails, issues: RepoIssue[]) => void;
}

export const RepoContext = createContext<RepoContextInterface>({
  repoDetails: null,
  repoIssues: [],
  updateRepo: () =>
    console.error("Repo context is being used outside of its provider"),
});

const App: FunctionComponent = () => {
  const [repoDetails, setRepoDetails] = useState<RepoDetails | null>(null);
  const [repoIssues, setRepoIssues] = useState<RepoIssue[]>([]);

  const updateRepo = useCallback(
    (details: RepoDetails, issues: RepoIssue[]) => {
      setRepoDetails(details);
      setRepoIssues(issues);
    },
    [setRepoDetails, setRepoIssues]
  );

  return (
    <RepoContext.Provider
      value={{
        repoDetails,
        repoIssues,
        updateRepo,
      }}
    >
      <div className="container app">
        <RepoSearchForm />
        <RepoBreadcrumb />
        <IssuesBoard />
      </div>
    </RepoContext.Provider>
  );
};

export default App;
