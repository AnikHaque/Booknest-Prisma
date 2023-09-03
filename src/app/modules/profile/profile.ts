import express, { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import prisma from '../../../shared/prisma';
import sendResponse from '../../../shared/sendResponse';
import auth from '../../middlewares/auth';
const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  async (req: Request, res: Response) => {
    const result = await prisma.user.findFirst({
      where: {
        email: req?.user?.email,
      },
    });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'profile info fetched successfully',
      data: result,
    });
  }
);

export const profileRoute = router;
