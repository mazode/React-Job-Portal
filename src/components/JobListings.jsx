import { useState, useEffect, useMemo } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';
import SearchAndFilter from './SearchAndFilter';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filters.type || job.type === filters.type;
      const matchesLocation = !filters.location || job.location === filters.location;
      const matchesSalary = !filters.salary || job.salary === filters.salary;

      return matchesSearch && matchesType && matchesLocation && matchesSalary;
    });
  }, [jobs, searchTerm, filters]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className='bg-gray-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-primary-600 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {!isHome && (
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        )}

        {filteredJobs.length === 0 ? (
          <div className='text-center py-10'>
            <h3 className='text-xl font-semibold text-gray-600'>
              No jobs found matching your criteria
            </h3>
            <p className='text-gray-500 mt-2'>
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in'>
            {filteredJobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;