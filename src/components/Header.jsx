import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap.js";

const NAV_LINKS = [
  { label: "Our impact", href: "#impact" },
  { label: "Our approach", href: "#approach" },
  { label: "Stories", href: "#stories" },
  { label: "Support us", href: "#support" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const firstLinkRef = useRef(null);

  useFocusTrap(isOpen, panelRef, toggleRef, () => setIsOpen(false));

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    if (isOpen) {
      firstLinkRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bridge Collective home">
          <span className="brand-mark" aria-hidden="true"></span>
          <span>Bridge Collective</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          ref={toggleRef}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="menu-label">Menu</span>
          <span className="menu-icon" aria-hidden="true">
            <i></i>
            <i></i>
          </span>
        </button>
      </header>

      <div
        className="menu-panel"
        id="site-menu"
        aria-hidden={!isOpen}
        ref={panelRef}
      >
        <nav className="menu-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={() => setIsOpen(false)}
            >
              {link.label} <span>↗</span>
            </a>
          ))}
        </nav>
        <p className="menu-note">
          Building brighter futures, one classroom at a time.
        </p>
      </div>
    </>
  );
}
