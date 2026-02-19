"use client";

import { useMemo, useState, useTransition } from "react";

type RequestType = "contact" | "quote";

export type AdminRequestRow = {
  id: string;
  type: RequestType;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  subject: string | null;
  eventDate: string | null;
};

export type RequestsManagerLabels = {
  searchPlaceholder: string;
  allTypes: string;
  typeContact: string;
  typeQuote: string;
  allStatuses: string;
  result: string;
  results: string;
  tableType: string;
  tableName: string;
  tableEmail: string;
  tableSubjectEvent: string;
  tableCreated: string;
  tableStatus: string;
  dateLocale: string;
  statusLabels: Record<string, string>;
};

type RequestsManagerProps = {
  initialRows: AdminRequestRow[];
  labels: RequestsManagerLabels;
};

const statuses = ["new", "in_review", "approved", "scheduled", "done", "rejected"];

export function RequestsManager({ initialRows, labels }: RequestsManagerProps) {
  const [rows, setRows] = useState(initialRows);
  const [typeFilter, setTypeFilter] = useState<"all" | RequestType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | string>("all");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const typeMatch = typeFilter === "all" || row.type === typeFilter;
      const statusMatch = statusFilter === "all" || row.status === statusFilter;
      const normalizedQuery = query.trim().toLowerCase();
      const searchMatch =
        normalizedQuery.length === 0 ||
        row.name.toLowerCase().includes(normalizedQuery) ||
        row.email.toLowerCase().includes(normalizedQuery) ||
        (row.subject || "").toLowerCase().includes(normalizedQuery);

      return typeMatch && statusMatch && searchMatch;
    });
  }, [rows, statusFilter, typeFilter, query]);

  const updateStatus = (id: string, type: RequestType, nextStatus: string) => {
    const currentStatus = rows.find((row) => row.id === id && row.type === type)?.status ?? "new";
    setRows((previousRows) =>
      previousRows.map((row) => (row.id === id && row.type === type ? { ...row, status: nextStatus } : row)),
    );

    startTransition(async () => {
      const response = await fetch(`/api/admin/requests/${type}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        setRows((previousRows) =>
          previousRows.map((row) =>
            row.id === id && row.type === type ? { ...row, status: currentStatus } : row,
          ),
        );
      }
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="grid gap-3 rounded-2xl border border-brand-accent/20 bg-brand-surface/70 p-4 md:grid-cols-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className="rounded-xl border border-brand-accent/25 bg-brand-elevated px-3 py-2 text-sm"
        />
        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value as "all" | RequestType)}
          className="rounded-xl border border-brand-accent/25 bg-brand-elevated px-3 py-2 text-sm"
        >
          <option value="all">{labels.allTypes}</option>
          <option value="contact">{labels.typeContact}</option>
          <option value="quote">{labels.typeQuote}</option>
        </select>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-xl border border-brand-accent/25 bg-brand-elevated px-3 py-2 text-sm"
        >
          <option value="all">{labels.allStatuses}</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {labels.statusLabels[status] ?? status}
            </option>
          ))}
        </select>
        <div className="flex items-center justify-end text-sm text-brand-muted">
          {filteredRows.length} {filteredRows.length === 1 ? labels.result : labels.results}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-brand-accent/30">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-brand-surface">
            <tr>
              <th className="px-4 py-3">{labels.tableType}</th>
              <th className="px-4 py-3">{labels.tableName}</th>
              <th className="px-4 py-3">{labels.tableEmail}</th>
              <th className="px-4 py-3">{labels.tableSubjectEvent}</th>
              <th className="px-4 py-3">{labels.tableCreated}</th>
              <th className="px-4 py-3">{labels.tableStatus}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={`${row.type}-${row.id}`} className="border-t border-brand-accent/20">
                <td className="px-4 py-3 uppercase">{row.type}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3 text-brand-muted">{row.subject || row.eventDate || "-"}</td>
                <td className="px-4 py-3">{new Date(row.createdAt).toLocaleString(labels.dateLocale)}</td>
                <td className="px-4 py-3">
                  <select
                    value={row.status}
                    onChange={(event) => updateStatus(row.id, row.type, event.target.value)}
                    className="rounded-lg border border-brand-accent/25 bg-brand-elevated px-2 py-1"
                    disabled={isPending}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {labels.statusLabels[status] ?? status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

