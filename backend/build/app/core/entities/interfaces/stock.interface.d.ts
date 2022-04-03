interface StockInterface {
    readonly id: number;
    readonly symbol: string;
    readonly name: string;
    readonly price: number;
    readonly total_shares: number;
}
interface StockHighLowInterface {
    readonly id: number;
    readonly symbol: string;
    readonly price: number;
    readonly highest: number;
    readonly lowest: number;
}
interface StockUpdatePriceInterface {
    readonly id: number;
    readonly price: number;
}
interface StockCreateInterface {
    id?: number;
    symbol: string;
    name?: string;
    price?: number;
    total_shares?: number;
}
export { StockInterface, StockUpdatePriceInterface, StockCreateInterface, StockHighLowInterface, };
