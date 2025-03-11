
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeightRecord {
  recorded_at: string;
  recorded_value: number;
  unit: string;
  notes: string;
}

interface ActivityRecord {
  performed_at: string;
  result: string;
  value: number | null;
  unit: string;
  notes: string;
}

interface TimeSeriesGoalCardProps {
  goalName: string;
  targetDate: string;
  comments: string;
  targetMetric: string;
  targetValue: number;
  metricRecords: WeightRecord[];
  actionName: string;
  actionDescription: string;
  actionRecords: ActivityRecord[];
}

const TimeSeriesGoalCard = ({
  goalName,
  targetDate,
  comments,
  targetMetric,
  targetValue,
  metricRecords,
  actionName,
  actionDescription,
  actionRecords,
}: TimeSeriesGoalCardProps) => {
  // Format data for charts
  const weightData = metricRecords.map(record => ({
    date: format(parseISO(record.recorded_at), "MMM d"),
    value: record.recorded_value,
    fullDate: record.recorded_at,
    notes: record.notes
  }));

  // Calculate current value and progress
  const currentValue = metricRecords.length > 0 ? metricRecords[metricRecords.length - 1].recorded_value : 0;
  const initialValue = metricRecords.length > 0 ? metricRecords[0].recorded_value : 0;
  const totalChange = initialValue - targetValue;
  const currentChange = initialValue - currentValue;
  const progressPercentage = totalChange !== 0 ? (currentChange / totalChange) * 100 : 0;

  // Calculate activity completion rate
  const completedActivities = actionRecords.filter(record => record.result === "completed").length;
  const completionRate = actionRecords.length > 0 
    ? (completedActivities / actionRecords.length) * 100 
    : 0;

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="text-primary h-5 w-5" />
          Progress Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-bold text-lg">{goalName}</h3>
              <Badge variant="outline" className="bg-accent">
                {targetMetric}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{comments}</p>
            
            <div className="mt-4 mb-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-muted-foreground">Current: </span>
                  <span className="font-semibold">{currentValue} kg</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Target: </span>
                  <span className="font-semibold">{targetValue} kg</span>
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
                  <span>By {format(parseISO(targetDate), "MMM d, yyyy")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3">Weight Trend</h4>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                  />
                  <YAxis 
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    width={30}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} kg`, 'Weight']}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    activeDot={{ fill: 'hsl(var(--primary))', r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold">{actionName}</h4>
              <Badge 
                variant={completionRate >= 66 ? "default" : "outline"}
                className={completionRate >= 66 ? "bg-health-good" : "bg-accent"}
              >
                {Math.round(completionRate)}% completed
              </Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">{actionDescription}</p>
            
            <div className="space-y-2">
              {actionRecords.map((record, index) => (
                <div key={index} className="flex gap-2 items-center p-2 bg-accent/30 rounded-lg">
                  {record.result === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-health-good shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-health-poor shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <div className="text-sm font-medium">
                        {format(parseISO(record.performed_at), "MMM d")}
                      </div>
                      {record.value && (
                        <div className="text-xs font-medium">
                          {record.value} {record.unit}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {record.notes}
                    </div>
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

export default TimeSeriesGoalCard;
