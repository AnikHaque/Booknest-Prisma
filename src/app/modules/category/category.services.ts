import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await prisma.category.findMany();
  const total = await prisma.category.count();

  return {
    total,
    data: result,
  };
};

const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  const books = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });
  const result = { category, books };
  return result;
};

const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleCategory = async (id: string) => {
  try {
    await prisma.$transaction(async transaction => {
      await transaction.book.deleteMany({
        where: {
          categoryId: id,
        },
      });

      await transaction.category.delete({
        where: {
          id: id,
        },
      });
    });
    return 'category deleted successfully';
  } catch (error) {
    throw new Error('failed to delete category');
  } finally {
    await prisma.$disconnect();
  }
};

export const CategoryServices = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
