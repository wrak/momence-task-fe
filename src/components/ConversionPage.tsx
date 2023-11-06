import {useQuery} from 'react-query';

import Alert from '@paljs/ui/Alert';
import Spinner from '@paljs/ui/Spinner';

import CurrenciesTable from './CurrenciesTable.tsx';
import Calculator from './Calculator.tsx';

import type {CurrenciesResponse} from '../types';
import {handleResponse} from '../utils';

const getCurrencies = () => {
    return handleResponse<CurrenciesResponse>(() => fetch(`${import.meta.env.VITE_API_URL}/currencies`));
}


function ConversionPage() {
    const {isError, data, error} = useQuery({queryKey: ['currencies'], queryFn: getCurrencies});

    if (isError) {
        return (
            <>
                {/* @ts-ignore Because selected design system library has poorly typed some components which doesn't allow children prop */}
                <Alert status="Danger">
                    {error}
                </Alert>
            </>
        )
    }

    if (!data) {
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