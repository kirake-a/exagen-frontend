import { Toast } from 'primereact/toast';
import { Footer } from '../components/Footer';
import { useRef, useState, type ChangeEvent } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router';
import { validatePassword } from '../security/passwordValidator';
import { registerUser } from '../../../common/api/authService';
import type { SignUpRequest } from '../../../common/interfaces/signUpInterfaces';

interface RegisterFormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  passwordConfirm?: string;
}

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFormData((preData) => ({
      ...preData,
      [id]: value,
    }));

    if (errors[id as keyof RegisterFormErrors]) {
      setErrors((preErrors) => ({
        ...preErrors,
        [id]: undefined,
      }));
    }
  };

  const validateForm = (): RegisterFormErrors => {
    const { name, lastName, email, username, password, passwordConfirm } = formData;
    const newErrors: RegisterFormErrors = {};

    if (!name.trim()) newErrors.name = 'The name is required.';
    if (!lastName.trim()) newErrors.lastName = 'The last name is required.';
    if (!email.trim()) {
      newErrors.email = 'The email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'The email format is invalid.';
    }
    if (!username.trim()) newErrors.username = 'The username is required.';

    if (!password) {
      newErrors.password = 'The password is required.';
    } else if (!validatePassword(password)) {
      newErrors.password =
        'The password must be at least 8 characters long. Have an uppercase letter, a lowercase letter, a number, and a special character.';
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = 'The passwords do not match.';
    }

    setErrors(newErrors);

    return newErrors;
  };

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Register Error',
      detail: message,
      life: 3000,
    });
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Register Success',
      detail: message,
      life: 3000,
    });
  };

  const handleRegister = async () => {
    const detectedErrors = validateForm();

    if (Object.keys(detectedErrors).length === 0) {
      const { name, lastName, email, username, password } = formData;
      const userData: SignUpRequest = {name, lastName, email, username, password};

      setIsLoading(true);

      try {
        console.log('Registering user with data:', userData);
        const response = await registerUser(userData);

        if (response.success) {
          showSuccess('Registration successful! You can now log in.');

          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          showError(response.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        showError('An error occurred during registration. Please try again later.');
        console.error('Registration error:', error);
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
      <section className="mt-10 flex flex-column">
        <h1 className="mx-auto mt-10 justify-center text-2xl font-semibold">Register</h1>

        <article
          id="register-form-container"
          className="mx-auto w-full max-w-sm mb-4 mt-5 gap-5 flex flex-column"
        >
          <FloatLabel>
            <InputText
              id="name"
              value={formData.name}
              className="p-inputtext-sm w-full"
              onChange={handleChange}
              invalid={!!errors.name}
            />
            <label htmlFor="name">Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="lastName"
              value={formData.lastName}
              className="p-inputtext-sm w-full"
              onChange={handleChange}
              invalid={!!errors.lastName}
            />
            <label htmlFor="lastname">Last Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="email"
              value={formData.email}
              className="p-inputtext-sm w-full"
              onChange={handleChange}
              invalid={!!errors.email}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              id="username"
              value={formData.username}
              className="p-inputtext-sm w-full"
              onChange={handleChange}
              invalid={!!errors.username}
            />
            <label htmlFor="username">Username</label>
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
          <FloatLabel className="w-full">
            <Password
              inputId="passwordConfirm"
              value={formData.passwordConfirm}
              className="p-inputtext-sm w-full"
              inputClassName="w-full"
              onChange={handleChange}
              toggleMask
              feedback={false}
              invalid={!!errors.passwordConfirm}
            />
            <label htmlFor="password-confirm">Confirm your Password</label>
          </FloatLabel>
          <div className="flex justify-center">
            <Button label="Register" onClick={handleRegister} className="pl-10 pr-10 w-full" loading={isLoading} />
          </div>
        </article>
      </section>

      <section className="flex mx-auto mt-auto mb-4 max-w-sm w-full">
        <Link to="/login" className="w-full">
          <Button label="Back to Login" className="w-full" outlined />
        </Link>
      </section>

      <Footer className="mb-4 " />
    </div>
  );
};
