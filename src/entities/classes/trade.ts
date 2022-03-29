export class trade {
  declare id: number;
  declare type: "buy" | "sell";
  declare User;
  declare symbol: string;
  declare shares: number;
  declare price: number; // float with 2 decimal
  declare timestamp: string;
}

export class User {
  declare id: number;
  declare type: string;
}
