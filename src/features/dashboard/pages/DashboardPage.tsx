import { useEffect, useState } from 'react';
import { getMe } from '../../../common/api/userService';
import type { UserResponse } from '../../../common/interfaces/userInterfaces';

export const DashboardPage = () => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();

        if (response.success && response.data) {
          setUser(response.data);
        } else {
          console.error('Failed to fetch user:', response.message);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? <>Welcome to the dashboard, {user.name}!</> : <>Loading user information...</>}
    </div>
  );
};
