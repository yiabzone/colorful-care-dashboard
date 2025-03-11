
import { patientData } from "@/data/patientData";
import AppHeader from "@/components/AppHeader";
import ProfileSummaryCard from "@/components/ProfileSummaryCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileDetailPage = () => {
  const { profile_data } = patientData;
  
  // Extract appropriate data
  const primaryDoctor = profile_data.clinical_status.care_team.primary_doctor;
  const { demographics } = profile_data;
  
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
        
        <h1 className="text-2xl font-bold mb-6">Patient Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileSummaryCard 
            name={demographics.name}
            age={demographics.age}
            gender={demographics.gender}
            dateOfBirth={demographics.date_of_birth}
            countryCode={demographics.location.country_code}
            doctorName={primaryDoctor.name}
            doctorSpecialty={primaryDoctor.specialty}
            doctorClinic={primaryDoctor.clinic_name}
            doctorPhone={primaryDoctor.phone_number}
          />
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <dl className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Date of Birth</dt>
                  <dd className="text-sm col-span-2">{demographics.date_of_birth}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Gender</dt>
                  <dd className="text-sm col-span-2">{demographics.gender}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Country</dt>
                  <dd className="text-sm col-span-2">{demographics.location.country_code}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Blood Type</dt>
                  <dd className="text-sm col-span-2">{profile_data.genetic_proxies.blood_type}</dd>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-muted-foreground">Circadian Rhythm</dt>
                  <dd className="text-sm col-span-2">{profile_data.lifestyle.circadian_rhythm}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetailPage;
