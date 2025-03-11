
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import ProfileSummaryCard from "@/components/ProfileSummaryCard";
import HealthMetricsCard from "@/components/HealthMetricsCard";
import HealthGoalsCard from "@/components/HealthGoalsCard";
import TimeSeriesGoalCard from "@/components/TimeSeriesGoalCard";
import MedicalHistoryCard from "@/components/MedicalHistoryCard";

const Index = () => {
  const { profile_data, health_goal, time_series, medical_reviews } = patientData;
  
  // Extract appropriate data for each component
  const primaryDoctor = profile_data.clinical_status.care_team.primary_doctor;
  const { biometrics } = profile_data.lifestyle;
  const { demographics } = profile_data;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First column */}
          <div className="space-y-6">
            <ProfileSummaryCard 
              name={demographics.name}
              age={demographics.age}
              gender={demographics.gender}
              dateOfBirth={demographics.date_of_birth}
              countryCode={demographics.location.country_code}
              doctorName={primaryDoctor.name}
              doctorSpecialty={primaryDoctor.specialty}
              doctorClinic={primaryDoctor.clinic_name}
              doctorPhone={primaryDoctor.phone_number}
            />
            
            <HealthMetricsCard 
              healthScore={biometrics.health_score}
              height={biometrics.height}
              weight={biometrics.weight}
            />
          </div>
          
          {/* Second column */}
          <div className="space-y-6">
            <HealthGoalsCard 
              goalName={health_goal.goal_name}
              targetDate={health_goal.target_date}
              comments={health_goal.comments}
              metrics={health_goal.metrics}
              actions={health_goal.actions}
            />
            
            <TimeSeriesGoalCard 
              goalName={time_series.goal_details.goal_name}
              targetDate={time_series.goal_details.target_date}
              comments={time_series.goal_details.comments}
              targetMetric={time_series.goal_details.target_metric}
              targetValue={time_series.goal_details.target_value}
              metricRecords={time_series.metrics.Weight.records}
              actionName={time_series.actions["Daily Walking"].details.name}
              actionDescription={time_series.actions["Daily Walking"].details.description}
              actionRecords={time_series.actions["Daily Walking"].records}
            />
          </div>
          
          {/* Third column (spans both 1st and 2nd columns on mobile) */}
          <MedicalHistoryCard 
            medicalRecords={medical_reviews.medical_history}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
