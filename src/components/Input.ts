const Input = (onAdd: (text: string) => void) => {
  const form = document.getElementById("todo-form") as HTMLFormElement;
  const input = document.getElementById("todo-input") as HTMLInputElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    onAdd(text);
    input.value = "";
  });
};

export default Input;
