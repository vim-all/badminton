import { useState } from 'react';
import { COURTS } from '../../constants/appConstants';
import { formatFull, keyOfDate, parseDateKey } from '../../utils/dateUtils';

export default function AdminPanel({ days, slots, onCreateSlot, onDeleteSlot }) {
  const [court, setCourt] = useState(COURTS[0]);
  const [day, setDay] = useState(keyOfDate(days[0]));
  const [time, setTime] = useState('18:00 - 19:00');

  const createSlot = () => {
    if (!time.trim()) {
      alert('Enter a valid time slot.');
      return;
    }

    onCreateSlot({ date: day, court, time: time.trim() });
  };

  return (
    <section className="panelGrid">
      <article className="neu-card adminCard">
        <h2>Slot Control Center</h2>
        <p className="mutedText">Create and remove slots visible to users.</p>

        <div className="formGrid">
          <div>
            <label>Court</label>
            <select className="neu-input" value={court} onChange={(e) => setCourt(e.target.value)}>
              {COURTS.map((courtOption) => (
                <option key={courtOption} value={courtOption}>
                  {courtOption}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Date</label>
            <select className="neu-input" value={day} onChange={(e) => setDay(e.target.value)}>
              {days.map((dateOption) => (
                <option key={keyOfDate(dateOption)} value={keyOfDate(dateOption)}>
                  {formatFull(dateOption)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Time slot</label>
            <input
              className="neu-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 18:00 - 19:00"
            />
          </div>
        </div>

        <button className="btn btn-primary" onClick={createSlot}>
          Create slot
        </button>
      </article>

      <article className="neu-card slotListCard">
        <h3>Configured slots</h3>
        {slots.length === 0 ? (
          <p className="mutedText">No slots created yet.</p>
        ) : (
          <div className="adminSlotList">
            {slots
              .slice()
              .sort((a, b) => `${a.date}${a.court}${a.time}`.localeCompare(`${b.date}${b.court}${b.time}`))
              .map((slot) => (
                <div className="slotRow neu-inset" key={`${slot.date}-${slot.court}-${slot.time}`}>
                  <div>
                    <strong>{slot.court}</strong>
                    <div className="mutedText smallText">
                      {parseDateKey(slot.date).toLocaleDateString()} • {slot.time}
                    </div>
                  </div>
                  <button className="btn btn-danger" onClick={() => onDeleteSlot(slot)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        )}
      </article>
    </section>
  );
}
