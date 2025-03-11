
import { Patient } from "../types/patient";

export const patientData: Patient = {
  id: 1,
  profile_data: {
    demographics: {
      id: 1,
      name: "there",
      date_of_birth: "1978-05-15",
      age: "46",
      gender: "female",
      location: {
        country_code: "US",
        geo_risks: {}
      }
    },
    genetic_proxies: {
      blood_type: "O+",
      family_history: {},
      phenotypic_markers: [],
      medication_sensitivities: []
    },
    environment: {
      occupational_risks: {}
    },
    lifestyle: {
      circadian_rhythm: "Regular",
      nutrition: {},
      activity: {},
      social_history: {},
      biometrics: {
        height: 165,
        weight: 105,
        bmi: 0,
        health_score: 75
      }
    },
    clinical_status: {
      chronic_conditions: [],
      peculiarities: [],
      medications: {},
      care_team: {
        primary_doctor: {
          id: 123,
          name: "Dr. Smith",
          clinic_name: "General Clinic",
          specialty: "General Practice",
          phone_number: "+15551234567"
        }
      }
    },
    temporal_context: {
      current_time: "2024-07-27T10:00:00Z",
      patient_local_time: "2024-07-27T06:00:00-04:00",
      timezone: "America/New_York"
    }
  },
  health_goal: {
    goal_name: "Manage Headache Symptoms",
    target_date: "2024-08-10",
    comments: "Initial goal to reduce headache frequency and intensity.",
    metrics: [
      {
        metric_name: "Headache Frequency",
        unit: "episodes/week",
        interval: 72,
        target_value: 1
      },
      {
        metric_name: "Headache Intensity",
        unit: "scale 1-10",
        interval: 72,
        target_value: 3
      }
    ],
    actions: [
      {
        name: "Hydration",
        description: "Drink at least 8 glasses of water daily.",
        interval: 24,
        action_end_date: "2024-08-10"
      },
      {
        name: "Pain Relief",
        description: "Take over-the-counter pain reliever as needed for headaches, not exceeding recommended dosage.",
        interval: 0,
        action_end_date: "2024-08-10"
      }
    ]
  },
  time_series: {
    goal_details: {
      goal_name: "Lose 5 kg",
      target_date: "2025-04-30T00:00:00Z",
      comments: "Aim to lose 5 kg in 2 months through diet and exercise.",
      target_metric: "Weight",
      target_value: 70.0
    },
    metrics: {
      Weight: {
        details: {
          metric_name: "Weight",
          unit: "kg",
          measurement_interval: 7,
          measurement_type: "manual",
          target_value: 70.0,
          status: "on_track"
        },
        records: [
          {
            recorded_at: "2025-02-15T08:00:00Z",
            recorded_value: 75.0,
            unit: "kg",
            notes: "Starting weight"
          },
          {
            recorded_at: "2025-02-22T08:00:00Z",
            recorded_value: 74.0,
            unit: "kg",
            notes: "Lost 1 kg"
          },
          {
            recorded_at: "2025-03-01T08:00:00Z",
            recorded_value: 73.5,
            unit: "kg",
            notes: "Slight progress"
          }
        ]
      }
    },
    actions: {
      "Daily Walking": {
        details: {
          name: "Daily Walking",
          description: "Walk for at least 30 minutes every day.",
          interval: 1,
          action_end_date: "2025-04-30T00:00:00Z",
          precision_type: "exercise",
          comments: "Increase step count gradually."
        },
        records: [
          {
            performed_at: "2025-02-15T07:00:00Z",
            result: "completed",
            value: 3000,
            unit: "steps",
            notes: "Morning walk"
          },
          {
            performed_at: "2025-02-16T07:00:00Z",
            result: "completed",
            value: 4500,
            unit: "steps",
            notes: "Evening walk, longer route"
          },
          {
            performed_at: "2025-02-17T07:00:00Z",
            result: "missed",
            value: null,
            unit: "",
            notes: "Busy with work"
          }
        ]
      }
    }
  },
  medical_reviews: {
    medical_history: [
      {
        id: 28,
        patient: 1,
        doctor: 1,
        chief_complaint: "I have a persistent headache and some sore throat.",
        history_of_present_illness: "The headache started about 3 days ago and the sore throat began yesterday. I have also felt a bit feverish.",
        assessment_diagnosis: "Viral infection, possibly influenza",
        status: "stable",
        management_plan: "Rest, stay hydrated, and take over-the-counter pain relievers such as ibuprofen for headache and body aches.",
        lifestyle_advice: "Avoid spicy foods and cold drinks as they can irritate the throat.",
        patient_education: "Monitor temperature, especially if fever rises above 101 degrees Fahrenheit.",
        follow_up_plan: "If symptoms persist beyond a week or worsen, please return for further evaluation.",
        treatment_goal: "To alleviate symptoms and support recovery from viral infection.",
        health_score: 75,
        review_status: "approved",
        report_url: "https://prestigehealth.s3.amazonaws.com/medical_reviews/28_medical_review_report.pdf",
        pre_report_url: "https://prestigehealth.s3.amazonaws.com/preliminary_medical_reviews/28_preliminary_review_report.pdf",
        prescriptions: [
          {
            id: 3,
            prescription_items: [
              {
                medication_name: "Ibuprofen",
                dosage: "200 mg",
                frequency: "Every 6-8 hours as needed for pain relief",
                duration: "As necessary, until symptoms improve",
                route: "Oral",
                instructions: "Take with food to reduce gastrointestinal upset."
              }
            ]
          }
        ]
      },
      {
        id: 33,
        patient: 1,
        doctor: 1,
        chief_complaint: "I have been feeling unwell for the past few days.",
        history_of_present_illness: "Persistent headache for 3 days, sore throat starting yesterday, slight fever (about 100 degrees Fahrenheit), mild cough, feeling really tired.",
        assessment_diagnosis: "Viral infection, possibly influenza.",
        status: "stable",
        management_plan: "Rest, hydration, over-the-counter pain relievers such as ibuprofen.",
        lifestyle_advice: "Avoid spicy foods and cold drinks; consume warm foods such as tea or soup.",
        patient_education: "Contact the doctor if fever increases above 101 degrees Fahrenheit.",
        follow_up_plan: "Return if symptoms worsen or persist beyond one week.",
        treatment_goal: "Symptom relief and recovery.",
        health_score: null,
        review_status: "pending",
        report_url: null,
        pre_report_url: "https://prestigehealth.s3.amazonaws.com/preliminary_medical_reviews/33_preliminary_review_report.pdf",
        prescriptions: []
      },
      {
        id: 34,
        patient: 1,
        doctor: 1,
        chief_complaint: "I have been feeling unwell for the past few days. I have a persistent headache and some sore throats.",
        history_of_present_illness: "The headache started about 3 days ago and the sore throat began yesterday. I have also felt a bit feverish.",
        assessment_diagnosis: "Viral infection, possibly influenza.",
        status: "stable",
        management_plan: "Rest, stay hydrated, and take over-the-counter pain relievers.",
        lifestyle_advice: "Avoid spicy foods and cold drinks; consume warm foods like tea or soup.",
        patient_education: "Monitor symptoms and reach out if fever rises above 101 degrees Fahrenheit.",
        follow_up_plan: "Return if symptoms persist beyond a week or worsen.",
        treatment_goal: "Symptom relief and recovery from viral infection.",
        health_score: null,
        review_status: "approved",
        report_url: "https://prestigehealth.s3.amazonaws.com/medical_reviews/34_medical_review_report.pdf",
        pre_report_url: "https://prestigehealth.s3.amazonaws.com/preliminary_medical_reviews/34_preliminary_review_report.pdf",
        prescriptions: []
      },
      {
        id: 35,
        patient: 1,
        doctor: 1,
        chief_complaint: "I have been feeling unwell for the past few days. I have a persistent headache and some sore throats.",
        history_of_present_illness: "The headache started about 3 days ago and the sore throat began yesterday. I have also felt a bit feverish.",
        assessment_diagnosis: "Viral infection, possibly flu.",
        status: "stable",
        management_plan: "Rest, stay hydrated, over-the-counter pain relievers for headache and body aches.",
        lifestyle_advice: "Avoid spicy foods and cold drinks; consume warm foods like tea or soup.",
        patient_education: "If fever rises above 101 degrees Fahrenheit, contact healthcare provider.",
        follow_up_plan: "If symptoms persist beyond a week or worsen, return for further evaluation.",
        treatment_goal: "Symptom relief and recovery within a week.",
        health_score: 75,
        review_status: "approved",
        report_url: "https://prestigehealth.s3.amazonaws.com/medical_reviews/35_medical_review_report.pdf",
        pre_report_url: "https://prestigehealth.s3.amazonaws.com/preliminary_medical_reviews/35_preliminary_review_report.pdf",
        prescriptions: []
      },
      {
        id: 36,
        patient: 1,
        doctor: 1,
        chief_complaint: "I have been feeling unwell for the past few days. I have a persistent headache and some sore throats.",
        history_of_present_illness: "The headache started about 3 days ago and the sore throat began yesterday. I have also felt a bit feverish.",
        assessment_diagnosis: "Viral infection, possibly influenza.",
        status: "stable",
        management_plan: "Rest, stay hydrated, and take over-the-counter pain relievers.",
        lifestyle_advice: "Avoid spicy foods and cold drinks; stick to warm foods like tea or soup.",
        patient_education: "Understand symptom management and hydration importance during recovery.",
        follow_up_plan: "Monitor symptoms, return if symptoms persist beyond a week or if fever rises above 101 degrees Fahrenheit.",
        treatment_goal: "Symptom relief and recovery from viral infection.",
        health_score: 70,
        review_status: "approved",
        report_url: "https://prestigehealth.s3.amazonaws.com/medical_reviews/36_medical_review_report.pdf",
        pre_report_url: null,
        prescriptions: []
      }
    ]
  }
};
