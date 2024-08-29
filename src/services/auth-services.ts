import { LoginWithPassword } from "../models/LoginWithPassword";
import { RequestToken } from "../models/RequestToken";
import { apiErrorHandler, server } from "../utils";

export interface loginWithPasswordProps {
    username: string,
    password: string,
    request_token: string
}

export const getRequestToken = async (): Promise<RequestToken> => {
    try {
        const res = await server.get(`/authentication/token/new`);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}

export const loginWithPassword = async (payload: loginWithPasswordProps): Promise<LoginWithPassword> => {
    try {
        const res = await server.post(`/authentication/token/validate_with_login`, payload);

        return res.data;
    } catch (err: any) {
        throw new Error(`${apiErrorHandler(err)}`);
    }
}