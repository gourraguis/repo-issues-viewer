import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FunctionComponent, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { RepoContext } from "../../../../App";
import "./IssueCard.css";

dayjs.extend(relativeTime);

// We're looping through the issues on IssuesColumn, I don't think there is a way to replace passing a prop with using context here
export interface IssuesCardProps {
  issueId: string;
  index: number;
}

export const IssueCard: FunctionComponent<IssuesCardProps> = ({
  issueId,
  index,
}) => {
  const { repoIssues } = useContext(RepoContext);
  const issue = repoIssues.find(({ id }) => id === issueId);

  if (!issue) {
    return null;
  }

  return (
    <Draggable key={issue.id} draggableId={issue.id} index={index}>
      {(provided) => (
        <div
          className="card issue-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="card-body">
            <h5 className="card-title">{issue.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <a
                className="muted-link"
                href={issue.url}
                target="_blank"
                rel="noreferrer"
              >{`#${issue.number}`}</a>{" "}
              <span>opened {dayjs(issue.createdAt).fromNow()}</span>
              {issue.author.name && (
                <>
                  {" "}
                  <span>by</span>{" "}
                  <a
                    className="muted-link"
                    href={issue.author.url}
                    target="_blank"
                    rel="noreferrer"
                  >{`${issue.author.name}`}</a>
                </>
              )}
            </h6>
          </div>
        </div>
      )}
    </Draggable>
  );
};
