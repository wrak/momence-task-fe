import {ErrorResponse} from '../types';

export const handleResponse = async <T>(cb: () => Promise<Response>) => {
    try {
        const response = await cb();

        if (!response.ok) {
            let error: ErrorResponse;
            try {
                // response might not be json.
                error = await response.json();
            } catch (e) {
                error = {
                    error: 'Unknown error has occurred',
                };
            }

            return Promise.reject(error.error);
        }

        return await response.json() as T;
    } catch (e) {
        throw 'Unknown error has occurred';
    }
}