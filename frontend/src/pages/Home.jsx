import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">📝 Lista de Tareas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

