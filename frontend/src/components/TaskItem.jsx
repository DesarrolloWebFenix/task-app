const API = import.meta.env.VITE_API_URL;

export default function TaskItem({ task, onUpdate, onDelete, darkMode }) {
  const handleToggle = async () => {
    try {
      const res = await fetch(`${API}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !task.completed })
      });

      if (!res.ok) throw new Error('Error al actualizar tarea');

      const updatedTask = await res.json();
      onUpdate(updatedTask);
    } catch (err) {
      console.error('Error al marcar completada:', err);
    }
  };

  const handleDelete = () => {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      onDelete(task.id);
    }
  };

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center
      ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="form-check-input me-2"
        />
        <span className={task.completed ? 'text-decoration-line-through' : ''}>
          {task.description}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-danger'}`}
      >
        Eliminar
      </button>
    </li>
  );
}
