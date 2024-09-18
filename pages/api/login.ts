import { SignJWT } from "jose";
import {NextRequest, NextResponse} from "next/server";
import { getJwtSecretKey } from '@/lib/token';


export default async function handler(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const {username, password} = await JSON.parse(req.body);

    if(username === "admin" && password === "admin") {
        const token = await new SignJWT({
            username: username,
            role: "admin"
        })
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .setExpirationTime("7 days")
            .sign(getJwtSecretKey());

        res.setHeader('Set-Cookie', `token=${token}; Path=/; Max-Age=${60 * 60 * 24 * 7};`);

        res.status(200).json({ success: true }, { headers: { "content-type": "application/json" } });

    } else {
        res.status(401).end('Wrong credentials');
    }
}