import { UserInterface } from "../core/entities/interfaces/user.interface";
import UserRepository from "../repositories/user.repository";

async function deleteAllUsers(): Promise<any> {
  const userRepository = UserRepository.getInstance();
  userRepository
    .deleteAllUsers()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error in userConroller -> deleteAllUsers >> ", error);
      throw new Error("400 : " + error.toString());
    });
}

async function createUser(reqCreate: UserInterface) {
  const userRepository = UserRepository.getInstance();
  let finalresult: any;

  // TODO: add validator for reqBody
  if (reqCreate != undefined && reqCreate != null && reqCreate.name) {
    if (reqCreate.id) {
      const res = await userRepository.getUserById(reqCreate.id);
      if (res.length > 0) {
        return `200 : Save data is successfully.`;
      }
    }

    await userRepository
      .createUser(reqCreate)
      .then(async (result) => {
        finalresult = `201 : Save data is successfully`;
      })
      .catch((error) => {
        throw new Error("400 : " + error);
      });
  } else {
    throw new Error("400 : input can not be empty");
  }

  return finalresult;
}

async function getUserById(UserID: number) {
  const userRepository = UserRepository.getInstance();
  try {
    return await userRepository.getUserById(UserID);
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`);
  }
}
export default {
  deleteAllUsers,
  createUser,
  getUserById,
};
