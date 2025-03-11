
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Target, Calendar, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoalMetric {
  metric_name: string;
  unit: string;
  interval: number;
  target_value: number;
}

interface GoalAction {
  name: string;
  description: string;
  interval: number;
  action_end_date: string;
}

interface HealthGoalsCardProps {
  goalName: string;
  targetDate: string;
  comments: string;
  metrics: GoalMetric[];
  actions: GoalAction[];
}

const HealthGoalsCard = ({
  goalName,
  targetDate,
  comments,
  metrics,
  actions,
}: HealthGoalsCardProps) => {
  // Calculate days remaining until target date
  const today = new Date();
  const target = new Date(targetDate);
  const daysRemaining = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate progress percentage (assuming linear progress from creation to target date)
  // For demo purposes, let's assume the goal was created 30 days before the target date
  const totalDuration = 30;
  const elapsed = totalDuration - daysRemaining;
  const progressPercentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="text-primary h-5 w-5" />
          Current Health Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-lg">{goalName}</h3>
              <Badge 
                variant={daysRemaining > 7 ? "outline" : "destructive"}
                className={daysRemaining > 7 ? "bg-accent" : ""}
              >
                <Calendar className="mr-1 h-3 w-3" />
                {daysRemaining} days left
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{comments}</p>
            <div className="text-xs text-muted-foreground mt-1">
              Target date: {format(new Date(targetDate), "MMMM d, yyyy")}
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
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
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Target Metrics</h4>
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-accent/30 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{metric.metric_name}</div>
                    <Badge variant="outline" className="bg-white">
                      Target: {metric.target_value} {metric.unit}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Measured every {metric.interval} hours
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Action Plan</h4>
            <div className="space-y-2">
              {actions.map((action, index) => (
                <div key={index} className="flex gap-2 border-l-2 border-primary pl-3 py-1">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">{action.name}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                    {action.interval > 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Every {action.interval} hours until {format(new Date(action.action_end_date), "MMM d")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthGoalsCard;
