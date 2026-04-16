export type SelectOption = {
  label: string;
  value: number;
};

export type PredictionResult = {
  persistence_score?: number | string;
  persistence_label?: string;
} | null;

export type PredictPayload = {
  firstTermGpa: number;
  secondTermGpa: number;
  firstLanguage: number;
  funding: number;
  school: number;
  fastTrack: number;
  coop: number;
  residency: number;
  gender: number;
  prevEducation: number;
  ageGroup: number;
  englishGrade: number;
};