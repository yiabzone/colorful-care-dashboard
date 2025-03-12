
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedTimeSeriesVisual from "@/components/EnhancedTimeSeriesVisual";
import TimeSeriesGoalCard from "@/components/TimeSeriesGoalCard";

const HealthGoalsDetailPage = () => {
  const { time_series } = patientData;
  
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
        
        <h1 className="text-2xl font-bold mb-4">Health Progress Details</h1>
        <p className="text-muted-foreground mb-6">
          Track how your daily activities affect your health metrics over time
        </p>
        
        <div className="space-y-6">
          <EnhancedTimeSeriesVisual 
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
