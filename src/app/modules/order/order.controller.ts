import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderServices } from './order.services';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrder(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrders(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

const getSingleOrderByOrderId = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderByOrderId(
      orderId,
      req.user
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  }
);
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

export const OrderController = {
  createBook,
  getAllOrders,
  getSingleOrderByOrderId,
};
