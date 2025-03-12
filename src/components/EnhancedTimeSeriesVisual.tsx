
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button"; // Added the missing Button import
import { format, parseISO } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, ComposedChart, Bar } from "recharts";
import { TrendingUp, Target, Activity, Calendar, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

interface EnhancedTimeSeriesVisualProps {
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

const EnhancedTimeSeriesVisual = ({
  goalName,
  targetDate,
  comments,
  targetMetric,
  targetValue,
  metricRecords,
  actionName,
  actionDescription,
  actionRecords,
}: EnhancedTimeSeriesVisualProps) => {
  // Process and combine data for visualization
  const combinedData = metricRecords.map(record => {
    const recordDate = format(parseISO(record.recorded_at), "MMM d");
    
    // Find corresponding action for this date if it exists
    const matchingAction = actionRecords.find(
      action => format(parseISO(action.performed_at), "MMM d") === recordDate
    );
    
    return {
      date: recordDate,
      fullDate: record.recorded_at,
      weight: record.recorded_value,
      weightNotes: record.notes,
      steps: matchingAction?.value || 0,
      actionCompleted: matchingAction?.result === "completed",
      actionNotes: matchingAction?.notes || "",
    };
  });

  // Add any missing action records that don't have corresponding weight records
  actionRecords.forEach(action => {
    const actionDate = format(parseISO(action.performed_at), "MMM d");
    const exists = combinedData.some(item => item.date === actionDate);
    
    if (!exists) {
      combinedData.push({
        date: actionDate,
        fullDate: action.performed_at,
        weight: null, // No weight recorded on this date
        weightNotes: "",
        steps: action.value || 0,
        actionCompleted: action.result === "completed",
        actionNotes: action.notes || "",
      });
    }
  });

  // Sort combined data by date
  combinedData.sort((a, b) => 
    new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
  );

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

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md text-sm">
          <p className="font-semibold">{label}</p>
          {payload[0].value !== null && (
            <div className="mt-1">
              <p className="text-primary">{`Weight: ${payload[0].value} kg`}</p>
              {payload[0].payload.weightNotes && (
                <p className="text-muted-foreground text-xs">{payload[0].payload.weightNotes}</p>
              )}
            </div>
          )}
          {payload[1] && payload[1].value > 0 && (
            <div className="mt-1 border-t pt-1">
              <p className={payload[1].payload.actionCompleted ? "text-health-good" : "text-health-poor"}>
                {`Steps: ${payload[1].value}`}
                {payload[1].payload.actionCompleted ? " ✓" : " ✗"}
              </p>
              {payload[1].payload.actionNotes && (
                <p className="text-muted-foreground text-xs">{payload[1].payload.actionNotes}</p>
              )}
            </div>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="pt-6">
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
                <span className="sr-only">Goal info</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">About This Visualization</h4>
                <p className="text-sm text-muted-foreground">
                  This chart shows the relationship between your daily activity ({actionName}) 
                  and your progress toward your {targetMetric.toLowerCase()} goal of {targetValue} kg.
                </p>
                <div className="flex items-center mt-2 text-xs">
                  <span className="h-2 w-2 bg-primary rounded-full mr-1"></span>
                  <span className="mr-3">Weight</span>
                  <span className="h-2 w-2 bg-health-good rounded-full mr-1"></span>
                  <span>Steps (when completed)</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
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

        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {actionName} & {targetMetric} Correlation
              </span>
            </div>
            <Badge 
              variant="outline"
              className={cn(
                completionRate >= 75 
                  ? "bg-health-good" 
                  : completionRate >= 50 
                    ? "bg-health-average" 
                    : "bg-health-poor",
                completionRate >= 50 ? "text-white" : ""
              )}
            >
              {actionName} completion: {Math.round(completionRate)}%
            </Badge>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={combinedData} 
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  width={30}
                  label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 10 }, offset: 10 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 'dataMax + 1000']}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  width={35}
                  label={{ value: 'Steps', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 10 }, offset: 0 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine yAxisId="left" y={targetValue} stroke="#8884d8" strokeDasharray="3 3" label={{ value: 'Target', position: 'left', style: { fill: '#8884d8', fontSize: 10 } }} />
                <Line 
                  type="monotone" 
                  yAxisId="left"
                  dataKey="weight" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  activeDot={{ fill: 'hsl(var(--primary))', r: 6, strokeWidth: 2 }}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="steps" 
                  fill="hsl(var(--health-average))" // Changed from function to string
                  fillOpacity={0.7}
                  radius={[4, 4, 0, 0]}
                  // Using the stroke property to indicate completion status instead of dynamic fill
                  stroke={(entry) => entry.actionCompleted ? "hsl(var(--health-good))" : "hsl(var(--health-poor))"}
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t text-sm">
          <div className="flex items-center gap-1 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Key Insights</span>
          </div>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <span className="text-muted-foreground">Initial weight:</span>{" "}
              <span className="font-medium">{initialValue} kg</span> on {format(parseISO(metricRecords[0]?.recorded_at || new Date().toISOString()), "MMM d, yyyy")}
            </li>
            <li>
              <span className="text-muted-foreground">Current progress:</span>{" "}
              <span className="font-medium">
                {(initialValue - currentValue).toFixed(1)} kg lost
              </span>{" "}
              ({Math.abs(((initialValue - currentValue) / initialValue) * 100).toFixed(1)}% change)
            </li>
            <li>
              <span className="text-muted-foreground">Activity correlation:</span>{" "}
              <span className="font-medium">
                {completionRate > 50 && currentValue < initialValue 
                  ? "Positive correlation between exercise and weight loss" 
                  : "More consistent exercise may help accelerate progress"}
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTimeSeriesVisual;
