import useDragAndDrop from "../components/useDragAndDrop";

jest.useFakeTimers();

describe("useDragAndDrop", () => {
  let ul: HTMLUListElement;
  let li: HTMLLIElement;

  beforeEach(() => {
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    ul = document.getElementById("todo-list") as HTMLUListElement;

    li = document.createElement("li");
    li.dataset.idx = "0";
    li.textContent = "Test";
    ul.appendChild(li);
  });

  it("ESC 키를 누르면 드래그가 취소된다", () => {
    const cancel = jest.fn();
    const dnd = useDragAndDrop(ul, jest.fn(), jest.fn(), cancel);
    dnd.attach(li);

    li.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    document.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(cancel).toHaveBeenCalled();
  });

  it("2초 후 renderPreview가 호출된다", () => {
    const preview = jest.fn();
    const li2 = document.createElement("li");
    li2.dataset.idx = "1";
    ul.appendChild(li2);

    const dnd = useDragAndDrop(ul, jest.fn(), preview, jest.fn());
    dnd.attach(li);

    li.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    document.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));

    Object.defineProperty(document, "elementFromPoint", {
      value: () => li2,
    });

    document.dispatchEvent(
      new MouseEvent("mousemove", { clientX: 0, clientY: 0 })
    );
    jest.advanceTimersByTime(2000);

    expect(preview).toHaveBeenCalled();
  });
});
