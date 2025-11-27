import { useAuth } from '../../../hooks/useAuth';
import { RecentExams } from '../components/RecentExams';
import { RecentSurveys } from '../components/RecentSurveys';
export const DashboardPage = () => {
  const { user } = useAuth();
  return (
    
    <div>
     {/* {user ?  */}
        <div className="flex flex-column md:flex-row h-screen surface-ground">
        <div className="flex flex-column w-full md:w-9/12 p-4 overflow-auto">
          <h2 className="mb-4 text-center md:text-left">
            Welcome Back, {user?.name} 
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
