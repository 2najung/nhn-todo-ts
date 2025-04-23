import "./styles.css";
import Input from "./components/Input";
import List from "./components/List";
import Stats from "./components/Stats";
import filter from "./components/Filter";
import ClearCompleted from "./components/ClearCompleted";
import { Todo, FilterState } from "./types";

let todos: Todo[] = [];
const stats = Stats();
let filterState: FilterState = "all";
const filterComp = filter((newState) => {
  filterState = newState;
  render();
});
const clearCompleted = ClearCompleted(() => {
  todos = todos.filter((t) => !t.completed);
  console.log("todo 완료항목 삭제");
  render();
});

const info = document.getElementById("todo-info")!;
info.appendChild(stats.element);
info.appendChild(filterComp.element);
info.appendChild(clearCompleted.element);

Input((text) => {
  todos.unshift({
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now(),
  });
  console.log("todo 등록");
  render();
});

const list = List(
  (id) => toggleTodo(id),
  (id) => deleteTodo(id)
);

const render = () => {
  const allActive = todos.filter((t) => !t.completed);
  const allCompleted = todos.filter((t) => t.completed);
  const completedCount = allCompleted.length;

  const filtered = [...allActive, ...allCompleted].filter((todo) => {
    if (filterState === "active") return !todo.completed;
    if (filterState === "completed") return todo.completed;
    return true;
  });

  list.render(filtered);

  const countToShow =
    filterState === "all"
      ? todos.length
      : filterState === "active"
      ? allActive.length
      : completedCount;

  stats.render(countToShow);
  filterComp.render(filterState);
  clearCompleted.render(completedCount);
};

function toggleTodo(id: number) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  todo.completed = !todo.completed;
  todo.completedAt = todo.completed ? Date.now() : undefined;
  console.log("todo 완료 토글");
  render();
}

const deleteTodo = (id: number) => {
  todos = todos.filter((t) => t.id !== id);
  console.log("todo 삭제");
  render();
};

render();
