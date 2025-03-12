
import { format, parseISO } from "date-fns";

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

export interface ChartDataPoint {
  date: string;
  fullDate: string;
  weight: number | null;
  weightNotes: string;
  steps: number;
  actionCompleted: boolean;
  actionNotes: string;
}

export interface MetricRecord {
  metric_name: string; // This is required
  value: number;
  status?: string;
  comments?: string;
  measurement_type?: string;
}

export interface ActionRecord {
  name: string; // This is required
  status: string;
  value?: number;
  comments?: string;
}

export function prepareCombinedData(
  metricRecords: WeightRecord[],
  actionRecords: ActivityRecord[]
): ChartDataPoint[] {
  const combinedData: ChartDataPoint[] = metricRecords.map(record => {
    const recordDate = format(parseISO(record.recorded_at), "MMM d");
    
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

  actionRecords.forEach(action => {
    const actionDate = format(parseISO(action.performed_at), "MMM d");
    const exists = combinedData.some(item => item.date === actionDate);
    
    if (!exists) {
      combinedData.push({
        date: actionDate,
        fullDate: action.performed_at,
        weight: null,
        weightNotes: "",
        steps: action.value || 0,
        actionCompleted: action.result === "completed",
        actionNotes: action.notes || "",
      });
    }
  });

  combinedData.sort((a, b) => 
    new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime()
  );

  return combinedData;
}

export function calculateProgressMetrics(
  metricRecords: WeightRecord[],
  actionRecords: ActivityRecord[],
  targetValue: number
) {
  const currentValue = metricRecords.length > 0 ? metricRecords[metricRecords.length - 1].recorded_value : 0;
  const initialValue = metricRecords.length > 0 ? metricRecords[0].recorded_value : 0;
  const totalChange = initialValue - targetValue;
  const currentChange = initialValue - currentValue;
  const progressPercentage = totalChange !== 0 ? (currentChange / totalChange) * 100 : 0;

  const completedActivities = actionRecords.filter(record => record.result === "completed").length;
  const completionRate = actionRecords.length > 0 
    ? (completedActivities / actionRecords.length) * 100 
    : 0;

  return {
    currentValue,
    initialValue,
    totalChange,
    currentChange,
    progressPercentage,
    completionRate
  };
}

export function recordMetric(metric: MetricRecord): Promise<boolean> {
  console.log("Recording metric:", metric);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
}

export function recordAction(action: ActionRecord): Promise<boolean> {
  console.log("Recording action:", action);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
}
