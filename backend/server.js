const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks'); // o donde esté tu archivo
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

