import React from "react";

const Header = ({ completedTasks, totalTasks, completionPercentage }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Spanish Digital Nomad Visa Tracker
            </h1>
            <p className="text-gray-600 mt-1">
              Track your progress through the visa application process
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="bg-indigo-50 rounded-lg p-3">
              <div className="flex items-center">
                <div className="mr-4">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-xl font-semibold">
                    {completedTasks}/{totalTasks} tasks
                  </p>
                </div>

                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#e0e6f9"
                      strokeWidth="3"
                    />

                    {/* Progress circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeDasharray={`${completionPercentage} 100`}
                      strokeDashoffset="25"
                      transform="rotate(-90 18 18)"
                    />

                    {/* Percentage text */}
                    <text
                      x="18"
                      y="20"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#4f46e5"
                    >
                      {completionPercentage}%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
