import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import Alert from './Alert';

const API = import.meta.env.VITE_API_URL;

export default function TaskList({ darkMode }) {
  const [tasks, setTasks] = useState([]);
  const [alert, setAlert] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Filtros
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  const limit = 5;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/tasks?page=${page}&limit=${limit}&status=${statusFilter}&search=${search}&order=${order}`);
      const data = await res.json();
  
      setTasks(data.tasks); //data
      setTotal(data.total);
    } catch (err) {
      setAlert({ type: 'danger', message: 'Error al cargar tareas' });
      setTasks([]);
    }finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchTasks();
  }, [page, statusFilter, search, order]);

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setAlert({ type: 'info', message: 'Tarea actualizada' });
  };

  const handleDelete = async (taskId) => {
    try {
      const res = await fetch(`${API}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar tarea');

      setTasks(tasks.filter(task => task.id !== taskId));
      setAlert({ type: 'danger', message: 'Tarea eliminada' });
    } catch (err) {
      setAlert({ type: 'danger', message: 'Error al eliminar la tarea' });
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          darkMode={darkMode}
        />
      )}

      {/* Filtros */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <select className="form-select w-auto" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>

        <input
          type="text"
          className="form-control w-auto"
          placeholder="Buscar tarea..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="form-select w-auto" onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguas</option>
        </select>
      </div>


      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {Array.isArray(tasks) && tasks.length === 0 ? (
            <p className="text-muted">No hay tareas aún.</p>
          ) : (
            <ul className="list-group">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  darkMode={darkMode}
                />
              ))}
            </ul>
          )}
        </>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn mx-1 ${i + 1 === page ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
