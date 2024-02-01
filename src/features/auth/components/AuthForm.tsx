import { type FormVariant } from './Auth';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
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
