import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBookmark, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const DashboardPage = () => {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, these would be API calls
        const jobsResponse = await fetch('/api/jobs');
        const allJobs = await jobsResponse.json();

        // Filter saved jobs
        const savedJobsData = allJobs.filter(job => 
          user.savedJobs.includes(job.id)
        );
        setSavedJobs(savedJobsData);

        // Get application details
        const applicationsData = user.applications.map(application => {
          const job = allJobs.find(j => j.id === application.jobId);
          return {
            ...application,
            job
          };
        });
        setApplications(applicationsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Saved Jobs Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <FaBookmark className="text-primary-500 mr-2" />
          Saved Jobs
        </h2>
        
        {savedJobs.length === 0 ? (
          <p className="text-gray-600">You haven't saved any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-4">{job.company.name}</p>
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Job Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Applications Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Applications</h2>
        
        {applications.length === 0 ? (
          <p className="text-gray-600">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application.jobId} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {application.job.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.job.company.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {application.status === 'pending' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          <FaSpinner className="mr-1 animate-spin" />
                          Pending
                        </span>
                      )}
                      {application.status === 'accepted' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1" />
                          Accepted
                        </span>
                      )}
                      {application.status === 'rejected' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <FaTimesCircle className="mr-1" />
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage; 