
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Activity, User, Target, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Index = () => {
  const { profile_data, health_goal, time_series, medical_reviews } = patientData;
  
  // Extract appropriate data for each component
  const { biometrics } = profile_data.lifestyle;
  const { demographics } = profile_data;
  
  // Get latest medical review
  const latestReview = medical_reviews.medical_history.length > 0 
    ? [...medical_reviews.medical_history].sort((a, b) => b.id - a.id)[0]
    : null;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Profile Summary Card */}
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <User className="text-primary h-5 w-5" />
                Patient Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{demographics.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {demographics.age} years • {demographics.gender}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile">
                    View Full Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Health Metrics Card */}
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Activity className="text-primary h-5 w-5" />
                Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">Health Score</div>
                    <div className="text-sm font-semibold">{biometrics.health_score}/100</div>
                  </div>
                  <Progress
                    value={biometrics.health_score}
                    className="h-2"
                    indicatorClassName={cn(
                      "animate-progress-fill",
                      biometrics.health_score >= 80 ? "bg-health-excellent" : 
                      biometrics.health_score >= 60 ? "bg-health-good" : 
                      biometrics.health_score >= 40 ? "bg-health-average" : "bg-health-poor"
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">Height</div>
                    <div className="text-base font-semibold">{biometrics.height} cm</div>
                  </div>
                  <div className="border rounded-lg p-2">
                    <div className="text-xs text-muted-foreground">Weight</div>
                    <div className="text-base font-semibold">{biometrics.weight} kg</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/health-metrics">
                    View Health Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Health Goals Card */}
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Target className="text-primary h-5 w-5" />
                Health Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-base mb-1">{time_series.goal_details.goal_name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{time_series.goal_details.comments}</p>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Current: {time_series.metrics.Weight.records[time_series.metrics.Weight.records.length-1].recorded_value} kg</span>
                      <span>Target: {time_series.goal_details.target_value} kg</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/health-goals">
                    View All Goals <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Medical History Card */}
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="text-primary h-5 w-5" />
                Medical History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestReview && (
                  <div>
                    <div className="text-xs text-muted-foreground">Latest Assessment</div>
                    <div className="font-semibold text-base truncate">{latestReview.assessment_diagnosis}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Status: <span className="capitalize">{latestReview.status}</span>
                    </div>
                  </div>
                )}
                
                <div className="text-sm">
                  {medical_reviews.medical_history.length} medical records available
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/medical-history">
                    View Medical History <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
