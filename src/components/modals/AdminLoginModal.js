import { useEffect, useState } from 'react';
import { ADMIN_PASSWORD } from '../../constants/appConstants';

export default function AdminLoginModal({ open, onClose, onLogin }) {
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!open) {
      setPassword('');
    }
  }, [open]);

  if (!open) return null;

  const handleContinue = () => {
    if (password === ADMIN_PASSWORD) {
      onLogin();
      return;
    }

    alert('Wrong password');
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard neu-card" onClick={(e) => e.stopPropagation()}>
        <h3>Admin access</h3>
        <p className="mutedText">Enter password to manage slot inventory.</p>
        <p className="mutedText">Hint: {ADMIN_PASSWORD}</p>

        <div className="modalFields">
          <label>Password</label>
          <input
            type="password"
            className="neu-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
          />
        </div>

        <div className="modalActions">
          <button className="btn btn-soft" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
