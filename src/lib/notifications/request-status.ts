type RequestType = "contact" | "quote";

const statusLabels: Record<string, string> = {
  new: "New",
  in_review: "In review",
  approved: "Approved",
  scheduled: "Scheduled",
  done: "Done",
  rejected: "Rejected",
};

function formatStatusLabel(status: string) {
  return statusLabels[status] ?? status.replace(/_/g, " ");
}

function formatRequestLabel(type: RequestType) {
  return type === "quote" ? "quote request" : "contact request";
}

export function buildStatusNotificationContent(type: RequestType, status: string) {
  const statusLabel = formatStatusLabel(status);
  const requestLabel = formatRequestLabel(type);
  const title = `Update for your ${requestLabel}`;
  const message = `Status changed to: ${statusLabel}.`;

  return {
    title,
    message,
  };
}
