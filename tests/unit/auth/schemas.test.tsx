import { type z } from 'zod';

import { LoginSchema, RegisterSchema } from '../../../src/features/auth/forms/schemas';

type Schema = z.ZodObject<any> | z.ZodEffects<z.ZodObject<any>>;

export const validateSchemaInput = (values: unknown, schema: Schema) => {
    const parsedData = schema.parse(values);

    return parsedData;
};

describe('Schema Validation', () => {
    const testSchema = (
        schema: Schema,
        validInput: unknown,
        invalidInputs: { input: unknown; errorMessage: string }[]
    ) => {
        it('should validate valid input', () => {
            const validate = validateSchemaInput(validInput, schema);
            expect(() => validate).not.toThrow();
        });

        invalidInputs.forEach(({ input, errorMessage }) => {
            it(`should throw error for ${errorMessage}.`, () => {
                expect(() => validateSchemaInput(input, schema)).toThrow();
            });
        });
    };

    describe('LoginSchema', () => {
        testSchema(LoginSchema, { email: 'test@example.com', password: 'password123' }, [
            {
                input: { email: '', password: 'password123' },
                errorMessage: 'email cannot be empty',
            },
            {
                input: { email: 'test.example.com', password: 'password123' },
                errorMessage: 'email must be a valid email',
            },
            {
                input: { email: 'test@example.com', password: '' },
                errorMessage: 'password cannot be empty',
            },
        ]);
    });

    describe('RegisterSchema', () => {
        testSchema(
            RegisterSchema,
            {
                email: 'test@example.com',
                password: 'password123',
                passwordConfirm: 'password123',
            },
            [
                {
                    input: {
                        email: '',
                        password: 'password123',
                        passwordConfirm: 'password123',
                    },
                    errorMessage: 'email cannot be empty',
                },
                {
                    input: {
                        email: 'test.example.com',
                        password: 'password123',
                        passwordConfirm: 'password123',
                    },
                    errorMessage: 'email must be a valid email',
                },
                {
                    input: {
                        email: 'test@example.com',
                        password: '',
                        passwordConfirm: '',
                    },
                    errorMessage: 'password cannot be empty',
                },
                {
                    input: {
                        email: 'test@example.com',
                        password: 'pass',
                        passwordConfirm: 'pass',
                    },
                    errorMessage: 'password is too short',
                },
                {
                    input: {
                        email: 'test@example.com',
                        password: 'password123',
                        passwordConfirm: 'password',
                    },
                    errorMessage: 'passwords do not match',
                },
            ]
        );
    });
});
