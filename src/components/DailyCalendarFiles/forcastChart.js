import moment from 'moment';
import { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const Forecast = ({ optimizeData }) => {
    const [chartData, setChartData] = useState([]);

    const convertMinutesToHHMM = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(mins).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    };

    const chartDetails = optimizeData?.utilizationCurve?.length > 0
        ? optimizeData?.utilizationCurve?.map(patient => {
            return {
                time: convertMinutesToHHMM(patient?.time),
                patientCount: patient?.patientCount,
            };
        })
        : [];

    const filterData = () => {
        const timesToInclude = ["00", "30"];
        const filterTimeChartData = chartDetails?.length > 0 && chartDetails?.filter(item => timesToInclude?.includes(item?.time?.split(":")[1]));
        setChartData(filterTimeChartData);
    };

    const time = chartData?.length > 0 ? chartData?.map((item) => item?.time) : [];

    const maxPatientCount = chartData?.length > 0 && chartData?.reduce((max, item) => (item?.patientCount + 2 > max ? item?.patientCount + 2 : max), chartData[0]?.patientCount + 2) || 0;

    const options = {
        series: [
            {
                type: 'column',
                data: chartData?.length > 0 ? chartData?.map((item) => item?.patientCount) : [],
            },
            {
                type: 'line',
                data: chartData?.length > 0 ? chartData?.map((item) => item?.patientCount + 2) : [],
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
                dataLabels: {
                    show: false,
                },
            },
        },
        stroke: {
            width: [0, 4],
            curve: 'smooth',
            dashArray: [0, 5],
            colors: ['#ff6564']
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        labels: time,
        position: 'bottom',
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
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
        colors: ['#91b1ff'],
        tooltip: {
            enabled: false,
        },
    };

    useEffect(() => {
        filterData();
    }, [optimizeData]);

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="text-center pt-2">
                <h6 className="text-lg font-semibold">
                    Today's Forecast <span className="font-medium">({optimizeData?.date ? moment(optimizeData?.date).format('MM/DD/YYYY') : "-"})</span>
                </h6>
            </div>
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

export default Forecast;
