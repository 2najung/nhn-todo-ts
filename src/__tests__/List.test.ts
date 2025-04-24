import List from "../components/List";
import { Todo } from "../types";

describe("List 컴포넌트", () => {
  let container: HTMLUListElement;

  beforeEach(() => {
    document.body.innerHTML = `<ul id="todo-list"></ul>`;
    container = document.getElementById("todo-list") as HTMLUListElement;
  });

  const sampleTodos: Todo[] = [
    { id: 1, text: "할 일 1", completed: false, createdAt: Date.now() },
    { id: 2, text: "할 일 2", completed: true, createdAt: Date.now() },
  ];

  it("할 일 목록을 렌더링한다", () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    const list = List(onToggle, onDelete);
    list.render(sampleTodos);

    expect(container.children.length).toBe(2);
    expect(container.querySelectorAll("input[type=checkbox]").length).toBe(2);
    expect(container.querySelector("li")?.textContent).toContain("할 일 1");
  });

  it("체크박스를 클릭하면 onToggle이 호출된다", () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    const list = List(onToggle, onDelete);
    list.render(sampleTodos);

    const checkbox = container.querySelector(
      "input[type=checkbox]"
    ) as HTMLInputElement;
    checkbox.click();

    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it("삭제 버튼을 클릭하면 onDelete가 호출된다", () => {
    const onToggle = jest.fn();
    const onDelete = jest.fn();

    const list = List(onToggle, onDelete);
    list.render(sampleTodos);

    const deleteBtn = container.querySelector("button") as HTMLButtonElement;
    deleteBtn.click();

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
