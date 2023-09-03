import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const signup = async (data: User) => {
  const result = await prisma.user.create({
    data,
  });
  const { id, name, email, role, contactNo, address, profileImg } = result;
  return { id, name, email, role, contactNo, address, profileImg };
};

const signin = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const isExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (isExist) {
    if (!(isExist.password === password)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    } else {
      const { email, role } = isExist;

      const accessToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );

      const refreshToken = jwtHelpers.createToken(
        { email, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );
      return {
        accessToken,
        refreshToken,
      };
    }
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
};

export const AuthServices = {
  signup,
  signin,
};
