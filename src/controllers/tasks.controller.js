import prisma from "../prismaClient.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error getting task" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: req.user.id,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const putTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

    if (!task || task.userId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const updateTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        status,
      },
    });
    res.status(200).json(updateTask);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });

    if (!task || task.userId !== req.user.id) {
      return res.status(403).json({ error: "Not allowed" });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(500).json({ error: "Error deleting task" });
  }
};
