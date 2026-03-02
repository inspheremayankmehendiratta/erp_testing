import { CONSTANTS, KEYS } from "@/modules/shared/config/config";
import { encrypt } from "./encryption";

interface ClientApiOptions<TPayload> {
    url: string;
    method?: "GET" | "POST";
    payload?: TPayload;
    token?: string;
    responseType?: "json" | "blob";
}

export async function clientApi<TResponse, TPayload = unknown>({
    url,
    method = "POST",
    payload,
    token,
    responseType = "json",
}: ClientApiOptions<TPayload>): Promise<TResponse> {
    console.log(responseType);
    const isGet = method === CONSTANTS.REQUEST_GET;
    const isBlob = responseType === "blob";

    let finalPayload = { ...payload, role_code: "NA" };

    const headers: Record<string, string> = {
        [KEYS.X_AUTHORIZATION_TOKEN]:
            process.env.NEXT_PUBLIC_AUTH_TOKEN || "",
        ...(token && {
            [KEYS.AUTHORIZATION]: KEYS.BEARER + token,
        }),
    };

    headers[KEYS.CONTENT_TYPE] = CONSTANTS.REQUEST_FORMAT;
    headers[KEYS.ACCEPT_TYPE] = CONSTANTS.RESPONSE_FORMAT;

    const response: any = await fetch(url, {
        method,
        headers,
        body:
            isGet || !payload
                ? undefined
                : JSON.stringify({
                    data: encrypt(JSON.stringify(finalPayload)),
                }),
    });
    if (response.status == 500) {
        throw new Error(`API Error: ${response.status}`);
    }

    if (isBlob) {
        return (await response.blob()) as TResponse;
    }

    return await response.json();
}
