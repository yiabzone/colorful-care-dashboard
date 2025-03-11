
export interface Patient {
  id: number;
  profile_data: {
    demographics: {
      id: number;
      name: string;
      date_of_birth: string;
      age: string;
      gender: string;
      location: {
        country_code: string;
        geo_risks: Record<string, any>;
      };
    };
    genetic_proxies: {
      blood_type: string;
      family_history: Record<string, any>;
      phenotypic_markers: any[];
      medication_sensitivities: any[];
    };
    environment: {
      occupational_risks: Record<string, any>;
    };
    lifestyle: {
      circadian_rhythm: string;
      nutrition: Record<string, any>;
      activity: Record<string, any>;
      social_history: Record<string, any>;
      biometrics: {
        height: number;
        weight: number;
        bmi: number;
        health_score: number;
      };
    };
    clinical_status: {
      chronic_conditions: any[];
      peculiarities: any[];
      medications: Record<string, any>;
      care_team: {
        primary_doctor: {
          id: number;
          name: string;
          clinic_name: string;
          specialty: string;
          phone_number: string;
        };
      };
    };
    temporal_context: {
      current_time: string;
      patient_local_time: string;
      timezone: string;
    };
  };
  health_goal: {
    goal_name: string;
    target_date: string;
    comments: string;
    metrics: {
      metric_name: string;
      unit: string;
      interval: number;
      target_value: number;
    }[];
    actions: {
      name: string;
      description: string;
      interval: number;
      action_end_date: string;
    }[];
  };
  time_series: {
    goal_details: {
      goal_name: string;
      target_date: string;
      comments: string;
      target_metric: string;
      target_value: number;
    };
    metrics: Record<string, {
      details: {
        metric_name: string;
        unit: string;
        measurement_interval: number;
        measurement_type: string;
        target_value: number;
        status: string;
      };
      records: {
        recorded_at: string;
        recorded_value: number;
        unit: string;
        notes: string;
      }[];
    }>;
    actions: Record<string, {
      details: {
        name: string;
        description: string;
        interval: number;
        action_end_date: string;
        precision_type: string;
        comments: string;
      };
      records: {
        performed_at: string;
        result: string;
        value: number | null;
        unit: string;
        notes: string;
      }[];
    }>;
  };
  medical_reviews: {
    medical_history: {
      id: number;
      patient: number;
      doctor: number;
      chief_complaint: string;
      history_of_present_illness: string;
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
      pre_report_url: string | null;
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
    }[];
  };
}
