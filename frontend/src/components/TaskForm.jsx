import { useState } from 'react';

const API = import.meta.env.VITE_API_URL;


export default function TaskForm({ darkMode, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      title,
      description,
    };

    try {
      const res = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error('Error al crear tarea');

      setTitle('');
      setDescription('');
      if (onCreate) onCreate(); // 🔔 Notifica al padre

    } catch (err) {
      console.error('Error al crear tarea', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className={`form-control ${darkMode ? 'bg-dark text-light' : ''}`}
          placeholder="Título de la tarea"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className={`form-control ${darkMode ? 'bg-dark text-light' : ''}`}
          placeholder="Descripción (opcional)"
          rows="2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-success">Agregar Tarea</button>
    </form>
  );
}
