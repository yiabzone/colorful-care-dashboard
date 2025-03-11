import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Clipboard, 
  Stethoscope, 
  ArrowUpRight, 
  AlertCircle, 
  Pill,
  RefreshCw,
  ScrollText
} from "lucide-react";

interface MedicalRecord {
  id: number;
  chief_complaint: string;
  assessment_diagnosis: string;
  status: string;
  management_plan: string;
  lifestyle_advice: string;
  patient_education: string;
  follow_up_plan: string;
  treatment_goal: string;
  health_score: number | null;
  review_status: string;
  report_url: string | null;
  prescriptions: {
    id: number;
    prescription_items: {
      medication_name: string;
      dosage: string;
      frequency: string;
      duration: string;
      route: string;
      instructions: string;
    }[];
  }[];
}

interface MedicalHistoryCardProps {
  medicalRecords: MedicalRecord[];
}

const MedicalHistoryCard = ({ medicalRecords }: MedicalHistoryCardProps) => {
  const [expandedRecordId, setExpandedRecordId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleViewReport = (url: string | null) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      toast({
        title: "Report Not Available",
        description: "The medical report is not available yet.",
        variant: "destructive"
      });
    }
  };

  const toggleRecordExpand = (id: number) => {
    setExpandedRecordId(expandedRecordId === id ? null : id);
  };

  const sortedRecords = [...medicalRecords].sort((a, b) => b.id - a.id);

  return (
    <Card className="hover-lift col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clipboard className="text-primary h-5 w-5" />
          Medical History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Visits</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            {sortedRecords.map((record) => (
              <div 
                key={record.id} 
                className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                  expandedRecordId === record.id ? "shadow-md" : ""
                }`}
              >
                <div 
                  className="p-3 flex justify-between items-start cursor-pointer hover:bg-muted/50" 
                  onClick={() => toggleRecordExpand(record.id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">
                        {record.assessment_diagnosis}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {record.chief_complaint}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge 
                      variant={record.review_status === "approved" ? "default" : "outline"}
                      className={
                        record.review_status === "approved" 
                          ? "bg-health-good" 
                          : "bg-accent"
                      }
                    >
                      {record.review_status === "approved" ? "Approved" : "Pending"}
                    </Badge>
                    <ArrowUpRight 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedRecordId === record.id ? "rotate-180" : ""
                      }`} 
                    />
                  </div>
                </div>

                {expandedRecordId === record.id && (
                  <div className="p-3 pt-0 border-t mt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-2">
                        {record.health_score !== null && (
                          <div className="flex gap-2 items-center">
                            <AlertCircle className="h-4 w-4 text-primary" />
                            <div>
                              <div className="text-xs font-medium">Health Score</div>
                              <div className="text-sm">{record.health_score}/100</div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex gap-2 items-start">
                          <ScrollText className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <div className="text-xs font-medium">Management Plan</div>
                            <div className="text-sm">{record.management_plan}</div>
                          </div>
                        </div>
                        
                        {record.prescriptions.length > 0 && (
                          <div className="flex gap-2 items-start">
                            <Pill className="h-4 w-4 text-primary mt-0.5" />
                            <div>
                              <div className="text-xs font-medium">Medications</div>
                              <ul className="text-sm list-disc pl-4">
                                {record.prescriptions.flatMap(prescription => 
                                  prescription.prescription_items.map((item, i) => (
                                    <li key={i}>
                                      {item.medication_name} {item.dosage} - {item.frequency}
                                    </li>
                                  ))
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex gap-2 items-start">
                          <RefreshCw className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <div className="text-xs font-medium">Follow-up Plan</div>
                            <div className="text-sm">{record.follow_up_plan}</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 items-start">
                          <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <div className="text-xs font-medium">Patient Education</div>
                            <div className="text-sm">{record.patient_education}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewReport(record.report_url)}
                        disabled={!record.report_url}
                      >
                        View Report
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              {sortedRecords
                .filter(record => record.prescriptions.length > 0)
                .map((record) => (
                  <div key={record.id} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-sm">
                        Prescription for {record.assessment_diagnosis}
                      </h4>
                    </div>
                    
                    {record.prescriptions.map((prescription) => (
                      <div key={prescription.id} className="space-y-2 ml-6">
                        {prescription.prescription_items.map((item, i) => (
                          <div key={i} className="bg-accent/30 p-2 rounded-lg">
                            <div className="font-medium text-sm">{item.medication_name} {item.dosage}</div>
                            <div className="text-xs">
                              <span className="font-medium">Frequency:</span> {item.frequency}
                            </div>
                            <div className="text-xs">
                              <span className="font-medium">Duration:</span> {item.duration}
                            </div>
                            <div className="text-xs">
                              <span className="font-medium">Instructions:</span> {item.instructions}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                
              {sortedRecords.filter(record => record.prescriptions.length > 0).length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No active prescriptions found
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicalHistoryCard;
