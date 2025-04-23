// src/components/ClearCompleted.ts

export interface ClearCompletedComponent {
  element: HTMLButtonElement;
  render: (completedCount: number) => void;
}

const ClearCompleted = (onClear: () => void): ClearCompletedComponent => {
  const btn = document.createElement("button");
  btn.className = "clear-completed";
  btn.addEventListener("click", onClear);

  const render = (completedCount: number) => {
    btn.textContent = `Clear Completed (${completedCount})`;
  };

  return { element: btn, render };
};

export default ClearCompleted;
