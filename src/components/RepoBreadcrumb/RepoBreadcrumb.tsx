import { FunctionComponent, useContext } from "react";
import { RepoContext } from "../../App";

export const RepoBreadcrumb: FunctionComponent = () => {
  const { repoDetails } = useContext(RepoContext);

  if (!repoDetails) {
    return null;
  }

  const { repo, user } = repoDetails;
  return (
    <nav>
      <ol className="breadcrumb mt-3">
        <li className="breadcrumb-item h3">
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noreferrer"
          >
            {user}
          </a>
        </li>
        <li className="breadcrumb-item h3">
          <a
            href={`https://github.com/${user}/${repo}`}
            target="_blank"
            rel="noreferrer"
          >
            {repo}
          </a>
        </li>
      </ol>
    </nav>
  );
};
