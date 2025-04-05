import { useEffect } from 'react';

export default function Alert({ type = "success", message, onClose, darkMode }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show ${darkMode ? 'bg-dark text-light border-light' : ''}`}
      role="alert"
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
      ></button>
    </div>
  );
}
