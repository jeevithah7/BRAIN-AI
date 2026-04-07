import HealthOverview from '../components/HealthOverview';
import NutritionInsight from '../components/NutritionInsight';
import AnatomicalViewer from '../components/AnatomicalViewer';
import PatientCard from '../components/PatientCard';
import FocusOnCard from '../components/FocusOnCard';
import ReduceCard from '../components/ReduceCard';
import EmergencyServices from '../components/EmergencyServices';

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 flex-grow pb-8 animate-in fade-in duration-500">
      {/* Center Area */}
      <div className="flex-grow flex flex-col gap-6 w-full lg:w-[65%]">
        <div className="flex flex-col md:flex-row gap-8 flex-grow">
            <div className="flex-[0.55] w-full flex flex-col gap-6">
              <HealthOverview />
              <NutritionInsight />
            </div>
            
            <div className="w-full md:w-[45%] flex flex-col h-full min-h-[500px]">
              <AnatomicalViewer />
            </div>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="w-full lg:w-[320px] xl:w-[350px] flex flex-col gap-6 shrink-0">
          <PatientCard />
          <FocusOnCard />
          <ReduceCard />
          <EmergencyServices />
      </div>
    </div>
  );
}
