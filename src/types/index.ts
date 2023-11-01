export type Currency = {
    country: string;
    code: string;
    rate: number;
}

export type CurrenciesResponse = Array<Currency>;

export type ConvertResponse = {
    result: number;
}

export type ErrorResponse = {
    error: string;
}