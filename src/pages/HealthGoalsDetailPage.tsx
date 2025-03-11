
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import HealthGoalsCard from "@/components/HealthGoalsCard";
import TimeSeriesGoalCard from "@/components/TimeSeriesGoalCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HealthGoalsDetailPage = () => {
  const { health_goal, time_series } = patientData;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Health Goals</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </main>
    </div>
  );
};

export default HealthGoalsDetailPage;
