import { ChevronLeft, ChevronRight } from "lucide-react";

// Shows every page when there are few, otherwise a window of 5 around the current page.
function getPageNumbers(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.min(Math.max(current - 2, 1), total - 4);
  return Array.from({ length: 5 }, (_, i) => start + i);
}

export default function Pagination({ pagination, onPageChange }) {
  const { page, limit, totalRecords, totalPages } = pagination;
  const from = totalRecords === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalRecords);

  return (
    <div className="pagination-bar">
      <span className="range">Showing {from}–{to} of {totalRecords} batches</span>

      <div className="pages">
        <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft size={14} />
        </button>

        {getPageNumbers(page, totalPages).map((n) => (
          <button
            key={n}
            type="button"
            className={n === page ? "current" : ""}
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        ))}

        <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Next page">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
