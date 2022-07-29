import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { KanbanColumn } from "../../../types/kanban-column";
import { IssuesContext } from "../IssuesBoard";
import { IssueCard } from "./IssueCard/IssueCard";

// We're looping through the columns on IssuesBoard, I don't think there is a way to replace passing a prop with using context here
export interface IssuesColumnProps {
  column: KanbanColumn;
}

export const IssuesColumn: FunctionComponent<IssuesColumnProps> = ({
  column,
}) => {
  const [enabled, setEnabled] = useState(false);

  /*
    this useEffect is a fix for using react-beautiful-dnd with react 18
    https://github.com/atlassian/react-beautiful-dnd/issues/2399
  */
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const kanbanIssues = useContext(IssuesContext);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <h2 className="mb-4">{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="h-100"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {kanbanIssues
              .filter(({ columnId }) => columnId === column.id)
              .sort((a, b) => a.index - b.index)
              .map((issue) => (
                <IssueCard
                  key={issue.id}
                  issueId={issue.id}
                  index={issue.index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};
