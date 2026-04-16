import { options } from "../_data/predict-options";
import type { PredictionResult } from "../_types/predict";

type PredictionSummaryProps = {
  loading: boolean;
  result: PredictionResult;

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

export function PredictionSummary({
  loading,
  result,
  firstTermGpa,
  secondTermGpa,
  firstLanguage,
  funding,
  school,
  fastTrack,
  coop,
  residency,
  gender,
  prevEducation,
  ageGroup,
  englishGrade,
}: PredictionSummaryProps) {
  const score =
    result?.persistence_score !== undefined
      ? Number(result.persistence_score)
      : null;
  
  const firstLanguageLabel =
    options.firstLanguage.find((item) => item.value === firstLanguage)?.label ??
    firstLanguage;

  const fundingLabel =
    options.funding.find((item) => item.value === funding)?.label ?? funding;

  const schoolLabel =
    options.school.find((item) => item.value === school)?.label ?? school;

  const fastTrackLabel =
    options.fastTrack.find((item) => item.value === fastTrack)?.label ??
    fastTrack;

  const coopLabel =
    options.coop.find((item) => item.value === coop)?.label ?? coop;

  const residencyLabel =
    options.residency.find((item) => item.value === residency)?.label ??
    residency;

  const genderLabel =
    options.gender.find((item) => item.value === gender)?.label ?? gender;

  const prevEducationLabel =
    options.prevEducation.find((item) => item.value === prevEducation)?.label ??
    prevEducation;

  const ageLabel =
    options.ageGroup.find((item) => item.value === ageGroup)?.label ?? ageGroup;

  const englishLabel =
    options.englishGrade.find((item) => item.value === englishGrade)?.label ??
    englishGrade;
  const isAtRisk =
    result?.persistence_label?.toLowerCase().includes("risk") ?? false;

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Prediction Summary
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Your persistence result will appear here after submission.
        </p>
      </div>

      {loading && (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
          <h3 className="text-lg font-semibold text-slate-800">
            Predicting...
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Please wait while the model processes the inputs.
          </p>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-5">
          <div
            className={`rounded-2xl p-6 text-white shadow-sm bg-linear-to-r ${
              isAtRisk
                ? "from-red-600 to-rose-500"
                : "from-emerald-600 to-teal-600"
            }`}
          >
            <p
              className={`text-sm font-medium ${
                isAtRisk ? "text-red-100" : "text-emerald-100"
              }`}
            >
              Persistence Prediction
            </p>

            <p className="mt-2 text-3xl font-bold">
              {result?.persistence_label ?? "Unknown"}
            </p>

            {score !== null && (
              <p
                className={`mt-2 text-sm ${
                  isAtRisk ? "text-red-100" : "text-emerald-100"
                }`}
              >
                Model score: {score.toFixed(3)}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Input Snapshot
            </h3>

            <div className="grid gap-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>First Term GPA</span>
                <span className="font-semibold">{firstTermGpa}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Second Term GPA</span>
                <span className="font-semibold">{secondTermGpa}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>First Language</span>
                <span className="font-semibold">{firstLanguageLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Funding</span>
                <span className="font-semibold">{fundingLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>School</span>
                <span className="font-semibold">{schoolLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Fast Track</span>
                <span className="font-semibold">{fastTrackLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Co-op</span>
                <span className="font-semibold">{coopLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Residency</span>
                <span className="font-semibold">{residencyLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Gender</span>
                <span className="font-semibold">{genderLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Previous Education</span>
                <span className="font-semibold">{prevEducationLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Age Group</span>
                <span className="font-semibold">{ageLabel}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>English Grade</span>
                <span className="font-semibold">{englishLabel}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}