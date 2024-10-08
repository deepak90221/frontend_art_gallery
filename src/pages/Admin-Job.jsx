import { useState, useEffect } from 'react';
import { useAuth } from '../store/auth'; 
import './AdminContacts.css'; 
import { toast } from 'react-toastify';
import { JobStatus } from './JobStatuses';

export const AdminJob = () => {
    const { authorizationToken } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loadingJobs, setLoadingJobs] = useState(false); // State to manage loading state
    const [jobStatus, setJobStatus] = useState(null); // State to manage job status messages

    // Fetch all job applications
    const getAllJobApplications = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/auth/job", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setJobs(data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Run the fetch on initial load and whenever authorizationToken changes
    useEffect(() => {
        getAllJobApplications();
    }); // Include dependency array

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Delete job application
    const deleteJob = async (id) => {
        try {
            console.log('Deleting job with ID:', id);
            const response = await fetch(`http://localhost:8000/api/job/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            });

            console.log('Delete response:', response); // Log the response status

            if (!response.ok) {
                throw new Error(`Error deleting job: ${response.statusText}`);
            }
            toast("Job deleted successfully")

            // Remove the deleted job from the state
            setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    // Accept job application
    const acceptJob = async (id) => {
        try {
            setLoadingJobs(true); // Set loading state to true
            const response = await fetch(`http://localhost:8000/api/job/${id}/accept`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error accepting job: ${response.statusText}`);
            }

            // Update job status in local state
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job._id === id ? { ...job, status: 'Accepted' } : job
                )
            );

            setJobStatus('Job accepted successfully');
            toast("Job accepted successfully")
        } catch (error) {
            console.error('Accept error:', error);
            setJobStatus('Error accepting job');
        } finally {
            setLoadingJobs(false); // Reset loading state after action completes
        }
    };

    // Reject job application
    const rejectJob = async (id) => {
        try {
            setLoadingJobs(true); // Set loading state to true
            const response = await fetch(`http://localhost:8000/api/job/${id}/reject`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error rejecting job: ${response.statusText}`);
            }

            // Update job status in local state
            setJobs(prevJobs =>
                prevJobs.map(job =>
                    job._id === id ? { ...job, status: 'Rejected' } : job
                )
            );

            setJobStatus('Job rejected successfully');
            toast("Job rejected successfully")
        } catch (error) {
            console.error('Reject error:', error);
            setJobStatus('Error rejecting job');
        } finally {
            setLoadingJobs(false); // Reset loading state after action completes
        }
    };

    return (
        <>
            <div>
                <h1>Job Applications Panel:</h1>
                {jobStatus && <JobStatus jobStatus={jobStatus} />}
                {jobs.length > 0 ? (
                    <table className="jobs-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Programming Language</th>
                                <th>Experience</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job._id}>
                                    <td data-label="First Name">{job.firstname}</td>
                                    <td data-label="Last Name">{job.lastname}</td>
                                    <td data-label="Email">{job.email}</td>
                                    <td data-label="Phone">{job.phone}</td>
                                    <td data-label="Programming Language">{job.programmingLanguage}</td>
                                    <td data-label="Experience">{job.experience}</td>
                                    <td data-label="Actions">
                                        <button
                                            onClick={() => acceptJob(job._id)}
                                            disabled={loadingJobs} // Disable button when loading
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => rejectJob(job._id)}
                                            disabled={loadingJobs} // Disable button when loading
                                        >
                                            Reject
                                        </button>
                                        <button onClick={() => deleteJob(job._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No jobs found.</p>
                )}
            </div>
        </>
    );
};
