import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book) => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async () => {
  const result = await prisma.book.findMany();
  const total = await prisma.book.count();

  return {
    total,
    data: result,
  };
};

const getBookByCategoryId = async (id: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });
  return result;
};

const getSingleBook = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleBook = async (id: string) => {
  try {
    await prisma.$transaction(async tx => {
      const book = await tx.book.findUnique({
        where: {
          id,
        },
        select: {
          categoryId: true,
        },
      });

      if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
      }

      // Delete the book from the 'Book' model
      await tx.book.delete({
        where: {
          id,
        },
      });
      console.log('book deleted');

      // Delete the book's reference from the 'Category' model
      const category = await tx.category.findUnique({
        where: {
          id: book.categoryId,
        },
        include: {
          books: {
            where: {
              NOT: {
                id: id,
              },
            },
          },
        },
      });

      if (!category) {
        throw new Error('Category not found.');
      }

      // Update the category with the filtered list of books
      await tx.category.update({
        where: {
          id: book.categoryId,
        },
        data: {
          books: {
            set: category.books,
          },
        },
      });

      console.log('category updated');
    });

    return 'book deleted successfully';
  } catch (error) {
    throw new Error('failed to delete');
  } finally {
    await prisma.$disconnect();
  }
};

export const BookServices = {
  createBook,
  getAllBooks,
  getBookByCategoryId,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
