import React from 'react';
import CustomGanttChart from './CustomGanttChart';

const GanttChartNurse = ({ optimizeData }) => {
    const editOptions = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        mode: 'Auto',
    };

    const convertMinutesToHHMM = (minutes, HH) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(mins).padStart(2, '0');
        return HH ? Number(formattedHours) : `${formattedHours}:${formattedMinutes}`;
    };

    // const nurseSchedule = nurseData;
    const nurseSchedule = optimizeData?.nurseSchedule?.map(nurse => ({
        ...nurse,
        avatarSrc: 'https://bit.ly/sage-adebayo',
        assignedPatients: nurse?.assignedPatients?.map(patientId =>
            optimizeData?.newPatientSchedule?.find(patient => patient?.patientId === patientId)
        ).filter(Boolean)
    }));

    const updatedNurseData = [];
    const updatedPatientData = [];
    nurseSchedule?.forEach((item) => {
        updatedNurseData?.push({
            ...item,
            Id: item?.nurseId,
            name: item?.nurseName,
            appointments: `${item?.assignedPatients?.length} Appts`,
            StartTime: new Date(`2024-06-10T${convertMinutesToHHMM(item?.startTime)}:00`),
            EndTime: new Date(`2024-06-10T${convertMinutesToHHMM(item?.endTime)}:00`),
        })
        item?.assignedPatients?.forEach((i) => {
            updatedPatientData?.push({
                ...i,
                Id: i?.patientId,
                resource: item?.nurseId,
                name: i?.patientName,
                start: convertMinutesToHHMM(i?.actualStartTime, true),
                end: convertMinutesToHHMM(i?.actualEndTime, true),
                StartTime: new Date(`2024-06-10T${convertMinutesToHHMM(i?.actualStartTime)}:00`),
                EndTime: new Date(`2024-06-10T${convertMinutesToHHMM(i?.actualEndTime)}:00`),
            })
        })
    })

    const taskFields = {
        id: 'Id',
        name: 'Name',
        startDate: 'StartTime',
        endDate: 'EndTime',
        child: 'Subtasks'
    };

    const getInitials = (name) => {
        const initials = name.split(' ').map(part => part[0]).join('');
        return initials.toUpperCase();
    };

    const nameTemplate = (props) => {
        if (props.hasChildRecords) {
            return (
                <div className="name-cell">
                    <span className="name-text-sidebar">{props.Name}</span>
                </div>
            );
        }
        return null;
    };
    const labelTemplate = (props) => {
        // if (!props.hasChildRecords) {
        console.log(props)
        return (
            <div className="label-template">
                <div className="initials-circle">{getInitials(props.Name)}</div>
                <span className="name-text">{props.Name}</span>
            </div>
        );
        // }
    };

    return (
        <div>
            <CustomGanttChart data={{ data: updatedPatientData, resources: updatedNurseData }} />
        </div>
    );
};

export default GanttChartNurse;
