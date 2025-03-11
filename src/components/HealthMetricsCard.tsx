
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Droplets, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetricsCardProps {
  healthScore: number;
  height: number;
  weight: number;
}

const HealthMetricsCard = ({ healthScore, height, weight }: HealthMetricsCardProps) => {
  // Calculate BMI
  const bmi = weight / ((height / 100) * (height / 100));
  const roundedBmi = Math.round(bmi * 10) / 10;

  // Determine BMI category
  let bmiCategory = "";
  let bmiColor = "";
  if (roundedBmi < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-health-average";
  } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
    bmiCategory = "Normal";
    bmiColor = "text-health-excellent";
  } else if (roundedBmi >= 25 && roundedBmi < 30) {
    bmiCategory = "Overweight";
    bmiColor = "text-health-average";
  } else {
    bmiCategory = "Obese";
    bmiColor = "text-health-poor";
  }

  // Determine health score color
  let healthScoreColor = "bg-health-poor";
  if (healthScore >= 80) {
    healthScoreColor = "bg-health-excellent";
  } else if (healthScore >= 60) {
    healthScoreColor = "bg-health-good";
  } else if (healthScore >= 40) {
    healthScoreColor = "bg-health-average";
  }

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Heart className="text-primary h-5 w-5" />
          Health Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Health Score</div>
              <div className="text-sm font-semibold">{healthScore}/100</div>
            </div>
            <Progress
              value={healthScore}
              className="h-2"
              indicatorClassName={cn("animate-progress-fill", healthScoreColor)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-accent bg-opacity-40 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Activity className="h-4 w-4" />
                <span className="text-xs font-medium">BMI</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-xl font-bold">{roundedBmi}</span>
                <span className={`ml-1 text-xs ${bmiColor}`}>{bmiCategory}</span>
              </div>
            </div>

            <div className="bg-accent bg-opacity-40 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1 text-primary">
                <Droplets className="h-4 w-4" />
                <span className="text-xs font-medium">Blood Type</span>
              </div>
              <div>
                <span className="text-xl font-bold">O+</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Height</div>
              <div className="text-lg font-semibold">{height} cm</div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Weight</div>
              <div className="text-lg font-semibold">{weight} kg</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthMetricsCard;
