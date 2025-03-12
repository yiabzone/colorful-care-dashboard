
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  ReferenceLine, CartesianGrid, ComposedChart, Bar 
} from "recharts";
import { format, parseISO } from "date-fns";

interface ChartDataPoint {
  date: string;
  fullDate: string;
  weight: number | null;
  weightNotes: string;
  steps: number;
  actionCompleted: boolean;
  actionNotes: string;
}

interface CorrelationChartProps {
  combinedData: ChartDataPoint[];
  targetValue: number;
  actionName: string;
  completionRate: number;
}

const CorrelationChart = ({
  combinedData,
  targetValue,
  actionName,
  completionRate,
}: CorrelationChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border p-3 rounded-md shadow-md text-sm">
          <p className="font-semibold">{label}</p>
          {payload[0]?.value !== null && (
            <div className="mt-1">
              <p className="text-primary">{`Weight: ${payload[0]?.value} kg`}</p>
              {payload[0]?.payload.weightNotes && (
                <p className="text-muted-foreground text-xs">{payload[0].payload.weightNotes}</p>
              )}
            </div>
          )}
          {payload[1] && payload[1]?.value > 0 && (
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

  // Custom shape renderer for the bar
  const CustomBar = (props: any) => {
    const { x, y, width, height, payload } = props;
    const strokeColor = payload.actionCompleted 
      ? "hsl(var(--health-good))" 
      : "hsl(var(--health-poor))";
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="hsl(var(--health-average))"
          fillOpacity={0.7}
          stroke={strokeColor}
          strokeWidth={2}
          rx={4}
          ry={4}
        />
      </g>
    );
  };

  return (
    <div className="mt-6 pt-4 border-t">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {actionName} & Weight Correlation
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
              fill="hsl(var(--health-average))"
              fillOpacity={0.7}
              radius={[4, 4, 0, 0]}
              name="Steps"
              isAnimationActive={true}
              shape={CustomBar}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CorrelationChart;
