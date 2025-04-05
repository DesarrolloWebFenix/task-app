let tasks = []; // Si estás usando memoria. Si usas DB, lo adaptamos luego.

exports.getTasks = (req, res) => {
  let { page = 1, limit = 5, status = 'all', search = '', order = 'desc' } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...tasks];

  // Filtrar por estado
  if (status === 'completed') {
    filtered = filtered.filter(task => task.completed);
  } else if (status === 'pending') {
    filtered = filtered.filter(task => !task.completed);
  }

  // Filtrar por texto en la descripción
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(task =>
      task.description.toLowerCase().includes(term)
    );
  }

  // Ordenar por fecha
  filtered.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  res.json({
    tasks: paginated,
    total,
  });
};

exports.createTask = (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ message: 'Descripción requerida' });
  }

  const newTask = {
    id: Date.now(),
    description,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { description, completed } = req.body;

  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
};


exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Tarea no encontrada' });

  tasks.splice(index, 1);
  res.json({ message: 'Tarea eliminada' });
};
