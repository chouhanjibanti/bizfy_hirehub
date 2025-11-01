'use client';

import { useState } from 'react';
import { Search, Briefcase, Clock, MapPin, Calendar, Plus } from 'lucide-react';

type JobType = 'All Job Types' | 'Remote' | 'Onsite' | 'Hybrid';

interface Requirement {
  id: number;
  jobTitle: string;
  description: string;
  experience: string;
  jobType: 'Remote' | 'Onsite' | 'Hybrid';
  location: string;
  status: 'Active' | 'Inactive' | 'Paused';
  postedDate: string;
}

export default function RequirementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState<JobType>('All Job Types');
  
  // Sample data - replace with your actual data source
  const requirements: Requirement[] = [
    {
      id: 1,
      jobTitle: 'Senior Frontend Developer',
      description: 'We are looking for an experienced frontend developer with React and TypeScript skills.',
      experience: '5+ years',
      jobType: 'Remote',
      location: 'Worldwide',
      status: 'Active',
      postedDate: '2023-10-15'
    },
    {
      id: 2,
      jobTitle: 'UX/UI Designer',
      description: 'Creative designer with experience in Figma and user-centered design.',
      experience: '3+ years',
      jobType: 'Hybrid',
      location: 'New York, NY',
      status: 'Active',
      postedDate: '2023-10-20'
    },
    {
      id: 3,
      jobTitle: 'DevOps Engineer',
      description: 'Looking for a DevOps engineer with AWS and Kubernetes experience.',
      experience: '4+ years',
      jobType: 'Onsite',
      location: 'San Francisco, CA',
      status: 'Paused',
      postedDate: '2023-10-10'
    },
    {
      id: 4,
      jobTitle: 'Product Manager',
      description: 'Experienced product manager to lead our development team.',
      experience: '6+ years',
      jobType: 'Remote',
      location: 'United States',
      status: 'Active',
      postedDate: '2023-10-05'
    },
    {
      id: 5,
      jobTitle: 'Backend Developer',
      description: 'Node.js developer with experience in microservices architecture.',
      experience: '4+ years',
      jobType: 'Hybrid',
      location: 'Austin, TX',
      status: 'Inactive',
      postedDate: '2023-09-28'
    }
  ];
  
  const filteredRequirements = requirements.filter(req => {
    const matchesSearch = searchQuery === '' || 
      req.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesJobType = jobTypeFilter === 'All Job Types' || req.jobType === jobTypeFilter;
    
    return matchesSearch && matchesJobType;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          Active
        </span>;
      case 'Inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          Inactive
        </span>;
      case 'Paused':
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Paused
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Requirements</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Find job requirements and add candidates with direct screening booking.
        </p>
      </div>
      
      {/* Filter Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Search & Filter Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Search by job title, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Type
            </label>
            <select
              id="jobType"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value as JobType)}
            >
              <option>All Job Types</option>
              <option>Remote</option>
              <option>Onsite</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Requirements Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Available Requirements ({filteredRequirements.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Experience Required
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Job Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posted Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequirements.length > 0 ? (
                filteredRequirements.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {req.jobTitle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                        {req.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-400" />
                          {req.experience}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req.jobType === 'Remote' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : req.jobType === 'Onsite'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {req.jobType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {req.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(req.postedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white ${
                          req.status === 'Active' 
                            ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        disabled={req.status !== 'Active'}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Candidate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No requirements found</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {searchQuery || jobTypeFilter !== 'All Job Types' 
                          ? 'Try adjusting your search or filter criteria.' 
                          : 'No job requirements available at the moment.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
    
