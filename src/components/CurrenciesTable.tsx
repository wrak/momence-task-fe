import type {Currency} from '../types';
import {Card, CardBody, CardHeader} from '@paljs/ui/Card';
import {Table} from './Table';

type CurrenciesTableProps = {
    currencies: Array<Currency>;
};

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
                                <td align="right">{currency.rate}&nbsp;CZK</td>
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