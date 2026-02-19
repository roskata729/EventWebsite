"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  target_url: string | null;
  is_read: boolean;
  created_at: string;
  metadata?: Record<string, unknown>;
};

type NotificationBellProps = {
  initialUnreadCount: number;
  labels: {
    ariaLabel: string;
    title: string;
    markAllAsRead: string;
    deleteAll: string;
    deleteOne: string;
    open: string;
    empty: string;
    statusTitle: string;
    statusMessagePrefix: string;
    requestLabels: {
      contact: string;
      quote: string;
    };
    statusLabels: Record<string, string>;
    dateLocale: string;
  };
};

type NotificationsResponse = {
  success: boolean;
  data?: {
    notifications: NotificationItem[];
    unreadCount: number;
  };
};

export function NotificationBell({ initialUnreadCount, labels }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isPending, startTransition] = useTransition();

  const badgeText = useMemo(() => {
    if (unreadCount <= 0) {
      return null;
    }

    return unreadCount > 9 ? "9+" : String(unreadCount);
  }, [unreadCount]);

  const toggleOpen = () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (!nextOpen) {
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/notifications", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as NotificationsResponse;
      if (!payload.success || !payload.data) {
        return;
      }

      setNotifications(payload.data.notifications);
      setUnreadCount(payload.data.unreadCount);
    });
  };

  const resolveNotificationText = (item: NotificationItem) => {
    const requestType = typeof item.metadata?.requestType === "string" ? item.metadata.requestType : null;
    const status = typeof item.metadata?.status === "string" ? item.metadata.status : null;

    if ((requestType === "contact" || requestType === "quote") && status) {
      const requestLabel = labels.requestLabels[requestType];
      const statusLabel = labels.statusLabels[status] ?? status.replace(/_/g, " ");
      return {
        title: `${labels.statusTitle} ${requestLabel}`,
        message: `${labels.statusMessagePrefix} ${statusLabel}.`,
      };
    }

    return {
      title: item.title,
      message: item.message,
    };
  };

  const markAllAsRead = () => {
    startTransition(async () => {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });

      if (!response.ok) {
        return;
      }

      setNotifications((prev) => prev.map((item) => ({ ...item, is_read: true })));
      setUnreadCount(0);
    });
  };

  const deleteAll = () => {
    startTransition(async () => {
      const response = await fetch("/api/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
      });

      if (!response.ok) {
        return;
      }

      setNotifications([]);
      setUnreadCount(0);
    });
  };

  const deleteOne = (id: string) => {
    const item = notifications.find((entry) => entry.id === id);

    startTransition(async () => {
      const response = await fetch("/api/notifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        return;
      }

      setNotifications((prev) => prev.filter((entry) => entry.id !== id));
      if (item && !item.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleOpen}
        className="relative rounded-full border border-brand-accent/30 p-2 text-brand-muted transition hover:border-brand-accent/60 hover:text-brand-accentSoft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accentSoft"
        aria-label={labels.ariaLabel}
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
          <path d="M9 17a3 3 0 0 0 6 0" />
        </svg>
        {badgeText ? (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-brand-accentSoft px-1.5 text-center text-[10px] font-semibold leading-5 text-brand-background">
            {badgeText}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-80 rounded-2xl border border-brand-accent/25 bg-brand-surface p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.12em] text-brand-muted">{labels.title}</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={markAllAsRead}
                disabled={isPending || unreadCount === 0}
                className="text-xs text-brand-accentSoft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {labels.markAllAsRead}
              </button>
              <button
                type="button"
                onClick={deleteAll}
                disabled={isPending || notifications.length === 0}
                className="text-xs text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {labels.deleteAll}
              </button>
            </div>
          </div>

          <ul className="max-h-80 space-y-2 overflow-y-auto">
            {notifications.map((item) => {
              const localized = resolveNotificationText(item);
              return (
              <li key={item.id} className={`rounded-xl border p-2 text-sm ${item.is_read ? "border-brand-accent/15" : "border-brand-accent/40 bg-brand-elevated/40"}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">{localized.title}</p>
                  <button
                    type="button"
                    onClick={() => deleteOne(item.id)}
                    disabled={isPending}
                    className="text-[11px] text-red-300 underline disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {labels.deleteOne}
                  </button>
                </div>
                <p className="mt-1 text-xs text-brand-muted">{localized.message}</p>
                <p className="mt-1 text-[11px] text-brand-muted">{new Date(item.created_at).toLocaleString(labels.dateLocale)}</p>
                {item.target_url ? (
                  <Link href={item.target_url} className="mt-1 inline-block text-xs text-brand-accentSoft underline">
                    {labels.open}
                  </Link>
                ) : null}
              </li>
            );})}
            {!isPending && notifications.length === 0 ? (
              <li className="rounded-xl border border-brand-accent/15 p-3 text-sm text-brand-muted">{labels.empty}</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
