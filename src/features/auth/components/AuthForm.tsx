import { register } from '@/actions/user/register';
import useLogin from '@/features/auth/hooks/useLogin';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthForm = ({ login }: { login: boolean }) => {
    const log = useLogin();

    return (
        <>{login ? <LoginForm login={log} /> : <RegisterForm register={register} />}</>
    );
};

export default AuthForm;
