"use client";

import React, { useMemo, useState } from "react";
import { predictAcademicPerformance } from "@/app/lib/api";

const options = {
  englishGrade: [
    { label: "Level-130", value: 1 },
    { label: "Level-131", value: 2 },
    { label: "Level-140", value: 3 },
    { label: "Level-141", value: 4 },
    { label: "Level-150", value: 5 },
    { label: "Level-151", value: 6 },
    { label: "Level-160", value: 7 },
    { label: "Level-161", value: 8 },
    { label: "Level-170", value: 9 },
    { label: "Level-171", value: 10 },
    { label: "Level-180", value: 11 },
  ],
};

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">
        {label}: <span className="font-bold">{value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: { label: string; value: number }[];
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border p-3 rounded-xl text-black"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PredictAcademicPerformancePage() {
  const [hsAverage, setHsAverage] = useState(75);
  const [mathScore, setMathScore] = useState(25);
  const [englishGrade, setEnglishGrade] = useState(1);
  const [firstTermGpa, setFirstTermGpa] = useState(2.0);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const payload = useMemo(
    () => ({
      hsAverage: hsAverage,
      mathScore: mathScore,
      englishGrade: englishGrade,
      firstTermGpa: firstTermGpa,
    }),
    [hsAverage, mathScore, englishGrade, firstTermGpa]
  );

  const handlePredict = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const data = await predictAcademicPerformance(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Could not get prediction. Make sure the Flask API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-10">
  <div className="mx-auto max-w-6xl">
    <div className="mb-8 text-center">
      <p className="mb-2 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
        Student Success Predictor
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">
        Predict Academic Performance
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
        Enter a few academic details to get a quick prediction of student
        performance. This tool is designed to be simple, fast, and easy to use.
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Left Card - Form */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Student Inputs
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Adjust the values below to generate an academic performance
            prediction.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2">
              <p className="text-sm font-medium text-slate-800">
                High School Average
              </p>
              <p className="text-xs text-slate-500">
                Overall high school average percentage.
              </p>
            </div>
            <SliderField
              label="High School Average"
              value={hsAverage}
              min={0}
              max={100}
              step={0.1}
              onChange={setHsAverage}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2">
              <p className="text-sm font-medium text-slate-800">Math Score</p>
              <p className="text-xs text-slate-500">
                Entrance or placement math result.
              </p>
            </div>
            <SliderField
              label="Math Score"
              value={mathScore}
              min={0}
              max={50}
              step={0.1}
              onChange={setMathScore}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2">
              <p className="text-sm font-medium text-slate-800">
                English Grade
              </p>
              <p className="text-xs text-slate-500">
                Select the student’s English level.
              </p>
            </div>
            <SelectField
              label="English Grade"
              value={englishGrade}
              options={options.englishGrade}
              onChange={setEnglishGrade}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2">
              <p className="text-sm font-medium text-slate-800">
                First Term GPA
              </p>
              <p className="text-xs text-slate-500">
                Student GPA from their first term.
              </p>
            </div>
            <SliderField
              label="First Term GPA"
              value={firstTermGpa}
              min={0}
              max={4.5}
              step={0.1}
              onChange={setFirstTermGpa}
            />
          </div>

          <button
            onClick={handlePredict}
            className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-base font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Generating Prediction..." : "Predict Academic Performance"}
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold">Something went wrong</p>
            <p className="mt-1">{error}</p>
          </div>
        )}
      </section>

      {/* Right Card - Results */}
      <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Prediction Summary
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your prediction will appear here after submitting the form.
          </p>
        </div>

        {!result && !loading && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
              📘
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No prediction yet
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Fill in the student information and click the button to view the
              predicted academic performance.
            </p>
          </div>
        )}

        {loading && (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-slate-50 p-8 text-center">
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
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-sm">
              <p className="text-sm font-medium text-blue-100">
                Predicted Academic Performance
              </p>
              <p className="mt-2 text-4xl font-bold">
                {Number(result.predicted_academic_performance).toFixed(2)}
              </p>
              <p className="mt-2 text-sm text-blue-100">
                This score is based on the input values provided.
              </p>
            </div>
            <div>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
          >
            Back
          </a>
          </div>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Input Snapshot
              </h3>
              <div className="grid gap-3 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>High School Average</span>
                  <span className="font-semibold">{hsAverage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Math Score</span>
                  <span className="font-semibold">{mathScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>English Grade</span>
                  <span className="font-semibold">{englishGrade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>First Term GPA</span>
                  <span className="font-semibold">{firstTermGpa}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  </div>
</main>
  );
}