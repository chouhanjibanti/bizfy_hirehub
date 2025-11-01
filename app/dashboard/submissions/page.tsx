'use client';

import { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle2, XCircle, Clock4, MoreHorizontal } from 'lucide-react';

type SubmissionStatus = 'All Submissions' | 'Accepted' | 'Rejected' | 'Pending';

interface Submission {
  id: number;
  candidateName: string;
  requirement: string;
  status: 'Accepted' | 'Rejected' | 'Pending';
  meetingLink: string;
  scheduledAt: string;
}

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus>('All Submissions');
  
  // Sample data - replace with your actual data source
  const submissions: Submission[] = [];
  
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchQuery === '' || 
      submission.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.requirement.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'All Submissions' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle2 className="h-3 w-3 mr-1" /> Accepted
        </span>;
      case 'Rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" /> Rejected
        </span>;
      case 'Pending':
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock4 className="h-3 w-3 mr-1" /> Pending
        </span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Submissions</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>
      
      {/* Filter Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filter Submissions</h2>
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
                placeholder="Search by candidate or requirement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as SubmissionStatus)}
              >
                <option>All Submissions</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Submissions Table */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Candidate Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Requirement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Meeting Link
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Scheduled At
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {submission.candidateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {submission.requirement}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                      {submission.meetingLink ? (
                        <a href={submission.meetingLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Join Meeting
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {submission.scheduledAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Search className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                      <p className="text-lg font-medium text-gray-500 dark:text-gray-400">No submissions found</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {searchQuery || statusFilter !== 'All Submissions' 
                          ? 'Try adjusting your search or filter criteria.' 
                          : 'Get started by creating a new submission.'}
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
         
