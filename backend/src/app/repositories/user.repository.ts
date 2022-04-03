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

  public async DeleteAllUsers(): Promise<any> {
    return models.User.destroy({
      where: {},
      force: true,
    });
  }

  public async GetAllUsers(): Promise<any> {
    const result = await models.Trade.findAll({
      order: [["id", "ASC"]],
    });
    return result;
    // as TradeInterface[];
  }

  public CreateUser(user: UserInterface): Promise<any> {
    const object = {
      name: user.name,
    };
    if (user.id != undefined) object["id"] = user.id;
    return models.User.create(object);
  }

  public GetUserById(id: number): Promise<any> {
    return models.User.findAll({
      where: {
        id: id,
      },
    });
  }
}

export default UserRepository;
