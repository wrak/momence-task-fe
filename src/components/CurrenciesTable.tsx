import styled from 'styled-components';

import {Card, CardBody, CardHeader} from '@paljs/ui/Card';

import type {Currency} from '../types';

type CurrenciesTableProps = {
    currencies: Array<Currency>;
};

const Table = styled.table`
  width: 100%;
`;

function CurrenciesTable({currencies}: CurrenciesTableProps) {
    return (
        <>
            {/* @ts-ignore */}
            <Card>
                <CardHeader>Currencies</CardHeader>
                <CardBody>
                    <Table>
                        <tbody>
                        {currencies.map((currency) => (
                            <tr key={currency.code}>
                                <td>{currency.country}</td>
                                <td>{currency.code}</td>
                                <td align="right">{Math.round(currency.rate * 1000) / 1000}&nbsp;CZK</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    )
}

export default CurrenciesTable;