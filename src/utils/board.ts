import { DropResult } from "react-beautiful-dnd";
import { kanbanColumns } from "../consts/columns";
import { KanbanBoard } from "../types/kanban-board";
import { KanbanIssue } from "../types/kanban-issue";
import { RepoDetails } from "../types/repo-details";
import { RepoIssue } from "../types/repo-issue";
import { loadIssues } from "./issues-storage";

// store each issue with its column on a hashmap
// have columns const and make a helper to filter issues for each column?

const initIssues = (savedIssues: KanbanIssue[], fetchedIssues: RepoIssue[]) => {
  const savedIssuesHash: Record<string, boolean> = {};
  savedIssues.forEach(({ id }) => {
    savedIssuesHash[id] = true;
  });

  const savedBacklogIssues = savedIssues.filter(
    ({ columnId }) => columnId === "backlog"
  ).length;
  const newIssues = fetchedIssues
    .filter(({ id }) => !savedIssuesHash[id])
    .map(({ id }, index) => ({
      id: id,
      index: savedBacklogIssues + index,
      columnId: "backlog",
    }));

  return [...savedIssues, ...newIssues];
};

export const initBoard = (
  details: RepoDetails,
  issues: RepoIssue[]
): KanbanBoard => {
  const savedIssues = loadIssues(details);
  console.log("lala", savedIssues);
  const board: KanbanBoard = {
    columns: kanbanColumns,
    issues: initIssues(savedIssues, issues),
  };

  return board;
};

export const updateBoard = (
  board: KanbanBoard,
  dropResult: DropResult
): KanbanBoard => {
  const { destination, source, draggableId } = dropResult;

  if (!destination) {
    return board;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return board;
  }

  const movedIssue = board.issues.find(({ id }) => id === draggableId)!;
  const updatedIssues = board.issues.map((issue) => {
    if (movedIssue.id === issue.id) {
      return {
        ...issue,
        columnId: destination.droppableId,
        index: destination.index,
      };
    }

    let newIndex = issue.index;
    if (issue.columnId === source.droppableId && issue.index > source.index) {
      newIndex -= 1;
    }
    if (
      issue.columnId === destination.droppableId &&
      destination.index <= issue.index
    ) {
      newIndex += 1;
    }
    if (
      issue.columnId === destination.droppableId &&
      destination.index === issue.index &&
      destination.index > source.index &&
      source.droppableId === destination.droppableId
    ) {
      newIndex -= 1;
    }
    return {
      ...issue,
      index: newIndex,
    };
  });

  console.log(
    JSON.stringify(
      {
        old: board.issues,
        new: updatedIssues,
        drop: dropResult,
      },
      null,
      2
    )
  );

  return {
    ...board,
    issues: updatedIssues,
  };
};
