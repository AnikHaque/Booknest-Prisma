import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async () => {
  const result = await prisma.user.findMany();
  const total = await prisma.user.count();

  return {
    total,
    data: result,
  };
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
