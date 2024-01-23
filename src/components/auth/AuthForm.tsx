import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

const AuthForm = ({ login }: { login: boolean }) => (
    <>{login ? <LoginForm /> : <RegisterForm />}</>
);

export default AuthForm;
