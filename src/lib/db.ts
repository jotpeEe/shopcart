import { PrismaClient } from '@prisma/client';

import env from '@/env.js';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (env.ENV !== 'production') globalThis.prisma = db;
