import * as React from 'react';

export default function ChairListView({ chairScheduleData }) {
    const convertMinutesTo12HHMM = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const formattedHours = String(hours % 12 === 0 ? 12 : hours % 12).padStart(2, '0');
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedMinutes = String(mins).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${amPm}`;
    };

    if (!chairScheduleData || chairScheduleData.length === 0) {
        console.log('Chair schedule data is empty or undefined:', chairScheduleData);
        return <div>No schedule data available</div>;
    }

    return (
        <div className="overflow-x-auto">
            <div className="mx-auto bg-white rounded-lg">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="bg-headerBg rounded-t-lg">
                        <tr>
                            <th scope="col" className="px-8 py-6 text-left text-sm font-semibold text-headerText tracking-wider rounded-tl-lg">
                                Chair #
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-sm font-semibold text-headerText tracking-wider">
                                Nurse Name
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-sm font-semibold text-headerText tracking-wider">
                                Patient Name
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-sm font-semibold text-headerText tracking-wider">
                                Start Time
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-sm font-semibold text-headerText tracking-wider">
                                Infusion Length
                            </th>
                            <th scope="col" className="px-8 py-6 text-left text-sm font-semibold text-headerText tracking-wider rounded-tr-lg">
                                Acuity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {chairScheduleData.map((data, index) => (
                            <tr key={data._id}>
                                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{data.assignedChair}</td>
                                <td className="px-8 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img src={data.avatarSrc} alt="user" height="40px" width="40px" className="rounded-full mr-3" />
                                        <div>
                                            <div className="text-base font-semibold text-gray-900">{data.nurseName}</div>
                                            <div className="text-sm text-gray-500">{data.nurseEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{data.patientName}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{convertMinutesTo12HHMM(data.actualStartTime)}</td>
                                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{Math.floor(data.length / 60)} hrs</td>
                                <td className="px-8 py-4 whitespace-nowrap text-base">
                                    <span className={`px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full 
                                        ${data.acuity === 1 ? 'bg-acuityHigh text-white' : 
                                        data.acuity === 2 ? 'bg-acuityMid text-white' : 
                                        data.acuity === 3 ? 'bg-acuityLow text-white' : ''}`}>
                                        {data.acuity === 1 ? 'High' : 
                                        data.acuity === 2 ? 'Med' : 
                                        data.acuity === 3 ? 'Low' : ''}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
