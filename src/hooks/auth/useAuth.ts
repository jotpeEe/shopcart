import { type LoginReturnType, useLogin } from './useLogin';
import { type SignupReturnType, useSignup } from './useSignup';

type AuthActions = 'login' | 'signup';

type AuthActionFunction<T extends AuthActions> = {
    login: () => LoginReturnType;
    signup: () => SignupReturnType;
}[T];

type AuthReturnType<T extends AuthActions> = ReturnType<AuthActionFunction<T>>;

const useAuth = <T extends AuthActions>(action: T): AuthReturnType<T> =>
    ({
        login: useLogin() as AuthReturnType<T>,
        signup: useSignup() as AuthReturnType<T>,
    })[action];

export default useAuth;
