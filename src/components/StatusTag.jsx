export default function StatusTag({ status }) {
  const statusClass =
    status === "Approved" ? "status-approved" : status === "Rejected" ? "status-rejected" : "status-pending";

  return <span className={`status-tag ${statusClass}`}>{status}</span>;
}
