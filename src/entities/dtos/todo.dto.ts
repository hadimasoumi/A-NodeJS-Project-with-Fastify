interface createTrade {
  id: number;
  type: "buy" | "sell";
  user_id: number;
  symbol: string;
  shares: number;
  price: number;
}

// interface deleteDTO {
//   _id: string;
// }

export { createTrade };
