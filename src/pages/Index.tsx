
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, Target, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

const Index = () => {
  const { profile_data, health_goal, time_series, medical_reviews } = patientData;
  
  // Get latest weight record
  const latestWeightRecord = time_series.metrics.Weight.records[time_series.metrics.Weight.records.length-1];
  const initialWeightRecord = time_series.metrics.Weight.records[0];
  
  // Calculate progress
  const totalChange = initialWeightRecord.recorded_value - time_series.goal_details.target_value;
  const currentChange = initialWeightRecord.recorded_value - latestWeightRecord.recorded_value;
  const progressPercentage = totalChange !== 0 ? (currentChange / totalChange) * 100 : 0;
  
  // Get latest medical review
  const latestReview = medical_reviews.medical_history.length > 0 
    ? [...medical_reviews.medical_history].sort((a, b) => b.id - a.id)[0]
    : null;
  
  // Format data for the small chart
  const weightData = time_series.metrics.Weight.records.map(record => ({
    date: format(parseISO(record.recorded_at), "MMM d"),
    value: record.recorded_value
  }));
  
  // Calculate activity completion rate
  const actionRecords = time_series.actions["Daily Walking"].records;
  const completedActivities = actionRecords.filter(record => record.result === "completed").length;
  const completionRate = actionRecords.length > 0 
    ? (completedActivities / actionRecords.length) * 100 
    : 0;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-2">Health Progress Dashboard</h1>
        <p className="text-muted-foreground mb-6">Track your health goals and see how your actions affect your progress</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Goal Progress Card */}
          <Card className="md:col-span-2 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="text-primary h-5 w-5" />
                Current Goal: {time_series.goal_details.goal_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{time_series.goal_details.comments}</p>
                
                <div className="mt-4 mb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-semibold">{latestWeightRecord.recorded_value} kg</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Target: </span>
                      <span className="font-semibold">{time_series.goal_details.target_value} kg</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={progressPercentage} 
                      className="h-2"
                      indicatorClassName={cn(
                        "animate-progress-fill",
                        progressPercentage < 25 
                          ? "bg-health-poor" 
                          : progressPercentage < 50 
                            ? "bg-health-average" 
                            : "bg-health-good"
                      )}
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>{Math.round(progressPercentage)}% complete</span>
                      <span>By {format(parseISO(time_series.goal_details.target_date), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <div className="flex-1 bg-accent/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Initial Weight</div>
                    <div className="text-lg font-semibold">{initialWeightRecord.recorded_value} kg</div>
                    <div className="text-xs text-muted-foreground">
                      on {format(parseISO(initialWeightRecord.recorded_at), "MMM d, yyyy")}
                    </div>
                  </div>
                  <div className="flex-1 bg-accent/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Weight Loss</div>
                    <div className="text-lg font-semibold">{(initialWeightRecord.recorded_value - latestWeightRecord.recorded_value).toFixed(1)} kg</div>
                    <div className="text-xs text-muted-foreground">
                      {Math.abs(((initialWeightRecord.recorded_value - latestWeightRecord.recorded_value) / initialWeightRecord.recorded_value) * 100).toFixed(1)}% change
                    </div>
                  </div>
                  <div className="flex-1 bg-accent/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Activity Rate</div>
                    <div className="text-lg font-semibold">{Math.round(completionRate)}%</div>
                    <div className="text-xs text-muted-foreground">
                      {completedActivities} of {actionRecords.length} completed
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" asChild>
                  <Link to="/health-goals">
                    View Detailed Progress <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Basic Profile Info */}
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="text-primary h-5 w-5" />
                Health Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground">Patient</div>
                  <div className="text-base font-semibold">{profile_data.demographics.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {profile_data.demographics.age} years • {profile_data.demographics.gender}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Health Score</div>
                    <div className="text-sm font-semibold">{profile_data.lifestyle.biometrics.health_score}/100</div>
                  </div>
                  <Progress
                    value={profile_data.lifestyle.biometrics.health_score}
                    className="h-2"
                    indicatorClassName={cn(
                      "animate-progress-fill",
                      profile_data.lifestyle.biometrics.health_score >= 80 ? "bg-health-excellent" : 
                      profile_data.lifestyle.biometrics.health_score >= 60 ? "bg-health-good" : 
                      profile_data.lifestyle.biometrics.health_score >= 40 ? "bg-health-average" : "bg-health-poor"
                    )}
                  />
                </div>
                
                {latestReview && (
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground">Latest Assessment</div>
                    <div className="font-semibold text-base truncate">{latestReview.assessment_diagnosis}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Status: <span className="capitalize">{latestReview.status}</span>
                    </div>
                    <div className="mt-3 text-center">
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link to="/medical-history">
                          <FileText className="mr-1 h-3 w-3" />
                          Medical Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
