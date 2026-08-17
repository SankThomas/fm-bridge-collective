import { useEffect } from "react";

export function useFocusTrap(isOpen, containerRef, toggleRef, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const getFocusables = () => {
      const container = containerRef.current;

      if (!container) return [];

      return Array.from(
        containier.querySelectorAll(
          "a, button, [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;
      const focusables = [toggleRef.current, ...getFocusables()].filter(
        Boolean,
      );
      const activeIndex = focusables.indexOf(document.activeElement);

      if ((activeIndex = -1)) return;
      if (e.shiftKey && activeIndex === 0) {
        e.preventDefault();
        focusables[focusables.length - 1].focus(0);
      } else if (!e.shiftKey && activeIndex === focusables.length - 1) {
        e.preventDefault();
        focusables[0].focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, containerRef, toggleRef, onClose]);
}
