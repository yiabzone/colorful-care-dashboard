
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface GoalInfoPopoverProps {
  actionName: string;
  targetMetric: string;
  targetValue: number;
}

const GoalInfoPopover = ({ 
  actionName, 
  targetMetric, 
  targetValue 
}: GoalInfoPopoverProps) => {
  return (
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
  );
};

export default GoalInfoPopover;
