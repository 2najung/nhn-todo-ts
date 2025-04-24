import filter from "../components/Filter";

describe("Filter 컴포넌트", () => {
  let container: HTMLDivElement;
  let selected: string;
  const onFilterChange = (newFilter: string) => {
    selected = newFilter;
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    const { element, render } = filter(onFilterChange);
    container.appendChild(element);
    render("all");
  });

  afterEach(() => {
    document.body.innerHTML = "";
    selected = "";
  });

  it("초기 렌더링 시 '전체' 필터가 활성화되어야 함", () => {
    const buttons = container.querySelectorAll("button");
    expect(buttons[0].classList.contains("on")).toBe(true);
  });

  it("'활성' 버튼 클릭 시 onFilterChange가 'active'로 호출되어야 함", () => {
    const activeBtn = container.querySelectorAll("button")[1];
    activeBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(selected).toBe("active");
  });

  it("'완료됨' 버튼 클릭 시 onFilterChange가 'completed'로 호출되어야 함", () => {
    const completedBtn = container.querySelectorAll("button")[2];
    completedBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(selected).toBe("completed");
  });
});
