
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import HealthMetricsCard from "@/components/HealthMetricsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Activity, Heart, Weight, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const HealthMetricsDetailPage = () => {
  const { profile_data } = patientData;
  const { biometrics } = profile_data.lifestyle;
  
  // Calculate BMI
  const bmi = biometrics.weight / ((biometrics.height / 100) * (biometrics.height / 100));
  const roundedBmi = Math.round(bmi * 10) / 10;
  
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
        
        <h1 className="text-2xl font-bold mb-6">Health Metrics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <HealthMetricsCard 
              healthScore={biometrics.health_score}
              height={biometrics.height}
              weight={biometrics.weight}
            />
          </div>
          
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Detailed Measurements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-accent/30 rounded-lg p-4 flex flex-col items-center">
                    <Weight className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <span className="text-2xl font-bold">{biometrics.weight}</span>
                    <span className="text-xs">kilograms</span>
                  </div>
                  
                  <div className="bg-accent/30 rounded-lg p-4 flex flex-col items-center">
                    <Ruler className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">Height</span>
                    <span className="text-2xl font-bold">{biometrics.height}</span>
                    <span className="text-xs">centimeters</span>
                  </div>
                  
                  <div className="bg-accent/30 rounded-lg p-4 flex flex-col items-center">
                    <Activity className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm text-muted-foreground">BMI</span>
                    <span className="text-2xl font-bold">{roundedBmi}</span>
                    <span className="text-xs">kg/m²</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-2">BMI Categories</h3>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div className={`p-2 rounded-lg ${roundedBmi < 18.5 ? "bg-health-average text-white" : "bg-gray-100"}`}>
                      <div className="font-medium">Underweight</div>
                      <div className="text-xs">Below 18.5</div>
                    </div>
                    <div className={`p-2 rounded-lg ${roundedBmi >= 18.5 && roundedBmi < 25 ? "bg-health-excellent text-white" : "bg-gray-100"}`}>
                      <div className="font-medium">Normal</div>
                      <div className="text-xs">18.5 - 24.9</div>
                    </div>
                    <div className={`p-2 rounded-lg ${roundedBmi >= 25 && roundedBmi < 30 ? "bg-health-average text-white" : "bg-gray-100"}`}>
                      <div className="font-medium">Overweight</div>
                      <div className="text-xs">25 - 29.9</div>
                    </div>
                    <div className={`p-2 rounded-lg ${roundedBmi >= 30 ? "bg-health-poor text-white" : "bg-gray-100"}`}>
                      <div className="font-medium">Obese</div>
                      <div className="text-xs">30 or higher</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Health Score Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    The health score is a comprehensive assessment based on various health factors including vitals, biometrics, and lifestyle factors.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Strengths</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Regular circadian rhythm</li>
                        <li>Blood type well-documented</li>
                        <li>No reported chronic conditions</li>
                      </ul>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Areas for Improvement</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Recent viral infection</li>
                        <li>Weight management goals</li>
                        <li>Regular exercise routine</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthMetricsDetailPage;
