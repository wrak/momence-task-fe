import {useState, useCallback, useMemo, useRef} from 'react';
import styled from 'styled-components';
import {useMutation} from "react-query";

import Select from '@paljs/ui/Select';
import {InputGroup} from "@paljs/ui";
import {Button} from '@paljs/ui/Button';
import Alert from '@paljs/ui/Alert';
import Spinner from '@paljs/ui/Spinner';

import {ConvertResponse, Currency} from '../types';
import {handleResponse} from '../utils';

type CalculatorProps = {
    currencies: Array<Currency>;
};

const Container = styled.div`
  margin-bottom: 14px;
  border-radius: ${({theme}) => theme.borderRadius};
  border: 1px solid ${({theme}) => theme.borderBasicColor3};
  box-shadow: ${({theme}) => theme.shadow};
  background-color: ${({theme}) => theme.backgroundBasicColor1};
`;

const Row = styled.div`
  padding: 14px 17.5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const InputContainer = styled.div`
  flex: 0 0 170px;
`

const SelectContainer = styled.div`
  flex: 0 0 170px;
  padding: 0 17.5px;
`;

const Result = styled(Alert)`
  margin: 0 17.5px 14px;
  border: 1px solid ${({theme}) => theme.borderBasicColor4};
`

const Error = styled(Alert)`
  margin: 0 17.5px 14px;
`

const convert = async ({code, amount}: { code: string, amount: number }) => {
    return handleResponse<ConvertResponse>(() => fetch(`${import.meta.env.VITE_API_URL}/convert?code=${code}&amount=${amount}`));
}

function Calculator({currencies}: CalculatorProps) {
    const [amount, setAmount] = useState<number>();
    const [code, setCode] = useState<string>();
    const submittedParamsRef = useRef({
        amount,
        code,
    });

    const isValid = amount != null && code != null;

    const calculate = useMutation({
        mutationFn: convert
    });

    const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const normalizedAmount = Number(e.target.value);
        if (Number.isNaN(normalizedAmount) || e.target.value === '') {
            setAmount(undefined);

            return;
        }

        setAmount(normalizedAmount);
    }, []);

    const handleCodeChange = useCallback((selectedOption: { value: string } | null) => {
        if (selectedOption == null) {
            setCode(undefined);

            return;
        }

        setCode(selectedOption.value);
    }, []);

    const handleSubmit = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!isValid) {
            return;
        }

        submittedParamsRef.current = {
            amount,
            code,
        }
        calculate.mutate({amount, code});
    }, [calculate, isValid, code, amount, submittedParamsRef])

    const options = useMemo(
        () => currencies.map(({code, country}) => ({
            label: `${code} (${country})`,
            value: code,
        })),
        [currencies]
    );

    const selectValue = options.find(({value}) => value === code);

    console.log(amount)

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Row>
                    <InputContainer>
                        <InputGroup>
                            <input
                                type="number"
                                placeholder="Amount in CZK"
                                value={amount}
                                step="0.001"
                                onChange={handleAmountChange}
                            />
                        </InputGroup>
                    </InputContainer>

                    <SelectContainer>
                        <Select options={options} placeholder="Code" value={selectValue} onChange={handleCodeChange}/>
                    </SelectContainer>

                    <Button style={{position: 'relative'}} disabled={!isValid} type="submit">
                        Convert
                        {calculate.isLoading && <Spinner/>}
                    </Button>
                </Row>
            </form>

            {calculate.isError && (
                <>
                    {/* @ts-ignore Because selected design system library has poorly typed some components which doesn't allow children prop */}
                    <Error status="Danger">{calculate.error}</Error>
                </>
            )}

            {calculate.isSuccess && (
                <>
                    {/* @ts-ignore Because selected design system library has poorly typed some components which doesn't allow children prop */}
                    <Result>
                        {submittedParamsRef.current.amount}&nbsp;CZK
                        is {Math.round(calculate.data.result * 100) / 100}&nbsp;{submittedParamsRef.current.code}
                    </Result>
                </>
            )}

        </Container>
    )
}

export default Calculator
