import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router';

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { Footer } from '../components/Footer';
import type { LoginRequest } from '../interfaces/logInInterfaces';
import { loginUser, saveAuthToken } from '../api/authService';

interface LoginFormErrors {
  username?: string;
  password?: string;
}

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Login Error',
      detail: message,
      life: 3000,
    });
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Successful Login',
      detail: message,
      life: 3000,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFormData((preData) => ({
      ...preData,
      [id]: value,
    }));

    if (errors[id as keyof LoginFormErrors]) {
      setErrors((preErrors) => ({
        ...preErrors,
        [id]: undefined,
      }));
    }
  };

  const isEmail = (input: string): boolean => {
    return input.includes('@');
  }

  const validateForm = (): LoginFormErrors => {
    const { username, password } = formData;
    const newErrors: LoginFormErrors = {};

    if (!username.trim()) newErrors.username = 'The username or email is required.';
    if (!password) newErrors.password = 'The password is required.';

    setErrors(newErrors);

    return newErrors;
  }

  const handleLogin = async () => {
    const detectedErrors = validateForm();

    if (Object.keys(detectedErrors).length === 0) {
      const { username, password } = formData;
      const userData: LoginRequest = { password };

      if (isEmail(username)) {
        userData.email = username;
      } else {
        userData.username = username;
      }

      setIsLoading(true);

      try {
        console.log('Logging in with data:', userData);
        const response = await loginUser(userData);

        if (response.success && response.data.token) {
          saveAuthToken(response.data.token);
          showSuccess('You have logged in successfully.');

          setTimeout(() => {
            navigate('/dashboard');
          }, 1000)
        } else{
          showError(response.message || 'Login failed. Please try again.');
        }
      } catch (error) {
          showError('An error occurred during login. Please try again later.');
          console.error('Login error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      const firstErrorMessage = Object.values(detectedErrors)[0];
      showError(firstErrorMessage);
    }
  };

  return (
    <div id="login-container" className="flex flex-col min-h-[100dvh]">
      <Toast ref={toast} />

      <section className="mt-15 flex flex-column">
        <h1 className="mx-auto mt-15 justify-center text-2xl font-semibold">Exagen</h1>

        <article
          id="login-form-container"
          className="mx-auto w-full max-w-sm mb-4 mt-5 gap-5 flex flex-column"
        >
          <FloatLabel>
            <InputText
              id="username"
              value={formData.username}
              className="p-inputtext-sm w-full"
              onChange={handleChange}
              invalid={!!errors.username}
            />
            <label htmlFor="username">Username o email</label>
          </FloatLabel>
          <FloatLabel className="w-full">
            <Password
              inputId="password"
              value={formData.password}
              className="p-inputtext-sm w-full"
              inputClassName="w-full"
              onChange={handleChange}
              toggleMask
              feedback={false}
              invalid={!!errors.password}
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>
          <div className="flex justify-center">
            <Button label="Login" onClick={handleLogin} className="pl-10 pr-10 w-full" loading={isLoading} />
          </div>
        </article>

        <article className="mx-auto">
          <Link to="/reset-password">
            <p className="underline">You forgot your password?</p>
          </Link>
        </article>
      </section>

      <section className="flex mx-auto mt-auto mb-4 max-w-sm w-full">
        <Link to="/register" className="w-full">
          <Button label="Create a new account" className="w-full" outlined />
        </Link>
      </section>

      <Footer className="mb-4" />
    </div>
  );
};
