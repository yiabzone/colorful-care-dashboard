
import { Card, CardContent } from "@/components/ui/card";
import { prepareCombinedData, calculateProgressMetrics } from "./time-series/TimeSeriesUtils";
import MetricsProgressSummary from "./time-series/MetricsProgressSummary";
import CorrelationChart from "./time-series/CorrelationChart";
import KeyInsights from "./time-series/KeyInsights";
import GoalInfoPopover from "./time-series/GoalInfoPopover";

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
  const combinedData = prepareCombinedData(metricRecords, actionRecords);
  
  const {
    currentValue,
    initialValue,
    progressPercentage,
    completionRate
  } = calculateProgressMetrics(metricRecords, actionRecords, targetValue);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div className="flex-1">
            <MetricsProgressSummary
              goalName={goalName}
              targetMetric={targetMetric}
              comments={comments}
              currentValue={currentValue}
              targetValue={targetValue}
              completionRate={completionRate}
              progressPercentage={progressPercentage}
              targetDate={targetDate}
            />
          </div>
          <GoalInfoPopover
            actionName={actionName}
            targetMetric={targetMetric}
            targetValue={targetValue}
          />
        </div>

        <CorrelationChart
          combinedData={combinedData}
          targetValue={targetValue}
          actionName={actionName}
          completionRate={completionRate}
        />

        <KeyInsights
          initialValue={initialValue}
          currentValue={currentValue}
          initialDate={metricRecords[0]?.recorded_at}
          completionRate={completionRate}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedTimeSeriesVisual;
