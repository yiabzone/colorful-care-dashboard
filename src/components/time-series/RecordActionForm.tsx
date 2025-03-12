
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { CheckCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { recordAction, ActionRecord } from "./TimeSeriesUtils";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Action name is required"),
  status: z.string().min(1, "Status is required"),
  value: z.string().optional().refine(
    (val) => !val || !isNaN(parseFloat(val)), {
      message: "Value must be a number",
    }
  ),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const RecordActionForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "completed",
      value: "",
      comments: ""
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Create the action data object, ensuring name is included
      const actionData: ActionRecord = {
        name: data.name, // This line ensures 'name' is provided
        status: data.status,
        value: data.value ? parseFloat(data.value) : undefined,
        comments: data.comments,
      };
      
      await recordAction(actionData);
      
      form.reset({
        name: "",
        status: "completed",
        value: "",
        comments: ""
      });
      
      toast.success("Action recorded successfully");
    } catch (error) {
      console.error("Failed to record action", error);
      toast.error("Failed to record action");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Record Health Action
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action Name</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily Walking">Daily Walking</SelectItem>
                        <SelectItem value="Take Medication">Take Medication</SelectItem>
                        <SelectItem value="Morning Exercise">Morning Exercise</SelectItem>
                        <SelectItem value="Drink Water">Drink Water</SelectItem>
                        <SelectItem value="Meditation">Meditation</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="missed">Missed</SelectItem>
                        <SelectItem value="partial">Partially Completed</SelectItem>
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
                  <FormLabel>Value (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 5000 steps" />
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
              {isLoading ? "Recording..." : "Record Action"}
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RecordActionForm;
