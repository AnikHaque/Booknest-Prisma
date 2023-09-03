"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data,
        include: {
            orderedBooks: true,
        },
    });
    return result;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, email } = user;
    if (!(role && email)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden');
    }
    if (role === 'customer') {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            const result = yield prisma_1.default.order.findMany({
                where: {
                    userId: user.id,
                },
                include: {
                    orderedBooks: true,
                },
            });
            return result;
        }
    }
    else if (role === 'admin') {
        const result = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: true,
            },
        });
        return result;
    }
    return 'unAuthorized';
});
const getSingleOrderByOrderId = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, email } = user;
    if (!(role && email)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'forbidden');
    }
    if (role === 'customer') {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (user) {
            const order = yield prisma_1.default.orderedBook.findFirst({
                where: {
                    orderId,
                },
                include: {
                    order: true,
                },
            });
            if ((order === null || order === void 0 ? void 0 : order.order.userId) === user.id) {
                return order;
            }
            else {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'order not found');
            }
        }
        else {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'order not found');
        }
    }
    else if (role === 'admin') {
        const result = yield prisma_1.default.orderedBook.findFirst({
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
});
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
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getSingleOrderByOrderId,
};
