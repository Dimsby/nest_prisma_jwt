import { FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken';

export function extractTokenPayload(request: FastifyRequest, secret: string) {

    const header = request.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return null;
    }

    const [, tokenChunk] = header.split(' ');
    if (!tokenChunk) {
        return null;
    }

    try {
        const payload: any = jwt.verify(tokenChunk, secret);
         //@ts-ignore - temporary
        request.payload = payload
        return payload;
    }
    catch (err) {
        console.log(err)
        return null;
    }
}
