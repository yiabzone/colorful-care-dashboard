
import { Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";

interface KeyInsightsProps {
  initialValue: number;
  currentValue: number;
  initialDate: string;
  completionRate: number;
}

const KeyInsights = ({
  initialValue,
  currentValue,
  initialDate,
  completionRate,
}: KeyInsightsProps) => {
  return (
    <div className="mt-5 pt-4 border-t text-sm">
      <div className="flex items-center gap-1 mb-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Key Insights</span>
      </div>
      <ul className="space-y-2 list-disc pl-5">
        <li>
          <span className="text-muted-foreground">Initial weight:</span>{" "}
          <span className="font-medium">{initialValue} kg</span> on {format(parseISO(initialDate), "MMM d, yyyy")}
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
  );
};

export default KeyInsights;
