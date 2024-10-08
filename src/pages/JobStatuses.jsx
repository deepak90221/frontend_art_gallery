import PropTypes from 'prop-types';
import './JobStatus.css'; // Add your styles here

export const JobStatus = ({ jobStatus }) => {
    const statusType = jobStatus.includes('accepted') ? 'Accepted' : 'Rejected';

    return (
        <>
        <div className={`job-status-message ${statusType.toLowerCase()}`}>
            <h2>Job {statusType}</h2>
            <p>{jobStatus}</p>
        </div>
        </>
    );
};

JobStatus.propTypes = {
    jobStatus: PropTypes.string,
};
