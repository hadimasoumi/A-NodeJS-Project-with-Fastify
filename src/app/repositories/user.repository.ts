import models from "../core/entities/schemas";
import { UserInterface } from "../core/entities/interfaces/user.interface";

class UserRepository {
  private static instance: UserRepository;

  constructor() {}

  public static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  public async findAllUsers(): Promise<any> {
    const result = await models.Trade.findAll({
      order: [["id", "ASC"]],
    });
    return result;
    // as TradeInterface[];
  }

  public createUser(user: UserInterface): Promise<any> {
    const object = {
      name: user.name,
    };
    if (user.id != undefined) object["id"] = user.id;
    return models.User.create(object);
  }

  public getUserById(id: number): Promise<any> {
    return models.User.findAll({
      where: {
        id: id,
      },
    });
  }
}

export default UserRepository;
