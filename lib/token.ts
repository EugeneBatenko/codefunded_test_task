import {jwtVerify} from "jose";

export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET_KEY;
    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string | Uint8Array) {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());

        return payload;
    } catch (error) {
        return null;
    }
}

export async function getUsername(token: string) {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload.username;
}