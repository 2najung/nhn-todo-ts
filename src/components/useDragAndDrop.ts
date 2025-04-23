const useDragAndDrop = (
  listEl: HTMLUListElement,
  onReorder: (srcIdx: number, targetIdx: number) => void,
  renderPreview: (srcIdx: number, targetIdx: number) => void,
  cancelPreview: () => void
) => {
  let draggingEl: HTMLLIElement | null = null;
  let mirrorEl: HTMLLIElement | null = null;
  let hoverTimer: ReturnType<typeof setTimeout> | null = null;
  let activeTarget: HTMLLIElement | null = null;
  let draggingIdx: number | null = null;
  let currentTargetIdx: number | null = null;
  let previewing = false;

  const clearGuide = () => {
    if (activeTarget) {
      activeTarget.style.borderLeft = "";
      activeTarget.classList.remove("preview");
      activeTarget.style.boxShadow = "";
    }
    if (hoverTimer) clearTimeout(hoverTimer);
    activeTarget = null;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!draggingEl || !mirrorEl || draggingIdx === null) return;

    mirrorEl.style.top = `${e.clientY + 5}px`;
    mirrorEl.style.left = `${e.clientX + 5}px`;

    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    const li = targetEl instanceof HTMLElement ? targetEl.closest("li") : null;
    if (!li || li === draggingEl || li.classList.contains("completed")) {
      clearGuide();
      return;
    }

    const targetIdx = Number(li.dataset.idx);
    if (hoverTimer) clearTimeout(hoverTimer);

    if (!activeTarget || activeTarget !== li) {
      clearGuide();
      activeTarget = li;
      activeTarget.style.borderLeft = "4px solid limegreen";
      currentTargetIdx = targetIdx;
    }

    hoverTimer = setTimeout(() => {
      if (draggingIdx !== null && currentTargetIdx !== null) {
        previewing = true;
        renderPreview(draggingIdx, currentTargetIdx);
      }
    }, 2000);
  };

  const onMouseUp = (e: MouseEvent) => {
    const overEl = document.elementFromPoint(e.clientX, e.clientY);
    if (
      !overEl ||
      !(overEl instanceof HTMLElement) ||
      !listEl.contains(overEl)
    ) {
      cancelPreview();
      cleanupDrag();
      return;
    }

    if (
      draggingIdx !== null &&
      currentTargetIdx !== null &&
      draggingIdx !== currentTargetIdx
    ) {
      onReorder(draggingIdx, currentTargetIdx);
      console.log("todo 드래그앤드롭");
    }

    cleanupDrag();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      cancelPreview();
      cleanupDrag();
    }
  };

  const cleanupDrag = () => {
    if (draggingEl) {
      draggingEl.classList.remove("dragging");
      draggingEl.style.opacity = "1";
    }
    if (mirrorEl && mirrorEl.parentNode) {
      mirrorEl.parentNode.removeChild(mirrorEl);
    }
    clearGuide();
    cancelPreview();
    draggingEl = null;
    mirrorEl = null;
    draggingIdx = null;
    currentTargetIdx = null;
    previewing = false;

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("keydown", onKeyDown);
  };

  const attach = (li: HTMLLIElement) => {
    li.addEventListener("mousedown", (e) => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      let moved = false;

      const startDrag = () => {
        draggingEl = li;
        draggingIdx = Number(li.dataset.idx);

        li.classList.add("dragging");
        li.style.opacity = "0.5";

        mirrorEl = li.cloneNode(true) as HTMLLIElement;
        mirrorEl.classList.add("mirror");
        mirrorEl.style.position = "fixed";
        mirrorEl.style.pointerEvents = "none";
        mirrorEl.style.zIndex = "1000";
        mirrorEl.style.opacity = "0.7";
        const { width, height } = getComputedStyle(li);
        mirrorEl.style.width = width;
        mirrorEl.style.height = height;
        document.body.appendChild(mirrorEl);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("keydown", onKeyDown);
      };

      const onMove = () => {
        if (!moved) {
          moved = true;
          startDrag();
        }
        document.removeEventListener("mousemove", onMove);
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp, { once: true });
      e.preventDefault();
    });
  };

  return { attach };
};

export default useDragAndDrop;
