import { type FormVariant } from './Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { register } from '../actions/register';
import { login } from '../services/login';

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
