import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './GanttChart.css';

const CustomTooltipContent = ({ task }) => (
    <div className="custom-tooltip">
        <div className="tooltip-summary">
            <PersonOutlineIcon />  <strong>Summary</strong>
        </div>
        <div className="tooltip-detail">
            <div className="tooltip-label">Name</div>
            <div className="tooltip-value">{task.name}</div>
        </div>
        <div className="tooltip-detail">
            <div className="tooltip-label">Time</div>
            <div className="tooltip-value">{`${task.start}:00 - ${task.end}:00`}</div>
        </div>
        <div className="tooltip-detail">
            <div className="tooltip-label">Chair</div>
            <div className="tooltip-value">Chair {task.assignedChair}</div>
        </div>
        <div className="tooltip-detail">
            <div className="tooltip-label">Acuity Score (out of 5)</div>
            <div className="tooltip-value">{task.acuity}</div>
        </div>
        <div className="tooltip-notes border-top">
            <div className="tooltip-label">Notes</div>
            <div className="tooltip-value">{task.notes}</div>
        </div>
    </div>
);

export default CustomTooltipContent;
