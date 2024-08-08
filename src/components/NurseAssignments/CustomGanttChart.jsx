import React from 'react';
import './GanttChart.css';
import CustomTooltipContent from './tooltip';

const CustomGanttChart = (props) => {
    const { data, resources } = props.data;

    const hours = Array.from({ length: 11 }, (_, i) => i + 8); //TODO: we need to update this to match the hours in the infusion center

    // Function to check if two events overlap
    const isOverlapping = (a, b) => a.start < b.end && b.start < a.end;

    // Generate JSX for each resource's tasks
    const ganttTasks = resources?.map(resource => {
        const lines = data
            .filter(task => task.resource === resource.Id)
            .reduce((acc, task) => {
                // Check if the task is already in acc
                const taskExists = acc.some(line => line.some(t => t.Id === task.Id));
                if (taskExists) {
                    return acc; // Skip this task as it is already added
                }

                // Try to find a line where the task can be placed
                const lineFound = acc.find(line => !line.some(t => isOverlapping(t, task)));

                if (lineFound) {
                    lineFound.push(task);
                } else {
                    acc.push([task]);
                }

                return acc;
            }, []);
        return (
            <>
            <div key={resource.name} className="flex">
                <div className="flex-none w-1/6 p-4 font-bold text-sm border-r border-gray-200">
                    {resource.name}
                    <div className="text-gray-400">{resource?.appointments || ''}</div>
                </div>

                <div className="relative flex-grow cursor-pointer">
                    {lines?.map((line, i) => (
                        <div key={i} className="relative flex items-center h-10">
                            {line?.map(task => (
                                <div
                                    key={task.Id}
                                    onClick={() => alert(`Click on ${task.name}`)}
                                    className={`absolute flex items-center h-8 text-white cursor-pointer shadow-md rounded px-2 py-1 text-xs overflow-hidden ${
                                        task.acuity === 1 ? 'bg-gantt-high' : 
                                        task.acuity === 2 ? 'bg-gantt-low' : 
                                        task.acuity === 3 ? 'bg-gantt-mid' : ''
                                    }`}
                                    style={{
                                        left: `${(task.start - 8) * 100 / (hours.length - 1)}%`,
                                        width: `${(task.end - task.start) * 100 / (hours.length - 1)}%`,
                                    }}
                                >
                                    <span className='leftCircle'>{task.name.split(" ").map((item) => item[0]).join('')}</span>
                                    <span className="truncate">{task.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            </>
        );
    });

    return (
        <div className="mx-auto bg-white rounded-lg">
            <div className="flex bg-headerBg rounded-t-lg items-center">
                <div className="flex-none w-1/6 p-4 text-transparent">
                    <div>Resource Appointments</div>
                </div>
                <div className="flex-grow flex">
                    {hours.map(hour => (
                        <div key={hour} className="flex-1 text-center py-4 text-sm font-semibold text-headerText uppercase tracking-wider">
                            {hour}:00
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-b-lg">
                {ganttTasks}
            </div>
        </div>
    );
};

export default CustomGanttChart;
