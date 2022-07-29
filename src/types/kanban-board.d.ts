import { KanbanColumn } from "./kanban-column";
import { KanbanIssue } from "./kanban-issue";

export interface KanbanBoard {
  columns: KanbanColumn[];
  issues: KanbanIssue[];
}
