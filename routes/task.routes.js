const express = require("express");
const router = express.Router();
const Task = require("../models/task.js");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

router.post("/crear", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título es obligatorio" });
    }

    const nuevaTask = new Task({
      title,
      description,
      completed: false,
    });

    const taskGuardada = await nuevaTask.save();

    res.status(201).json(taskGuardada);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

router.put("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const tareaActualizada = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );

    if (!tareaActualizada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al editar la tarea" });
  }
});

router.delete("/eliminar/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const tareaEliminada = await Task.findByIdAndDelete(id);

    if (!tareaEliminada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({
      mensaje: "Tarea eliminada correctamente",
      tarea: tareaEliminada,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

module.exports = router;
