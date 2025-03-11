
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { User, Phone, MapPin, Calendar, MessageCircle } from "lucide-react";

interface ProfileSummaryCardProps {
  name: string;
  age: string;
  gender: string;
  dateOfBirth: string;
  countryCode: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorClinic: string;
  doctorPhone: string;
}

const ProfileSummaryCard = ({
  name,
  age,
  gender,
  dateOfBirth,
  countryCode,
  doctorName,
  doctorSpecialty,
  doctorClinic,
  doctorPhone,
}: ProfileSummaryCardProps) => {
  const { toast } = useToast();

  const handleContactDoctor = () => {
    toast({
      title: "Contact Request Sent",
      description: `Your message has been sent to ${doctorName}. They will contact you shortly.`,
    });
  };

  const handleScheduleAppointment = () => {
    toast({
      title: "Schedule Appointment",
      description: "Opening appointment scheduler with your primary doctor.",
    });
  };

  // Format the date of birth
  const formattedDOB = format(new Date(dateOfBirth), "MMMM d, yyyy");

  return (
    <Card className="hover-lift">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Patient Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                <User className="w-10 h-10 text-primary" />
              </div>
              <Badge
                className="absolute bottom-1 right-0 bg-primary text-primary-foreground"
                variant="outline"
              >
                {gender}
              </Badge>
            </div>
            <h3 className="text-xl font-bold mt-2">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{age} years</span>
              <span>•</span>
              <MapPin className="h-3 w-3" />
              <span>{countryCode}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Born: {formattedDOB}
            </div>
          </div>

          <div className="pt-2 border-t">
            <h4 className="text-sm font-semibold mb-2">Primary Doctor</h4>
            <div className="space-y-1 mb-3">
              <div className="text-sm">{doctorName}</div>
              <div className="text-xs text-muted-foreground">{doctorSpecialty} - {doctorClinic}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Phone className="h-3 w-3 mr-1" />
                {doctorPhone}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs"
                onClick={handleContactDoctor}
              >
                <MessageCircle className="mr-1 h-3 w-3" />
                Message
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-primary text-xs"
                onClick={handleScheduleAppointment}
              >
                <Calendar className="mr-1 h-3 w-3" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummaryCard;
