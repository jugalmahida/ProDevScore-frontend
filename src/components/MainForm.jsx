"use client"
import { useState } from "react";

export default function MainForm() {
  const [githubUrl, setGithubUrl] = useState("");
  const [topCommits, setTopCommits] = useState("5");
  const [customRange, setCustomRange] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleTopCommitChange = (e) => {
    const val = e.target.value;
    setTopCommits(val);
    setCustomRange(val === "custom");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation:
    if (!githubUrl) {
      setError("Please enter GitHub URL");
      return;
    }
    if (customRange && (!startDate || !endDate)) {
      setError("Please select start and end dates for custom range");
      return;
    }
    setError(null);

    onSubmit({
      githubUrl,
      topCommits: topCommits === "custom" ? 0 : Number(topCommits),
      startDate: customRange ? startDate : null,
      endDate: customRange ? endDate : null,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded shadow"
    >
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        GitHub Repository URL
      </label>
      <input
        type="url"
        placeholder="https://github.com/username/repository"
        className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
        required
      />

      <label className="block mb-2 text-gray-700 dark:text-gray-300">
        Top Commits to Review
      </label>
      <select
        className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        value={topCommits}
        onChange={handleTopCommitChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="custom">Custom Range</option>
      </select>

      {customRange && (
        <>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required={customRange}
          />

          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            End Date
          </label>
          <input
            type="date"
            className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required={customRange}
          />
        </>
      )}

      <button
        type="submit"
        className="bg-indigo-600 text-white py-3 px-6 rounded hover:bg-indigo-700 w-full"
      >
        Track Progress
      </button>
    </form>
  );
}
