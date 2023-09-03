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
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_services_1 = require("./order.services");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrderServices.createOrder(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_services_1.OrderServices.getAllOrders(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
const getSingleOrderByOrderId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_services_1.OrderServices.getSingleOrderByOrderId(orderId, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order fetched successfully',
        data: result,
    });
}));
// const getBookByCategoryId = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BookServices.getBookByCategoryId(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books fetched successfully',
//     data: result,
//   });
// });
// const getSingleBook = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BookServices.getSingleBook(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book fetched successfully',
//     data: result,
//   });
// });
// const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BookServices.updateSingleBook(id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book updated successfully',
//     data: result,
//   });
// });
// const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BookServices.deleteSingleBook(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Book deleted successfully',
//     data: result,
//   });
// });
exports.OrderController = {
    createBook,
    getAllOrders,
    getSingleOrderByOrderId,
};
