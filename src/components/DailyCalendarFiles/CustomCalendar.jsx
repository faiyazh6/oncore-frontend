import axios from 'axios';
import { useEffect, useState } from 'react';
import NurseListView from '../NurseAssignments/NurseListView';
import ChairListView from '../NurseAssignments/ChairListView';
import DoubleChart from './forcastChart';
import GanttChart from '../NurseAssignments/GanttChart';
import GanttChartNurse from '../NurseAssignments/GanttChartNurse';
import { BsPrinter } from "react-icons/bs";
import { CiMedicalCross, CiUser } from "react-icons/ci";
import { HiDownload } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CheckCircleIcon } from '@heroicons/react/solid';
import { FaUserNurse, FaUserPlus, FaUserMinus } from 'react-icons/fa';


const CustomCalendar = (props) => {
    const { date } = props;
    const [value, setValue] = useState('1');
    const [btnSelect, setBtnSelect] = useState('Capacity Utilization');
    const [select, setSelect] = useState('Patient Acuity');

    const [optimizeData, setOptimizeData] = useState(null);
    const [nurseScheduleData, setNurseScheduleData] = useState(null);
    const [chairScheduleData, setChairScheduleData] = useState(null);
    const [acuityMixArray, setAcuityMixArray] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const date = "2024-05-28"; // TODO: needs to change to today's date once everything is working

                const response = await axios.get(`http://localhost:4000/api/optimize-schedule?date=${date}`);
                console.log('Response:', response.data.payload); // Log the response to check the structure
                setOptimizeData(response.data.payload);
            } catch (error) {
                console.error('Error fetching nurse data:', error);
            }
        };

        if (!optimizeData) {
            fetchData();
        }

    }, [optimizeData]);

    useEffect(() => {
        if (optimizeData) {
            const acuityMixArray = optimizeData?.acuityMix && Object.keys(optimizeData?.acuityMix);
            setAcuityMixArray(acuityMixArray);

            const nurseSchedule = optimizeData?.nurseSchedule?.map(nurse => ({
                assignedPatients: nurse?.assignedPatients?.map(patientId => {
                    const patient = optimizeData?.newPatientSchedule.find(patient => patient?.patientId === patientId);
                    return patient ? { ...patient, avatarSrc: 'https://bit.ly/sage-adebayo', endTime: nurse?.endTime, nurseEmail: nurse?.nurseEmail, nurseId: nurse?.nurseId, nurseName: nurse?.nurseName, startTime: nurse?.startTime } : null;
                }).filter(Boolean)
            }));

            const nurseScheduleData = nurseSchedule?.length > 0 && nurseSchedule?.flatMap((item) => item?.assignedPatients);
            setNurseScheduleData(nurseScheduleData);

            const updatedChairSchedules = optimizeData?.chairSchedule?.map(chair => ({
                ...chair,
                assignedPatients: chair?.assignedPatients?.map(patientId => {
                    const patient = optimizeData?.newPatientSchedule.find(p => p?.patientId === patientId);
                    if (!patient) return null;

                    const nurse = optimizeData?.nurseSchedule?.find(n => n?.nurseId === patient?.assignedNurse);
                    return {
                        ...patient,
                        avatarSrc: 'https://bit.ly/sage-adebayo',
                        nurseId: nurse?.nurseId,
                        nurseName: nurse?.nurseName,
                        nurseEmail: nurse?.nurseEmail
                    };
                }).filter(Boolean)
            }));

            const chairScheduleData = updatedChairSchedules?.length > 0 && updatedChairSchedules?.flatMap((item) => item?.assignedPatients);
            setChairScheduleData(chairScheduleData);
        }
    }, [optimizeData]);

    if (!optimizeData) {
        return <div>Loading...</div>;
    }

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const cardData = [
        {
            number: '15%',
            caption: "Throughput Increase"
        },
        {
            number: '30%',
            caption: "Reduction in Patient Wait Times"
        },
        {
            number: "15%",
            caption: "Reduction in Nursing Overtime"
        },
    ];

    const cardBottomData = [
        {
            number: optimizeData?.newScore || 0,
            caption: "Overall Score"
        },
        {
            number: optimizeData?.totalAppointments || 0,
            caption: "Allocated Appts."
        },
        {
            number: optimizeData?.numberOfNurses || 0,
            caption: "Total Nurses"
        },
        {
            number: optimizeData?.numberOfChairs || 0,
            caption: "Total Chairs"
        },
        {
            number: "Acuity Mix",
            caption: optimizeData?.acuityMix && acuityMixArray?.length > 0 ? (
                <>
                    (1):<span className='text-black'>{optimizeData?.acuityMix[acuityMixArray[0]] || 0} </span>
                    (2):<span className='text-black'>{optimizeData?.acuityMix[acuityMixArray[1]] || 0} </span>
                    (3):<span className='text-black'>{optimizeData?.acuityMix[acuityMixArray[2]] || 0} </span>
                    (4):<span className='text-black'>{optimizeData?.acuityMix[acuityMixArray[3]] || 0} </span>
                    (5+):<span className='text-black'>{optimizeData?.acuityMix[acuityMixArray[4]] || 0} </span>
                </>
            ) : (
                "0"
            )
        }
    ];

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mx-8'>
                {
                    cardData.map((item) => (
                        <div key={item.caption} className='relative p-6 shadow-md rounded-xl bg-white border border-green-200'>
                            <div className='absolute top-4 left-6 z-10'>
                                <CheckCircleIcon className='text-green-500 w-8 h-8' />
                            </div>
                            <div className='flex justify-center'>
                                <div className='text-center'>
                                    <div className='text-2xl font-bold text-gray-800'>{item.number}</div>
                                    <div className='text-sm font-medium text-gray-600'>{item.caption}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/*TODO: NEED TO MAKE ALL THE BUTTONS AND TABS NOT HAVE BLUE OUTLINES WHEN CLICKED*/}

            <div className='flex justify-between items-center mb-10'>
                <div className='flex flex-wrap items-center pt-5'>
                    <button className={`h-9 text-sm font-semibold px-4 m-1 rounded ${btnSelect === "Nurse Schedule" ? "text-white bg-blue-900" : "text-black bg-gray-100"}`} onClick={() => { setBtnSelect("Nurse Schedule") }}>
                        Nurse Schedule
                    </button>
                    <button className={`h-9 text-sm font-semibold px-4 m-1 rounded ${btnSelect === "Chair Schedule" ? "text-white bg-blue-900" : "text-black bg-gray-100"}`} onClick={() => setBtnSelect("Chair Schedule")}>
                        Chair Schedule
                    </button>
                    <button className={`h-9 text-sm font-semibold px-4 m-1 rounded ${btnSelect === "Capacity Utilization" ? "text-white bg-blue-900" : "text-black bg-gray-100"}`} onClick={() => setBtnSelect("Capacity Utilization")}>
                        Capacity Utilization
                    </button>
                </div>
                <div className='flex flex-wrap items-center pt-5'>
                    <button className='h-9 bg-blue-900 text-white text-sm font-semibold px-4 m-1 rounded flex items-center'>
                        <HiDownload className='mr-1' /> Download
                    </button>
                    <button className='h-9 bg-blue-900 text-white text-sm font-semibold px-4 m-1 rounded flex items-center'>
                        <BsPrinter className='mr-1' />Print
                    </button>
                </div>
            </div>
            {btnSelect !== "Capacity Utilization" &&
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <button className={`text-sm font-medium px-4 py-2 ${value === '1' ? "border-b-2 border-blue-900" : ""}`} onClick={() => setValue('1')}>Gantt Chart</button>
                            <button className={`text-sm font-medium px-4 py-2 ${value === '2' ? "border-b-2 border-blue-900" : ""}`} onClick={() => setValue('2')}>List View</button>
                        </div>
                        <div className='relative'>
                            {/*TODO: NEEDS TO BE CHANGE TO THE OTHER DROP DOWN STYLING*/}
                            <select className='h-9 bg-gray-100 text-sm rounded' value={select} onChange={handleSelectChange}>
                                <option value="Patient Acuity">Patient Acuity</option>
                                <option value="Duration">Duration</option>
                                <option value="Chair">Chair</option>
                            </select>
                        </div>
                    </div>
                    {value === '1' && (
                        <div>
                            {btnSelect === "Chair Schedule" ? (
                                <div className='bg-white rounded-xl p-6'>
                                    <GanttChart optimizeData={optimizeData} />
                                </div>
                            ) : btnSelect === "Nurse Schedule" ? (
                                <div className='bg-white rounded-xl p-6'>
                                    <GanttChartNurse optimizeData={optimizeData} />
                                </div>
                            ) : null}
                        </div>
                    )}
                    {value === '2' && (
                        <div>
                            {btnSelect === "Nurse Schedule" ? (
                                <div className='bg-white rounded-xl p-6'>
                                    <NurseListView nurseScheduleData={nurseScheduleData} />
                                </div>
                            ) : btnSelect === "Chair Schedule" ? (
                                <div className='bg-white rounded-xl p-6'>
                                    <ChairListView chairScheduleData={chairScheduleData} />
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
            }
            {btnSelect === "Capacity Utilization" && (
                <div className='my-3'>
                    <DoubleChart optimizeData={optimizeData} />
                </div>
            )}
            <div className={`flex ${btnSelect === "Capacity Utilization" ? "justify-end" : "justify-between"} items-center`}>
                {btnSelect !== "Capacity Utilization" && (
                    <div className='flex flex-wrap items-center pt-5'>
                        <div className='flex items-center m-2 ms-3 me-3 font-bold text-sm'>
                            <div className='mr-2 w-7 h-7 bg-gantt-low rounded-full' />1
                        </div>
                        <div className='flex items-center m-2 me-3 font-bold text-sm'>
                            <div className='mr-2 w-7 h-7 bg-gantt-mid rounded-full' />2
                        </div>
                        <div className='flex items-center m-2 me-3 font-bold text-sm'>
                            <div className='mr-2 w-7 h-7 bg-gantt-high rounded-full' />3-4
                        </div>
                        <div className='flex items-center m-2 me-3 font-bold text-sm'>
                            <div className='mr-2 w-7 h-7 bg-blue-900 rounded-full' />5+
                        </div>
                    </div>
                )}
                <div className='flex flex-wrap items-center pt-5'>
                    <button className='h-9 bg-gray-100 text-dark text-sm font-semibold px-4 m-1 rounded flex items-center'>
                        <FaUserNurse className='mr-2 w-4 h-4 text-dark' /> Add Nurse
                    </button>
                    <button className='h-9 bg-gray-100 text-dark text-sm font-semibold px-4 m-1 rounded flex items-center'>
                        <FaUserPlus className='mr-2 w-4 h-4' /> Add Patient
                    </button>
                    <button className='h-9 bg-gray-100 text-dark text-sm font-semibold px-4 m-1 rounded flex items-center'>
                        <FaUserMinus className='mr-2 w-4 h-4 text-opacity-80' /> Remove Patient
                    </button>
                </div>
            </div>
            
            <div className="p-6 flex justify-between items-start flex-wrap my-3 mt-5 bg-white shadow-md rounded-xl">
                {
                    cardBottomData.map((item) => (
                        <div key={item.caption} className='flex items-center py-4'>
                            <div className={`${item.caption === "Acuity mix" ? "text-right" : "text-center"}`}>
                                <>
                                    <div className='text-lg font-semibold'>{item.number}</div>
                                    <div className='text-sm text-gray-500'>{item.caption}</div>
                                </>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default CustomCalendar;
