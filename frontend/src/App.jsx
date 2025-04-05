import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleCreate = () => {
    setTaskCreated(prev => !prev); // Cambia el estado para forzar recarga de tareas
  };

  return (
    <div className={darkMode ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Lista de Tareas</h1>
          <button onClick={toggleTheme} className="btn btn-outline-secondary">
            {darkMode ? '🌞 Modo Claro' : '🌙 Modo Oscuro'}
          </button>
        </div>

        <TaskForm darkMode={darkMode} onCreate={handleCreate} />
        <TaskList darkMode={darkMode} taskCreated={taskCreated} />
      </div>
    </div>
  );
}

export default App;

