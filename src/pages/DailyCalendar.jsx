import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import CircleLoader from '../components/DailyCalendarFiles/circleLoader';
import CustomCalendar from '../components/DailyCalendarFiles/CustomCalendar';
import Identify from './Identify';
import NavButtons from '../components/schedule-templates/NavButtons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const dropzoneStyle = {
  backgroundColor: '#ffffff0d',
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%238E98A3FF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  borderRadius: '10px',
  padding: '20px',
  boxShadow: 'rgb(0 0 0 / 12%) 0px 0px 32px -13px',
  display: "flex",
  justifyContent: 'center',
  alignItems: "center",
  flexDirection: "column",
  height: '60vh',
  textAlign: "center",
  marginTop: "8px",
  margin: "5px",
};

function MyDropzone(props) {
  const { setChange } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState(false);
  const [file, setFile] = useState(null);

  const getFileExtension = (filename) => {
    const parts = filename.split('.');
    if (parts.length > 1) {
      return parts.pop();
    }
    return '';
  }

  const handleUpload = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile[0]);

      await axios.post(`/api/upload-schedule`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  const onDrop = acceptedFiles => {
    setFile(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRedirect = () => {
    const duration = 1000;
    const increment = 100;
    const totalIncrements = duration / increment;
    const incrementAmount = 100 / totalIncrements;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += incrementAmount;
      setProgress(currentProgress);
      setIsLoading(true);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setView(true);
          setIsLoading(false);
          handleUpload(file);
        }, 5000);
      }
    }, increment);
  };

  return (
    <>
      {
        file?.length > 0 ? (
          <div style={dropzoneStyle}>
            <img src={"/images/DailyCalendar/file.png"} alt="file" width={"69px"} height={"103px"} style={{ marginBottom: "25px" }} />
            <p className="text-gray-800 text-lg font-semibold pt-2">{file && file[0]?.name}</p>
            <p className="text-gray-800 text-lg opacity-50 uppercase pt-1">{getFileExtension(file[0]?.name)}</p>
            {
              !isLoading && (
                <div>
                  {!view ? (
                    <button
                      onClick={handleRedirect}
                      className="bg-blue-900 text-white font-semibold py-2 px-6 rounded mt-6 mb-2 shadow-none"
                    >
                      Start
                    </button>
                  ) : (
                    <button
                      onClick={() => setChange(2)}
                      className="bg-green-500 text-white font-semibold py-2 px-4 rounded mt-6 mb-2 shadow-none flex items-center"
                    >
                      <FaCheck className="mr-2" />
                      View Results
                    </button>
                  )}
                </div>
              )
            }
            <div className="flex justify-center">
              {isLoading && (
                <div className="mt-4 mb-2">
                  <CircleLoader percentage={progress} className="py-4" />
                </div>
              )}
            </div>
            <p className="text-blue-900 text-sm font-semibold cursor-pointer" onClick={() => setFile(null)}>Replace File</p>
          </div>
        ) : (
          <div {...getRootProps()} style={dropzoneStyle}>
            <img src={"/images/DailyCalendar/cloud.png"} alt="cloud" width={"95px"} height={"70px"} style={{ marginBottom: "29px"} } />
            <p className="font-bold text-lg">Upload Today's Schedule</p>
            <p className="text-gray-800 text-sm opacity-50">Supported formats XLSX,CSV</p>
            <div className="mt-5 pt-3">
              <p className="text-gray-800 text-sm font-semibold">Drag and Drop</p>
              <p className="text-gray-800 text-sm opacity-50 my-2">- or -</p>
              <button className="bg-blue-900 text-white font-semibold py-2 px-4 rounded shadow-none">Select File</button>
            </div>
          </div>
        )
      }
    </>
  );
}

const Schedule = () => {
  const [change, setChange] = useState(() => {
    const saved = localStorage.getItem('change');
    return saved !== null ? JSON.parse(saved) : 1;
  });
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('change', JSON.stringify(change));
  }, [change]);

  const checkLockStatus = async () => {
    const date = '2024-05-28'; // Ensure this matches the date in your database
    try {
      const response = await axios.get(`http://localhost:4000/api/optimize-schedule?date=${date}`);
      if (response.data.payload.locked) {
        setIsLocked(true);
      }
    } catch (error) {
      console.error('Error checking lock status:', error);
    }
  };

  useEffect(() => {
    checkLockStatus();
  }, []);

  const handlePrevious = () => {
    if (change > 1) setChange(change - 1);
  };

  const handleLockSchedule = async () => {
    const date = '2024-05-28'; // Ensure this matches the date in your database
    console.log('Attempting to lock schedule for date:', date); // Debugging line
    try {
      const response = await fetch('http://localhost:4000/api/lock-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to lock schedule: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Server response:', data); // Debugging line
      alert(data.message); // Display the message from the server
      setIsLocked(true);
      navigate('/nurse-view'); // Redirect to Nurse View page after locking the schedule
    } catch (error) {
      alert('Failed to lock schedule');
      console.error('Error:', error);
    }
  };

  // The below method is for development/testing purposes of locking the schedule! 
  const handleUndoLock = async () => {
    const date = '2024-05-28'; // Ensure this matches the date in your database
    console.log('Attempting to unlock schedule for date:', date); // Debugging line
    try {
      const response = await fetch('http://localhost:4000/api/unlock-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to unlock schedule: ${errorText}`);
      }
  
      const data = await response.json();
      console.log('Server response:', data); // Debugging line
      alert(data.message); // Display the message from the server
      setIsLocked(false); // Enable the Back button again
    } catch (error) {
      alert('Failed to unlock schedule');
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="lg:pl-64">
      <div className="max-w-6xl mx-auto py-4 px-4 w-full">
        <div className="flex items-start">
          <button
            onClick={handlePrevious}
            className={`text-blue-900 text-sm flex items-center font-bold ${change === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-50 hover:cursor-not-allowed'}`}
            disabled={change === 1 || isLocked} // Disable button if step is 1 or schedule is locked
          >
            <svg width="16" height="16" fill="currentColor" className="bi bi-arrow-left mr-2" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 w-full">
        <div>
          <div className="flex h-16 shrink-0 items-start justify-between bg-white">
            <div className="flex flex-col items-start">
              <p className="text-sm text-gray-800 opacity-60">Step {change}/3</p>
              <h1 className="font-bold text-4xl font-manrope text-custom-blue mt-1">
                {change === 1 ? "Upload" : change === 2 ? "Identify" : change === 3 ? "Optimize" : ""}
              </h1>
            </div>
            {change === 3 && (
              <>
                <button
                  onClick={handleLockSchedule}
                  className={`py-2 px-4 rounded mt-6 mb-2 shadow-none ${isLocked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-700'}`}
                  disabled={isLocked} // Disable button if locked
                >
                  {isLocked ? 'Schedule Submitted' : 'Submit Schedule'}
                </button>
                {/* The button functionality below is for testing purposes */}
                <button
                  onClick={handleUndoLock}
                  className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded mt-6 mb-2 shadow-none hover:bg-yellow-700"
                  disabled={!isLocked} // Disable button if not locked
                >
                  Undo Submission
                </button>
              </>
            )}
          </div>

          <div className="bg-white print-hidden py-6 mb-6">
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6">
              <NavButtons />
            </div>
          </div>

          {change === 1 ? (
            <div className="py-3">
              <MyDropzone setChange={setChange} change={change} />
            </div>
          ) : change === 2 ? (
            <Identify setChange={setChange} change={change} />
          ) : change === 3 ? (
            <CustomCalendar setChange={setChange} change={change} />
          ) : ""}

        </div>
      </div>
    </div>
  );
}

export default Schedule;