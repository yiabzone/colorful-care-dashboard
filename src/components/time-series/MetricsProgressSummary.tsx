
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface MetricsProgressSummaryProps {
  goalName: string;
  targetMetric: string;
  comments: string;
  currentValue: number;
  targetValue: number;
  completionRate: number;
  progressPercentage: number;
  targetDate: string;
}

const MetricsProgressSummary = ({
  goalName,
  targetMetric,
  comments,
  currentValue,
  targetValue,
  completionRate,
  progressPercentage,
  targetDate,
}: MetricsProgressSummaryProps) => {
  return (
    <>
      <div className="mb-5 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="text-primary h-5 w-5" />
            <h3 className="font-bold text-lg">{goalName}</h3>
            <Badge variant="outline" className="bg-accent">
              {targetMetric}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{comments}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-accent/20 p-3 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Current</div>
          <div className="text-2xl font-bold">{currentValue} kg</div>
        </div>
        <div className="bg-accent/20 p-3 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Target</div>
          <div className="text-2xl font-bold">{targetValue} kg</div>
        </div>
        <div className="bg-accent/20 p-3 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Activity Rate</div>
          <div className="text-2xl font-bold">{Math.round(completionRate)}%</div>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-baseline mb-2">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Progress</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Target Date: {format(parseISO(targetDate), "MMM d, yyyy")}
          </span>
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
        <div className="text-xs text-right mt-1">
          {Math.round(progressPercentage)}% complete
        </div>
      </div>
    </>
  );
};

export default MetricsProgressSummary;
