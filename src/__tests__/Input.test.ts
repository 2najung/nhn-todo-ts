import Input from "../components/Input";

describe("Input 컴포넌트", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="todo-form">
        <input type="text" id="todo-input" />
      </form>
    `;
  });

  it("입력 후 submit 시 onSubmit이 호출된다", () => {
    const mockSubmit = jest.fn();
    Input(mockSubmit);

    const input = document.getElementById("todo-input") as HTMLInputElement;
    const form = document.getElementById("todo-form") as HTMLFormElement;

    input.value = "할 일 테스트";
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(mockSubmit).toHaveBeenCalledWith("할 일 테스트");
    expect(input.value).toBe("");
  });

  it("빈 입력값일 경우 onSubmit이 호출되지 않는다", () => {
    const mockSubmit = jest.fn();
    Input(mockSubmit);

    const input = document.getElementById("todo-input") as HTMLInputElement;
    const form = document.getElementById("todo-form") as HTMLFormElement;

    input.value = "   ";
    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
