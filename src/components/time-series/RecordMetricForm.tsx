
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recordMetric, MetricRecord } from "./TimeSeriesUtils";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";

const formSchema = z.object({
  metric_name: z.string().min(1, "Metric name is required"),
  value: z.string().min(1, "Value is required").refine((val) => !isNaN(parseFloat(val)), {
    message: "Value must be a number",
  }),
  status: z.string().optional(),
  comments: z.string().optional(),
  measurement_type: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RecordMetricForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metric_name: "",
      value: "",
      status: "on_track",
      comments: "",
      measurement_type: "manual"
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Create the metric data object, ensuring metric_name is included
      const metricData: MetricRecord = {
        metric_name: data.metric_name, // This line ensures 'metric_name' is provided
        value: parseFloat(data.value),
        status: data.status,
        comments: data.comments,
        measurement_type: data.measurement_type
      };
      
      await recordMetric(metricData);
      
      form.reset({
        metric_name: "",
        value: "",
        status: "on_track",
        comments: "",
        measurement_type: "manual"
      });
      
      toast.success("Metric recorded successfully");
    } catch (error) {
      console.error("Failed to record metric", error);
      toast.error("Failed to record metric");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Record Health Metric
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="metric_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metric Name</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weight">Weight</SelectItem>
                        <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                        <SelectItem value="Heart Rate">Heart Rate</SelectItem>
                        <SelectItem value="Steps">Steps</SelectItem>
                        <SelectItem value="Sleep Duration">Sleep Duration</SelectItem>
                        <SelectItem value="Daily Walking Duration">Daily Walking Duration</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 120" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on_track">On Track</SelectItem>
                        <SelectItem value="at_risk">At Risk</SelectItem>
                        <SelectItem value="off_track">Off Track</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add any additional notes here" 
                      className="resize-none"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Recording..." : "Record Metric"}
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecordMetricForm;
