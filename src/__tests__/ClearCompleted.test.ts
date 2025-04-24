import ClearCompleted from "../components/ClearCompleted";

describe("ClearCompleted", () => {
  it("완료 항목 수가 0일 땐 버튼이 비활성화된다", () => {
    const comp = ClearCompleted(() => {});
    comp.render(0);

    expect(comp.element.disabled).toBe(true);
    expect(comp.element.textContent).toBe("Clear Completed (0)");
  });

  it("완료 항목 수가 2개일 땐 버튼이 활성화되고 텍스트가 표시된다", () => {
    const comp = ClearCompleted(() => {});
    comp.render(2);

    expect(comp.element.disabled).toBe(false);
    expect(comp.element.textContent).toBe("Clear Completed (2)");
  });
});
