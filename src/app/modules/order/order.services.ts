import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data,
    include: {
      orderedBooks: true,
    },
  });
  return result;
};

const getAllOrders = async (user: any) => {
  const { role, email } = user;
  if (!(role && email)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
  }
  if (role === 'customer') {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const result = await prisma.order.findMany({
        where: {
          userId: user.id,
        },
        include: {
          orderedBooks: true,
        },
      });
      return result;
    }
  } else if (role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        orderedBooks: true,
      },
    });
    return result;
  }

  return 'unAuthorized';
};

const getSingleOrderByOrderId = async (orderId: string, user: any) => {
  const { role, email } = user;
  if (!(role && email)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'forbidden');
  }
  if (role === 'customer') {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      const order = await prisma.orderedBook.findFirst({
        where: {
          orderId,
        },
        include: {
          order: true,
        },
      });

      if (order?.order.userId === user.id) {
        return order;
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
      }
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'order not found');
    }
  } else if (role === 'admin') {
    const result = await prisma.orderedBook.findFirst({
      where: {
        orderId,
      },
      include: {
        order: true,
      },
    });
    return result;
  }

  return 'unAuthorized';
};

// const updateSingleBook = async (
//   id: string,
//   payload: Partial<Book>
// ): Promise<Book> => {
//   const result = await prisma.book.update({
//     where: {
//       id,
//     },
//     data: payload,
//   });
//   return result;
// };

// const deleteSingleBook = async (id: string) => {
//   try {
//     await prisma.$transaction(async tx => {
//       const book = await tx.book.findUnique({
//         where: {
//           id,
//         },
//         select: {
//           categoryId: true,
//         },
//       });

//       if (!book) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
//       }

//       // Delete the book from the 'Book' model
//       await tx.book.delete({
//         where: {
//           id,
//         },
//       });
//       console.log('book deleted');

//       // Delete the book's reference from the 'Category' model
//       const category = await tx.category.findUnique({
//         where: {
//           id: book.categoryId,
//         },
//         include: {
//           books: {
//             where: {
//               NOT: {
//                 id: id,
//               },
//             },
//           },
//         },
//       });

//       if (!category) {
//         throw new Error('Category not found.');
//       }

//       // Update the category with the filtered list of books
//       await tx.category.update({
//         where: {
//           id: book.categoryId,
//         },
//         data: {
//           books: {
//             set: category.books,
//           },
//         },
//       });

//       console.log('category updated');
//     });

//     return 'book deleted successfully';
//   } catch (error) {
//     throw new Error('failed to delete');
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSingleOrderByOrderId,
};
