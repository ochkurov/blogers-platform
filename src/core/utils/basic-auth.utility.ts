export function parseBasicAuth(authHeader?: string): [string, string] {
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new Error('Invalid Basic Authorization header format.');
    }

    const base64Credentials: string = authHeader.split(' ')[1];

    let decoded: string;

    try {
        decoded = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    } catch {
        throw new Error('Failed to decode Basic Auth credentials.');
    }

    const [username, password] = decoded.split(':');

    if (!username || !password) {
        throw new Error('Invalid Basic Auth credentials format.');
    }

    return [username, password];
}