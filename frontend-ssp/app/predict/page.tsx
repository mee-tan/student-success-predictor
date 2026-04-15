"use client";

import React, { useMemo, useState } from "react";

const options = {
  firstLanguage: [
    { label: "English", value: 1 },
    { label: "French", value: 2 },
    { label: "Other", value: 3 },
  ],
  funding: [
    { label: "Apprentice_PS", value: 1 },
    { label: "GPOG_FT", value: 2 },
    { label: "Intl Offshore", value: 3 },
    { label: "Intl Regular", value: 4 },
    { label: "Intl Transfer", value: 5 },
    { label: "Joint Program Ryerson", value: 6 },
    { label: "Joint Program UTSC", value: 7 },
    { label: "Second Career Program", value: 8 },
    { label: "Work Safety Insurance Board", value: 9 },
  ],
  school: [
    { label: "Advancement", value: 1 },
    { label: "Business", value: 2 },
    { label: "Communications", value: 3 },
    { label: "Community and Health", value: 4 },
    { label: "Hospitality", value: 5 },
    { label: "Engineering", value: 6 },
    { label: "Transportation", value: 7 },
  ],
  yesNo: [
    { label: "Yes", value: 1 },
    { label: "No", value: 2 },
  ],
  residency: [
    { label: "Domestic", value: 1 },
    { label: "International", value: 2 },
  ],
  gender: [
    { label: "Female", value: 1 },
    { label: "Male", value: 2 },
    { label: "Neutral", value: 3 },
  ],
  prevEducation: [
    { label: "HighSchool", value: 1 },
    { label: "PostSecondary", value: 2 },
  ],
  ageGroup: [
    { label: "0 to 18", value: 1 },
    { label: "19 to 20", value: 2 },
    { label: "21 to 25", value: 3 },
    { label: "26 to 30", value: 4 },
    { label: "31 to 35", value: 5 },
    { label: "36 to 40", value: 6 },
    { label: "41 to 50", value: 7 },
    { label: "51 to 60", value: 8 },
    { label: "61 to 65", value: 9 },
    { label: "66+", value: 10 },
  ],
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

export default function PredictPage() {
  const [firstTermGpa, setFirstTermGpa] = useState(2.0);
  const [firstLanguage, setFirstLanguage] = useState(1);
  const [funding, setFunding] = useState(1);
  const [school, setSchool] = useState(1);
  const [fastTrack, setFastTrack] = useState(2);
  const [coop, setCoop] = useState(2);
  const [residency, setResidency] = useState(1);
  const [gender, setGender] = useState(1);
  const [prevEducation, setPrevEducation] = useState(1);
  const [ageGroup, setAgeGroup] = useState(3);
  const [hsAverageMark, setHsAverageMark] = useState(75);
  const [mathScore, setMathScore] = useState(25);
  const [englishGrade, setEnglishGrade] = useState(1);

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const payload = useMemo(
    () => ({
      first_term_gpa: firstTermGpa,
      first_language: firstLanguage,
      funding,
      school,
      fast_track: fastTrack,
      coop,
      residency,
      gender,
      prev_education: prevEducation,
      age_group: ageGroup,
      hs_average_mark: hsAverageMark,
      math_score: mathScore,
      english_grade: englishGrade,
    }),
    [
      firstTermGpa,
      firstLanguage,
      funding,
      school,
      fastTrack,
      coop,
      residency,
      gender,
      prevEducation,
      ageGroup,
      hsAverageMark,
      mathScore,
      englishGrade,
    ]
  );

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict-risk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Could not get prediction from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-black">
          Predict First Year Persistence
        </h1>

        <div className="grid gap-6">
          <SliderField
            label="First Term GPA"
            value={firstTermGpa}
            min={0}
            max={4.5}
            step={0.1}
            onChange={setFirstTermGpa}
          />

          <SelectField
            label="First Language"
            value={firstLanguage}
            options={options.firstLanguage}
            onChange={setFirstLanguage}
          />

          <SelectField
            label="Funding"
            value={funding}
            options={options.funding}
            onChange={setFunding}
          />

          <SelectField
            label="School"
            value={school}
            options={options.school}
            onChange={setSchool}
          />

          <SelectField
            label="Fast Track"
            value={fastTrack}
            options={options.yesNo}
            onChange={setFastTrack}
          />

          <SelectField
            label="Coop"
            value={coop}
            options={options.yesNo}
            onChange={setCoop}
          />

          <SelectField
            label="Residency"
            value={residency}
            options={options.residency}
            onChange={setResidency}
          />

          <SelectField
            label="Gender"
            value={gender}
            options={options.gender}
            onChange={setGender}
          />

          <SelectField
            label="Previous Education"
            value={prevEducation}
            options={options.prevEducation}
            onChange={setPrevEducation}
          />

          <SelectField
            label="Age Group"
            value={ageGroup}
            options={options.ageGroup}
            onChange={setAgeGroup}
          />

          <SliderField
            label="High School Average Mark"
            value={hsAverageMark}
            min={0}
            max={100}
            step={0.1}
            onChange={setHsAverageMark}
          />

          <SliderField
            label="Math Score"
            value={mathScore}
            min={0}
            max={50}
            step={0.1}
            onChange={setMathScore}
          />

          <SelectField
            label="English Grade"
            value={englishGrade}
            options={options.englishGrade}
            onChange={setEnglishGrade}
          />


          <button
            onClick={handleSubmit}
            className="bg-slate-800 text-white py-3 rounded-xl"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-slate-100 rounded-xl text-black">
            <h2 className="font-semibold mb-2">Result:</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-slate-100 rounded-xl text-black">
          <h2 className="font-semibold mb-2">Payload Preview</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}