import { MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge.jsx";

const COLUMNS = ["Batch Code", "Course", "Centre", "Start Date", "Capacity", "Status", "Actions"];

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short", day: "2-digit", year: "numeric",
  });

export default function BatchTable({ batches, loading, error, onRetry }) {
  let body;

  if (loading) {
    body = <StateRow>Loading batches…</StateRow>;
  } else if (error) {
    body = (
      <StateRow>
        <span className="error-text">{error}</span>{" "}
        <button type="button" className="link-btn" onClick={onRetry}>Try again</button>
      </StateRow>
    );
  } else if (batches.length === 0) {
    body = <StateRow>No batches match your search or filters. Try clearing them.</StateRow>;
  } else {
    body = batches.map((b) => (
      <tr key={b.id}>
        <td className="code">{b.batch_code}</td>
        <td>{b.course_name}</td>
        <td>{b.centre_name}</td>
        <td>{formatDate(b.start_date)}</td>
        <td>{b.enrolled_students}/{b.total_capacity}</td>
        <td><StatusBadge status={b.status} /></td>
        <td>
          <button type="button" className="icon-btn plain" aria-label={`Actions for ${b.batch_code}`}>
            <MoreVertical size={16} />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{COLUMNS.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}

function StateRow({ children }) {
  return (
    <tr>
      <td colSpan={COLUMNS.length} className="state-row">{children}</td>
    </tr>
  );
}
