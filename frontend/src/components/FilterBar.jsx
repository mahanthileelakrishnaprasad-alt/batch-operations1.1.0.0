import { Search, SlidersHorizontal } from "lucide-react";

const STATUS_OPTIONS = ["Running", "Upcoming", "Completed"];

export default function FilterBar({
  search, onSearchChange,
  status, onStatusChange,
  centre, onCentreChange, centres,
  onReset,
}) {
  return (
    <div className="filter-bar">
      <label className="search-box">
        <Search size={16} />
        <input
          type="text"
          value={search}
          placeholder="Search by Batch Code or Course"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <select value={status} onChange={(e) => onStatusChange(e.target.value)} aria-label="Filter by status">
        <option value="">All Status</option>
        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      <select value={centre} onChange={(e) => onCentreChange(e.target.value)} aria-label="Filter by centre">
        <option value="">All Centres</option>
        {centres.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <button type="button" className="icon-btn" onClick={onReset} title="Clear search and filters" aria-label="Clear search and filters">
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
