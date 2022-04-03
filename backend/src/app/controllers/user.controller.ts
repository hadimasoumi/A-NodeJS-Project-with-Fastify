import { UserInterface } from "../core/entities/interfaces/user.interface";
import UserRepository from "../repositories/user.repository";

async function DeleteAllUsers(): Promise<any> {
  const userRepository = UserRepository.getInstance();
  userRepository
    .DeleteAllUsers()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log("error in userConroller -> deleteAllUsers >> ", error);
      throw new Error("400 : " + error.toString());
    });
}

async function CreateUser(reqCreate: UserInterface) {
  const userRepository = UserRepository.getInstance();
  let finalresult: any;

  // TODO: add validator for reqBody
  if (reqCreate != undefined && reqCreate != null && reqCreate.name) {
    if (reqCreate.id) {
      const res = await userRepository.GetUserById(reqCreate.id);
      if (res.length > 0) {
        return `200 : Save data is successfully.`;
      }
    }

    await userRepository
      .CreateUser(reqCreate)
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

async function GetUserById(UserID: number) {
  const userRepository = UserRepository.getInstance();
  return userRepository
    .GetUserById(UserID)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error("400 : " + error.toString());
    });
}
export default {
  DeleteAllUsers,
  CreateUser,
  GetUserById,
};
