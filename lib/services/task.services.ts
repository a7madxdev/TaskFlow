import { prisma } from "@/lib/prisma";

export const getTasks = async () => {
  return prisma.task.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
};

export const getTaskById = async (id: string) => {
  return prisma.task.findUnique({ where: { id } });
};

export const createTask = async (title: string, description: string) => {
  return prisma.task.create({ data: { title, description } });
};

export const updateTask = async (
  id: string,
  data: { title?: string; description?: string }
) => {
  return prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id: string) => {
  return prisma.task.delete({ where: { id } });
};

export const toggleTaskStatus = async (id: string, done: boolean) => {
  return prisma.task.update({ where: { id }, data: { done } });
};
