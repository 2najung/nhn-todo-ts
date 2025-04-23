import { Todo, ReorderHandler } from "../types";
import useDragAndDrop from "./useDragAndDrop";

export interface ListComponent {
  element: HTMLUListElement;
  render: (todos: Todo[]) => void;
}

const List = (
  onToggle: (id: number) => void,
  onDelete: (id: number) => void,
  onReorder?: ReorderHandler,
  renderPreview?: (srcIdx: number, targetIdx: number) => void,
  cancelPreview?: () => void
): ListComponent => {
  const listEl = document.getElementById("todo-list") as HTMLUListElement;
  const dnd =
    onReorder && renderPreview && cancelPreview
      ? useDragAndDrop(listEl, onReorder, renderPreview, cancelPreview)
      : null;

  const render = (todos: Todo[]) => {
    listEl.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = todo.completed ? "completed" : "";
      li.dataset.idx = index.toString();
      li.dataset.id = todo.id.toString();

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => onToggle(todo.id));

      const span = document.createElement("span");
      span.textContent = todo.text;
      span.className = todo.completed ? "completed" : "";
      span.addEventListener("click", () => onToggle(todo.id));

      const btn = document.createElement("button");
      btn.textContent = "삭제";
      btn.addEventListener("click", () => onDelete(todo.id));

      li.append(checkbox, span, btn);
      if (!todo.completed && dnd) {
        dnd.attach(li);
      }

      listEl.appendChild(li);
    });
  };

  return { element: listEl, render };
};

export default List;
