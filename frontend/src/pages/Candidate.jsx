import { useState } from "react";

import { useLocation } from "react-router-dom";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer

} from "recharts";

function Candidate() {

  const location = useLocation();

  const results = location.state?.results || [];

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // If no results found

  if (results.length === 0) {

    return (

      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold text-red-400 mb-6">

          No Candidate Data Found

        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-10">

      {/* Heading */}

      <h1 className="text-5xl font-bold text-cyan-400 mb-10 text-center">

        Recruiter Dashboard

      </h1>

      {/* Chart */}

      {

        !selectedCandidate && (

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800 mb-10">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">

              Candidate Comparison

            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={results}>

                <XAxis dataKey="filename" />

                <YAxis />

                <Tooltip />

                <Bar

                  dataKey="match_score"

                  fill="#00d9ff"

                  radius={[10, 10, 0, 0]}

                />

              </BarChart>

            </ResponsiveContainer>

          </div>
        )
      }

      {/* Candidate Cards */}

      {

        !selectedCandidate ? (

          <div className="grid md:grid-cols-2 gap-8">

            {

              results.map((candidate, index) => (

                <div

                  key={index}

                  onClick={() => setSelectedCandidate(candidate)}

                  className="bg-white/5 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:scale-[1.02] transition-all duration-300"

                >

                  {/* Candidate Name */}

                  <h2 className="text-3xl font-bold text-cyan-400 mb-4">

                    {candidate.filename}

                  </h2>

                  {/* Rank */}

                  <p className="text-yellow-400 font-bold text-xl mb-4">

                    Rank #{index + 1}

                  </p>

                  {/* Match Score */}

                  <div className="mb-4">

                    <div className="flex justify-between mb-2">

                      <span>Match Score</span>

                      <span className="text-cyan-400 font-bold">

                        {candidate.match_score}%

                      </span>

                    </div>

                    <div className="w-full bg-zinc-700 rounded-full h-4">

                      <div

                        className="bg-cyan-500 h-4 rounded-full"

                        style={{

                          width: `${candidate.match_score}%`

                        }}

                      ></div>

                    </div>

                  </div>

                  {/* Recommendation */}

                  <span

                    className={`px-4 py-2 rounded-xl font-bold ${

                      candidate.recommendation === "Highly Recommended"

                        ? "bg-green-500/20 text-green-400"

                        : candidate.recommendation === "Recommended"

                        ? "bg-cyan-500/20 text-cyan-400"

                        : "bg-red-500/20 text-red-400"

                    }`}

                  >

                    {candidate.recommendation}

                  </span>

                </div>
              ))
            }

          </div>

        ) : (

          /* Candidate Detail View */

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-zinc-800">

            {/* Back Button */}

            <button

              onClick={() => setSelectedCandidate(null)}

              className="mb-8 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-2xl font-bold"

            >

              ← Back To Candidates

            </button>

            {/* Candidate Name */}

            <h1 className="text-6xl font-extrabold text-cyan-400 mb-8">

              {selectedCandidate.filename}

            </h1>

            {/* Match Score */}

            <div className="mb-8">

              <div className="flex justify-between mb-3">

                <span className="text-xl font-bold">

                  Match Score

                </span>

                <span className="text-cyan-400 font-bold text-xl">

                  {selectedCandidate.match_score}%

                </span>

              </div>

              <div className="w-full bg-zinc-700 rounded-full h-5">

                <div

                  className="bg-cyan-500 h-5 rounded-full"

                  style={{

                    width: `${selectedCandidate.match_score}%`

                  }}

                ></div>

              </div>

            </div>

            {/* Skills */}

            <div className="mb-8">

              <h2 className="text-2xl font-bold mb-4">

                Skills

              </h2>

              <div className="flex flex-wrap gap-3">

                {

                  (selectedCandidate.skills || []).map((skill, index) => (

                    <span

                      key={index}

                      className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-xl font-bold"

                    >

                      {skill}

                    </span>
                  ))
                }

              </div>

            </div>

            {/* Missing Skills */}

            <div className="mb-8">

              <h2 className="text-3xl font-extrabold mb-4">

                Missing Skills

              </h2>

              <div className="flex flex-wrap gap-3">

                {

                  (selectedCandidate.missing_skills || []).map((skill, index) => (

                    <span

                      key={index}

                      className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl font-bold"

                    >

                      {skill}

                    </span>
                  ))
                }

              </div>

            </div>

            {/* Experience Analysis */}

            <div className="mb-8">

              <h2 className="text-3xl font-extrabold mb-4">

                Experience Analysis

              </h2>

              <p className="text-xl font-bold">

                Candidate Experience:

                <span className="text-cyan-400 ml-2">

                  {selectedCandidate.candidate_experience} Years

                </span>

              </p>

              <p className="text-xl font-bold mt-2">

                Required Experience:

                <span className="text-yellow-400 ml-2">

                  {selectedCandidate.required_experience} Years

                </span>

              </p>

              <p className="text-xl font-bold mt-2">

                Status:

                <span className="text-green-400 ml-2">

                  {selectedCandidate.experience_status}

                </span>

              </p>

            </div>

            {/* ATS Score */}

            <div className="mb-8">

              <h2 className="text-3xl font-extrabold mb-4">

                ATS Compatibility Score

              </h2>

              <div className="w-full bg-zinc-700 rounded-full h-5">

                <div

                  className="bg-green-500 h-5 rounded-full"

                  style={{

                    width: `${selectedCandidate.ats_score || 0}%`

                  }}

                ></div>

              </div>

              <p className="mt-3 text-green-400 font-extrabold text-xl">

                ATS Score: {selectedCandidate.ats_score || 0}%

              </p>

            </div>

          </div>
        )

      }

    </div>
  );
}

export default Candidate;