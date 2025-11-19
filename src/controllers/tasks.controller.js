import prisma from "../prismaClient.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error getting task" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, status, userId } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: parseInt(userId),
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const putTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, userId, status } = req.body;
  try {
    const updateTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        status,
        userId: parseInt(userId),
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
