import { type FormVariant } from './Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { login } from '../services/login';
import { register } from '../services/register';

const AuthForm = ({ formType }: { formType: FormVariant }) => (
    <>
        {formType === 'login' ? (
            <LoginForm login={login} />
        ) : (
            <RegisterForm register={register} />
        )}
    </>
);

export default AuthForm;
