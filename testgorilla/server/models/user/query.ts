import User from './model';

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email: email });
  return user;
};

const findUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });
  return user;
};

export { createUser, findUserByEmail, findUserById };
