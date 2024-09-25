import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ENV: z
      .union([z.literal('development'), z.literal('testing'), z.literal('production')])
      .default('development'),
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

export default env;
