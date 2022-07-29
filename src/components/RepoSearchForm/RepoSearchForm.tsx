import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { loadGithubIssues } from "../../api/github";
import { RepoContext } from "../../App";
import { extractGithubUrlDetails } from "../../utils/extract-github-url-details";

export const RepoSearchForm: FunctionComponent = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const { updateRepo } = useContext(RepoContext);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setRequestError(false);

    try {
      const details = extractGithubUrlDetails(repoUrl);
      const issues = await loadGithubIssues(details);
      updateRepo(details, issues);
    } catch {
      setRequestError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-10 form-group">
          <input
            className="form-control"
            value={repoUrl}
            onChange={handleChange}
            placeholder="Repo Url"
            required
          />
        </div>
        <button
          className="col btn btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Loading...
            </>
          ) : (
            <span>Load Issues</span>
          )}
        </button>
      </div>
      {requestError && (
        <small className="form-text text-danger">
          Failed to load repo issues, please double check the url.
        </small>
      )}
    </form>
  );
};
