import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { validatePassword } from '../security/passwordValidator';
import { OverlayPanel } from 'primereact/overlaypanel';
import type { PasswordResetRequest } from '../../../common/interfaces/passwordResetInterface';
import { resetPassword } from '../../../common/api/authService';

interface ChangePasswordFormErrors {
  email?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export const ChangePasswordPage = () => {
  const toast = useRef<Toast>(null);
  const policy = useRef<OverlayPanel>(null);

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState<ChangePasswordFormErrors>({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showError = (message: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 3000,
    });
  };

  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000,
    });
  };

  const handleEmailSubmit = () => {
    if (!email) {
      showError('Please enter your email address.');
      setErrors({ email: 'The email is required.' });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showError('The email format is invalid.');
      setErrors({ email: 'The email format is invalid.' });
      return;
    }

    // simulate sending email for password reset
    setTimeout(() => {
      setStep('password');
    }, 400);
  };

  const handleChangePasswordSubmit = async () => {
    if (!newPassword || !confirmNewPassword) {
      showError('Please fill in all password fields.');
      setErrors({
        newPassword: !newPassword ? 'The new password is required.' : undefined,
        confirmNewPassword: !confirmNewPassword ? 'The confirm password is required.' : undefined,
      });
      return;
    } else if (!validatePassword(newPassword)) {
      showError('The new password is invalid. Follow the password policy.');
      setErrors({ newPassword: 'The new password is invalid. Follow the password policy.' });
      return;
    } else if (newPassword !== confirmNewPassword) {
      showError('The passwords do not match.');
      setErrors({ confirmNewPassword: 'The passwords do not match.' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const requestData: PasswordResetRequest = {
        email,
        newPassword,
        newPasswordConfirm: confirmNewPassword,
      };

      const response = await resetPassword(requestData);

      if (response.success && response.data) {
        showSuccess('Password changed successfully.');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        showError(response.message || 'Failed to change password. Please try again.');
      }
    } catch (error) {
      showError('An unexpected error occurred. Please try again later.');
      console.error('Password change error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-sm mx-auto">
      <Toast ref={toast} />

      <header className="mx-auto mt-20 text-2xl font-semibold">
        <h1>Password Reset</h1>
      </header>

      {step === 'email' && (
        <section id="get-email">
          <header className="mt-4 flex flex-col gap-2">
            <h2>Enter your email address</h2>
            <p className="text-gray-500 text-sm">
              Enter the email address associated with your Exagen account.
            </p>
          </header>

          <article className="mt-5 flex flex-col gap-4">
            <div>
              <FloatLabel>
                <InputText
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-inputtext-sm w-full"
                  invalid={!!errors.email}
                />
                <label htmlFor="email">Email</label>
              </FloatLabel>
            </div>
            <div>
              <Button
                label="Continue"
                onClick={handleEmailSubmit}
                className="pl-10 pr-10 w-full"
                loading={loading}
              />
            </div>
          </article>
        </section>
      )}

      {step === 'password' && (
        <section id="get-new-password">
          <header className="mt-4 flex flex-col gap-2">
            <h2>Enter and confirm your new password</h2>
            <p className="text-sm">Enter a new password for your account.</p>
          </header>

          <article className="mt-5 flex flex-col gap-4">
            <div className="flex gap-5 flex-col">
              <div>
                <FloatLabel>
                  <Password
                    inputId="new-password"
                    value={newPassword}
                    className="p-inputtext-sm w-full"
                    onChange={(e) => setNewPassword(e.target.value)}
                    inputClassName="w-full"
                    toggleMask
                    feedback={false}
                    invalid={!!errors.newPassword}
                    disabled={loading}
                  />
                  <label htmlFor="new-password">New Password</label>
                </FloatLabel>
                <div className="card mt-1">
                  <button
                    className="underline cursor-pointer text-sm text-gray-500 bg-transparent border-none p-0 text-left"
                    onClick={(e) => policy.current?.toggle(e)}
                  >
                    Password policy
                  </button>
                  <OverlayPanel ref={policy}>
                    <ul className="text-xs list-disc list-inside pl-1">
                      <li>Password must be at least 8 characters long</li>
                      <li>Password must contain at least one uppercase letter</li>
                      <li>Password must contain at least one lowercase letter</li>
                      <li>Password must contain at least one number</li>
                      <li>Password must contain at least one special character</li>
                    </ul>
                  </OverlayPanel>
                </div>
              </div>
              <FloatLabel>
                <Password
                  inputId="new-password-confirm"
                  value={confirmNewPassword}
                  className="p-inputtext-sm w-full"
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  inputClassName="w-full"
                  toggleMask
                  feedback={false}
                  invalid={!!errors.confirmNewPassword}
                  disabled={loading}
                />
                <label htmlFor="new-password-confirm">Confirm New Password</label>
              </FloatLabel>
            </div>
            <div>
              <Button
                label="Change my password"
                onClick={handleChangePasswordSubmit}
                className="pl-10 pr-10 w-full"
                loading={loading}
              />
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
