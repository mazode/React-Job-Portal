import React, { useState } from 'react';
import { FaMapMarker, FaBuilding, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = job.description;
  if (!showFullDescription) {
    description = description.substring(0, 90) + '...';
  }

  return (
    <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up">
      <div className="p-6">
        {/* Job Type Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full">
            {job.type}
          </span>
        </div>

        {/* Job Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {job.title}
        </h3>

        {/* Company Info */}
        <div className="flex items-center text-gray-600 mb-4">
          <FaBuilding className="mr-2" />
          <span>{job.company.name}</span>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
          <button
            onClick={() => setShowFullDescription((prevState) => !prevState)}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
            aria-expanded={showFullDescription}
            aria-controls={`job-description-${job.id}`}
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        </div>

        {/* Salary */}
        <div className="flex items-center text-primary-600 mb-4">
          <FaMoneyBillWave className="mr-2" />
          <span className="font-semibold">{job.salary} / Year</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Location and Action Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarker className="text-primary-500 mr-2" />
            <span>{job.location}</span>
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-opacity duration-200 w-full sm:w-auto"
            aria-label={`View details for ${job.title} position`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default JobListing;