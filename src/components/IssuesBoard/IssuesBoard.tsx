import {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { RepoContext } from "../../App";
import { KanbanBoard } from "../../types/kanban-board";
import { KanbanIssue } from "../../types/kanban-issue";
import { initBoard, updateBoard } from "../../utils/board";
import { saveIssues } from "../../utils/issues-storage";
import { IssuesColumn } from "./IssuesColumn/IssuesColumn";

export const IssuesContext = createContext<KanbanIssue[]>([]);

export const IssuesBoard: FunctionComponent = () => {
  const [board, setBoard] = useState<KanbanBoard | null>(null);
  const { repoDetails, repoIssues } = useContext(RepoContext);

  useEffect(() => {
    if (repoDetails) {
      setBoard(initBoard(repoDetails, repoIssues));
    }
  }, [repoDetails, repoIssues]);

  const handleDragEnd = (dropResult: DropResult) => {
    setBoard((board) => {
      const newBoard = updateBoard(board!, dropResult);
      saveIssues(repoDetails!, newBoard.issues);
      return newBoard;
    });
  };

  if (!board) {
    return null;
  }

  return (
    <IssuesContext.Provider value={board.issues}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row mt-5">
          {board.columns.map((column) => (
            <div className="col" key={column.id}>
              <IssuesColumn column={column} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </IssuesContext.Provider>
  );
};
