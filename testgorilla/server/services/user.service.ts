import { User } from '../models';

// const findUserByEmail = async (email: string) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   return user;
// };
const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email: email });
  return user;
};

const findUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
// const findUserById = async (id: string) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   return user;
// };

const createUser = async (name: string, email: string, password: string) => {
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });
  return user;
};
// const createUser = async (name: string, email: string, password: string) => {
//   const user = await prisma.user.create({
//     data: {
//       name: name,
//       email: email,
//       password: password,
//     },
//   });
//   return user;
// };

export { createUser, findUserByEmail, findUserById };
