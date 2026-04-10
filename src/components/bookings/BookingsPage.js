export default function BookingsPage({
  days,
  courts,
  selectedDay,
  selectedDayLabel,
  onSelectDay,
  getSlotsForCourt,
  isSlotBooked,
  onSelectSlot,
  getDateKey,
}) {
  return (
    <main className="contentStack bookingsPage">
      <section className="neu-card">
        <h2>Choose your day</h2>
        <div className="dayScroller">
          {days.map((day) => {
            const dayKey = getDateKey(day);
            const active = dayKey === selectedDay;

            return (
              <button
                key={dayKey}
                onClick={() => onSelectDay(dayKey)}
                className={`${active ? 'dayChipActive' : 'dayChip'}`}
              >
                <span>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <strong>{day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</strong>
              </button>
            );
          })}
        </div>
        <p className="mutedText">Selected: {selectedDayLabel}</p>
      </section>

      <section className="courtGrid">
        {courts.map((court) => {
          const slots = getSlotsForCourt(court);

          return (
            <article className="neu-card courtSlotCard" key={court}>
              <div className="sectionHead">
                <h3>{court}</h3>
                <span className="mutedText smallText">Indoor • Wooden court</span>
              </div>

              {slots.length === 0 ? (
                <div className="emptyState neu-inset">No slots configured by admin.</div>
              ) : (
                <div className="slotGrid">
                  {slots.map((slot) => {
                    const booked = isSlotBooked(slot);

                    return (
                      <button
                        key={`${slot.date}-${slot.court}-${slot.time}`}
                        className={`slotBtn ${booked ? 'slotBtnBooked' : ''}`}
                        disabled={booked}
                        onClick={() => onSelectSlot(slot)}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
