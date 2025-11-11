import { useEffect, useState } from 'react';
import { getMe } from '../../../common/api/userService';
import type { UserResponse } from '../../../common/interfaces/userInterfaces';
import { RecentExams } from '../components/RecentExams';
import { RecentSurveys } from '../components/RecentSurveys';
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
     {/* {user ?  */}
        <div className="flex flex-column md:flex-row h-screen surface-ground">
        <div className="flex flex-column w-full md:w-9/12 p-4 overflow-auto">
          <h2 className="mb-4 text-center md:text-left">
            Welcome Back Loba AWuu, {user?.name} 
          </h2>

          <div className="flex flex-column gap-4">
            <RecentExams />
            <RecentSurveys />
          </div>
        </div>
      </div>
      {/* : <> No tienes acceso pelaná </>}  */}
    </div>
  );
};
