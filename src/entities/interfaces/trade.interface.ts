interface CreateTradeInterface {
  readonly type: "buy";
  readonly user_id: number;
  readonly stock_id: number;
  readonly shares: number;
  readonly price: number;
}

export { CreateTradeInterface };
