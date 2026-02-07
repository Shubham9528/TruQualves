import React, { useMemo, useEffect, useState } from 'react';
import { ICONS } from '../constants';
import type { EventStatus } from '../types';
import ConfirmDialog from '../../components/confirm-dialog';
import { useEventManagement } from '../hooks/useEventManagement';

const STATUS_META: Record<EventStatus, { label: string; tone: string }> = {
  new_request: { label: 'New Request', tone: 'bg-amber-50 text-amber-700 border-amber-100' },
  active: { label: 'Active', tone: 'bg-teal-50 text-teal-700 border-teal-100' },
  completed: { label: 'Completed', tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  cancelled: { label: 'Cancelled', tone: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const EventsView: React.FC = () => {
  const { events, loading, error, actionLoading, fetchEvents, updateEventStatus } = useEventManagement();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState<EventStatus | null>(null);

  const requestStatusChange = (eventId: string, status: EventStatus) => {
    setPendingEventId(eventId);
    setPendingStatus(status);
    setIsConfirmOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!pendingEventId || !pendingStatus) return;
    await updateEventStatus(pendingEventId, pendingStatus);
    setIsConfirmOpen(false);
    setPendingEventId(null);
    setPendingStatus(null);
  };

  const handleCancelStatusChange = () => {
    setIsConfirmOpen(false);
    setPendingEventId(null);
    setPendingStatus(null);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = useMemo(() => {
    return {
      new_request: events.filter((e) => e.status === 'new_request'),
      active: events.filter((e) => e.status === 'active'),
      completed: events.filter((e) => e.status === 'completed'),
      cancelled: events.filter((e) => e.status === 'cancelled'),
    };
  }, [events]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Events</h2>
          <p className="text-slate-500 text-sm font-medium">
            Track client requests through New Request, Active, and Completed.
          </p>
        </div>
        <button
          onClick={fetchEvents}
          className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2 w-fit"
        >
          <ICONS.Activity size={18} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500 text-sm">
          Loading events...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={fetchEvents}
            className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        (Object.keys(grouped) as EventStatus[]).map((status) => {
          const meta = STATUS_META[status];
          const items = grouped[status];
          return (
            <section key={status} className="bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${meta.tone}`}>
                    {meta.label}
                  </span>
                  <p className="text-sm text-slate-500">{items.length} requests</p>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="px-6 py-10 text-center text-slate-400 text-sm">
                  No requests in this status.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {items.map((event) => (
                    <div key={event._id} className="px-6 py-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-slate-800">
                            {event.firstName} {event.lastName}
                          </p>
                          <span className="text-xs text-slate-400">-</span>
                          <p className="text-sm text-slate-500">{event.company}</p>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{event.service}</p>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2">{event.message}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="text-xs text-slate-500">
                          {new Date(event.createdAt).toLocaleDateString()}
                        </div>
                        <select
                          value={event.status}
                          onChange={(e) => requestStatusChange(event._id, e.target.value as EventStatus)}
                          disabled={actionLoading === event._id}
                          className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-50"
                        >
                          <option value="new_request">New Request</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })
      )}

      <ConfirmDialog
        open={isConfirmOpen}
        title="Change event status?"
        message="This will move the request to a different status."
        confirmLabel="Yes, update"
        cancelLabel="No, keep"
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
        isLoading={Boolean(actionLoading)}
      />
    </div>
  );
};

export default EventsView;

