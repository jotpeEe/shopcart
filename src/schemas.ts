import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'messages.email.empty' })
        .email({ message: 'messages.email.invalid' }),
    password: z.string().min(1, { message: 'messages.password.empty' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: 'messages.email.empty' })
            .email({ message: 'messages.email.invalid' }),
        password: z.string().min(1, { message: 'messages.password.empty' }),
        passwordConfirm: z.string().min(1, { message: 'messages.password.empty' }),
    })
    .superRefine(({ passwordConfirm, password }, ctx) => {
        if (passwordConfirm !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'messages.password.noMatch',
                path: ['passwordConfirm'],
            });
        }
    });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
