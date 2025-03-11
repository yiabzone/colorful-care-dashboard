
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import MedicalHistoryCard from "@/components/MedicalHistoryCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MedicalHistoryDetailPage = () => {
  const { medical_reviews } = patientData;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold mb-6">Medical History</h1>
        
        <MedicalHistoryCard 
          medicalRecords={medical_reviews.medical_history}
        />
      </main>
    </div>
  );
};

export default MedicalHistoryDetailPage;
