import { FilterState } from "../types";

export interface FilterComponent {
  element: HTMLDivElement;
  render: (current: FilterState) => void;
}

const filter = (onChange: (state: FilterState) => void): FilterComponent => {
  const container = document.createElement("div");
  container.className = "filters";

  const states: FilterState[] = ["all", "active", "completed"];
  const buttons: Record<FilterState, HTMLButtonElement> = {
    all: document.createElement("button"),
    active: document.createElement("button"),
    completed: document.createElement("button"),
  };

  states.forEach((state) => {
    const btn = buttons[state];
    btn.textContent =
      state === "all" ? "All" : state === "active" ? "Active" : "Completed";
    btn.addEventListener("click", () => onChange(state));
    container.appendChild(btn);
  });

  const render = (current: FilterState) => {
    states.forEach((state) => {
      buttons[state].classList.toggle("on", state === current);
    });
  };

  render("all");

  return { element: container, render };
};

export default filter;
