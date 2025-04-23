export interface StatsComponent {
  element: HTMLSpanElement;
  render: (count: number) => void;
}

const Stats = (): StatsComponent => {
  const el = document.createElement("span");
  el.className = "summary";

  const render = (count: number) => {
    el.textContent = `${count} items left`;
  };

  return { element: el, render };
};

export default Stats;
