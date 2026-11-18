import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const adminSessionCookie = 'admin_session';
export const adminSessionMaxAge = 60 * 60 * 24 * 30;

function signSession(payload: string, username: string, password: string): Buffer {
  return createHmac('sha256', password).update(JSON.stringify([username, payload])).digest();
}

export function createAdminSession(username: string, password: string): string {
  const expiresAt = Date.now() + adminSessionMaxAge * 1000;
  const payload = `${expiresAt}.${randomBytes(16).toString('hex')}`;
  return `${payload}.${signSession(payload, username, password).toString('hex')}`;
}

export function hasAdminSession(request: NextRequest): boolean {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const token = request.cookies.get(adminSessionCookie)?.value;
  if (!username || !password || !token) return false;

  const match = /^(\d+)\.([0-9a-f]{32})\.([0-9a-f]{64})$/.exec(token);
  if (!match) return false;

  const [, expiresAt, nonce, signature] = match;
  if (Number(expiresAt) <= Date.now()) return false;

  return timingSafeEqual(
    Buffer.from(signature, 'hex'),
    signSession(`${expiresAt}.${nonce}`, username, password)
  );
}
