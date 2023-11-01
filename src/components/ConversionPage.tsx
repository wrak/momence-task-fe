import {useQuery} from "react-query";

import Alert from '@paljs/ui/Alert';
import Spinner from '@paljs/ui/Spinner';

import CurrenciesTable from "./CurrenciesTable.tsx";
import Calculator from "./Calculator.tsx";

import type {CurrenciesResponse, ErrorResponse} from "../types";

const getCurrencies = () => {
    return new Promise<CurrenciesResponse>(async (resolve, reject) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/currencies`);

        if (!response.ok) {
            return response.json().then(({error}: ErrorResponse) => reject(error));
        }

        return await response.json().then(resolve);
    })
}


function ConversionPage() {
    const {isFetching, isError, data, error} = useQuery({queryKey: ['currencies'], queryFn: getCurrencies});

    if (isError) {
        return (
            <>
                {/* @ts-ignore */}
                <Alert status="Danger">
                    {error}
                </Alert>
            </>
        )
    }

    if (isFetching || !data) {
        return (
            <Spinner/>
        )
    }

    return (
        <>
            <Calculator currencies={data}/>
            <CurrenciesTable currencies={data}/>
        </>
    )
}

export default ConversionPage;