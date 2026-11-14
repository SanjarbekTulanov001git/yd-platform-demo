import type { ReactNode } from "react";

export function FilterPanel({ children }: { children: ReactNode }) {
  return (
    <details className="filter-panel">
      <summary className="filter-panel-toggle">
        <span>Filtrlar</span>
        <span aria-hidden="true" className="filter-panel-chevron">
          ⌄
        </span>
      </summary>
      <div className="filter-panel-content">{children}</div>
    </details>
  );
}
