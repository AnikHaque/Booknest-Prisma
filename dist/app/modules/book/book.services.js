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
exports.BookServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany();
    const total = yield prisma_1.default.book.count();
    return {
        total,
        data: result,
    };
});
const getBookByCategoryId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: id,
        },
    });
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield tx.book.findUnique({
                where: {
                    id,
                },
                select: {
                    categoryId: true,
                },
            });
            if (!book) {
                throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
            }
            // Delete the book from the 'Book' model
            yield tx.book.delete({
                where: {
                    id,
                },
            });
            console.log('book deleted');
            // Delete the book's reference from the 'Category' model
            const category = yield tx.category.findUnique({
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
            yield tx.category.update({
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
        }));
        return 'book deleted successfully';
    }
    catch (error) {
        throw new Error('failed to delete');
    }
    finally {
        yield prisma_1.default.$disconnect();
    }
});
exports.BookServices = {
    createBook,
    getAllBooks,
    getBookByCategoryId,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
};
