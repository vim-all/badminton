import { useEffect, useState } from 'react';
import { formatFull, parseDateKey } from '../../utils/dateUtils';

export default function BookingModal({ open, slot, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!open) {
      setName('');
      setPhone('');
    }
  }, [open]);

  if (!open || !slot) return null;

  const submitBooking = () => {
    if (!name.trim() || !phone.trim()) {
      alert('Please enter name and phone.');
      return;
    }

    onSubmit({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard neu-card" onClick={(e) => e.stopPropagation()}>
        <h3>Confirm booking</h3>
        <p className="mutedText">
          {formatFull(parseDateKey(slot.date))} • {slot.court} • {slot.time}
        </p>

        <div className="modalFields">
          <label>Name</label>
          <input
            className="neu-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
          />

          <label>Phone</label>
          <input
            className="neu-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="modalActions">
          <button className="btn btn-soft" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={submitBooking}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
