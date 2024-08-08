import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { AiFillCaretDown } from 'react-icons/ai';
const Barchart = ({ analyze }) => {
    const [chartData, setChartData] = useState([]);
    const convertMinutesToHHMM = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(mins).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    };
    const chartDetails = analyze?.actualPatients?.length > 0
        ? analyze.actualPatients.map(patient => {
            const colorInfo = analyze?.hourlyColors?.find(color => color?.time === patient?.time);
            return {
                time: convertMinutesToHHMM(patient?.time),
                actualPatients: patient?.patientCount,
                color: colorInfo ? colorInfo?.color : null
            };
        })
        : [];
    const filterData = () => {
        const timesToInclude = ["00", "30"];
        const filterTimeChartData = chartDetails?.length > 0 && chartDetails?.filter(item => timesToInclude?.includes(item?.time?.split(":")[1]));
        setChartData(filterTimeChartData);
    };
    const color = chartData?.length > 0 ? chartData?.map((item) => item?.color) : [];
    const categories = chartData?.length > 0 ? chartData?.map((item) => item?.time) : [];
    const maxPatientCount = chartData?.length > 0 && chartData?.reduce((max, item) => (item?.actualPatients + 2 > max ? item?.actualPatients + 2 : max), chartData[0]?.actualPatients + 2) || 0;
    const options = {
        series: [
            {
                type: 'column',
                data: chartData?.length > 0 ? chartData?.map((item) => item?.actualPatients) : [],
            },
            {
                type: 'line',
                data: chartData?.length > 0 ? chartData?.map((item) => item?.actualPatients + 2) : [],
            },
        ],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                }
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                columnWidth: '30%',
            },
        },
        stroke: {
            width: [0, 4],
            curve: 'smooth',
            dashArray: [0, 5],
            colors: ['#FF6564']
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        labels: categories,
        xaxis: {
            position: 'bottom',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: '#fff',
        },
        annotations: {
            yaxis: [
                {
                    y: maxPatientCount,
                    borderColor: '#000',
                    borderWidth: 2,
                    label: {
                        borderRadius: '10px',
                        style: {
                            background: '#081B5B',
                            color: '#fff',
                            padding: {
                                top: 4,
                                right: 10,
                                bottom: 6,
                                left: 10
                            }
                        },
                        text: 'Max-Capacity',
                        offsetY: 8,
                        offsetX: -1,
                    },
                    strokeDashArray: 0,
                    strokeColor: '#000',
                    strokeWidth: 4,
                },
            ],
        },
        colors: color,
        tooltip: {
            enabled: false,
        },
    };
    useEffect(() => {
        filterData();
    }, [analyze]);
    return (
        <div>
            <div className="text-2xl font-bold mb-4">Chair Utilization</div>
            <ApexCharts options={options} series={options.series} type="line" height={350} />
            <div className="flex flex-wrap items-center justify-center pt-5">
                <div className="m-2 font-bold text-[#10253F] flex items-center">
                    <span className="mr-2 w-3 h-3 rounded-full bg-[#91B1FF]"></span>Under by 2+ Patients
                </div>
                <div className="m-2 font-bold text-[#10253F] flex items-center">
                    <span className="mr-2 w-3 h-3 rounded-full bg-[#91B1FF]"></span>At Max Capacity
                </div>
                <div className="m-2 font-bold text-[#10253F] flex items-center">
                    <span className="mr-2 w-3 h-3 rounded-full bg-[#324178]"></span>Over by 1-2 Patients
                </div>
                <div className="m-2 font-bold text-[#10253F] flex items-center">
                    <span className="mr-2 w-3 h-3 rounded-full bg-[#4C76FF]"></span>Well Over Max Capacity
                </div>
                <div className="m-2 font-bold flex items-center">
                    <img src={"/images/DailyCalendar/line.png"} alt='line' className="h-1 mr-2" />Target
                </div>
            </div>
        </div>
    );
};
export default Barchart;