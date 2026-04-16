export type PersistencePayload = {
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

export type AcademicPerformancePayload = {
  hsAverage: number;
  mathScore: number;
  englishGrade: number;
  firstTermGpa: number;
};

export async function predictPersistence(data: PersistencePayload) {
  const res = await fetch("http://localhost:5001/predict-persistence", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Prediction failed");
  }

  return result;
}

export async function predictAcademicPerformance(
  data: AcademicPerformancePayload
) {
  const res = await fetch("http://localhost:5001/predict-academic", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Prediction failed");
  }

  return result;
}