import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineLock } from 'react-icons/ai'; // Import lock icon from react-icons
import '../index.css'; // Import global styles
import GanttChartNurse from '../components/NurseAssignments/GanttChartNurse';
import NurseListView from '../components/NurseAssignments/NurseListView';

const NurseView = () => {
  const [nurseData, setNurseData] = useState(null);
  const [nurseScheduleData, setNurseScheduleData] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const fetchNurseData = async () => {
      try {
        const date = "2024-05-28"; // TODO: needs to change to today's date once everything is working
        const nurseId = 0; // TODO: needs to change to the logged in nurses's user id once everything is working

        const response = await axios.get(`http://localhost:4000/api/optimize-schedule?date=${date}&nurseId=${nurseId}`);
        console.log('Response:', response.data.payload); // Log the response to check the structure
        setNurseData(response.data.payload);
        setIsLocked(response.data.payload.locked);

      } catch (error) {
        console.error('Error fetching nurse data:', error);
      }
    };

    fetchNurseData();
  }, []);

  useEffect(() => {
    if (nurseData && nurseData.locked) {
      const nurseSchedule = nurseData.nurseSchedule.map(nurse => ({
        assignedPatients: nurse.assignedPatients.map(patientId => {
          const patient = nurseData.newPatientSchedule.find(patient => patient.patientId === patientId);
          return patient ? { 
            ...patient, 
            endTime: nurse.endTime, 
            nurseEmail: nurse.nurseEmail, 
            nurseId: nurse.nurseId, 
            nurseName: nurse.nurseName, 
            startTime: nurse.startTime 
          } : null;
        }).filter(Boolean)
      }));

      console.log('Processed nurseSchedule:', nurseSchedule);

      const flatNurseScheduleData = nurseSchedule.flatMap((item) => item.assignedPatients);
      console.log('Flat nurseScheduleData:', flatNurseScheduleData);

      setNurseScheduleData(flatNurseScheduleData);
    }
  }, [nurseData]);

  if (!nurseData) {
    return <div>Loading...</div>;
  }

  if (!isLocked) {
    return (
      <div className="lg:pl-64 flex flex-col items-center justify-center h-screen text-center">
        <AiOutlineLock className="text-6xl text-black-900 mb-4" /> {/* Lock icon with styling */}
        <p className="text-4xl font-bold text-black-900 mb-4">Nurse View</p> {/* Title */}
        <p className="text-lg font-semibold text-black-900">
          Today's charge nurse has not submitted the schedule yet. Check back later!
        </p>
      </div>
    );
  }

  const calculateNurseAcuity = (nurseId, nurses, newPatientSchedule) => {
    const nurse = nurses.find(n => n.nurseId === nurseId);
    
    if (!nurse) {
      throw new Error(`Nurse with ID ${nurseId} not found`);
    }

    const acuitySum = nurse.assignedPatients.reduce((sum, patientId) => {
      const patient = newPatientSchedule.find(p => p.patientId === patientId);
      return sum + (patient ? patient.acuity : 0);
    }, 0);

    return acuitySum;
  };

  return (
    <div className="lg:pl-64">
      <div className="my-5 flex h-auto sm:h-16 flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl font-manrope text-custom-blue mb-4 sm:mb-0">Hi {nurseData.nurseSchedule[0].nurseName},</h1>
      </div>

      <main className="">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="nurse-view">
            <div className="daily-overview">
              <h2 className="font-bold text-2xl font-manrope text-custom-blue my-4">Daily Overview</h2>
              <p>
                Today, you will see {nurseData.nurseSchedule[0].assignedPatients.length} patients, starting from {nurseData.nurseSchedule[0].startTime} to {nurseData.nurseSchedule[0].endTime}. 
                Your total patient acuity over the day is {calculateNurseAcuity(nurseData.nurseSchedule[0].nurseId, nurseData.nurseSchedule, nurseData.newPatientSchedule)}, and your 30 minute lunch break is at TODO.
              </p>
            </div>
            <div className="patient-schedule">
              <h2 className="font-bold text-2xl font-manrope text-custom-blue my-4">Today's Schedule</h2>
              <GanttChartNurse optimizeData={nurseData}/>
            </div>
            <div className="patient-list">
              <h2 className="font-bold text-2xl font-manrope text-custom-blue my-4">Patient List</h2>
              <NurseListView nurseScheduleData={nurseScheduleData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NurseView;
