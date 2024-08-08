import { AiOutlineUpload } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BarChart from '../components/DailyCalendarFiles/barchart';
import RadialBar from '../components/DailyCalendarFiles/areaChart';

const Identify = (props) => {
    const { setChange, date } = props;
    const [select, setSelect] = useState('Paoli Center');
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(false);

    const [analyze, setAnalyze] = useState(null);
    const [acuityMixArray, setAcuityMixArray] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const date = "2024-05-28"; // TODO: needs to change to today's date once everything is working

                const response = await axios.get(`http://localhost:4000/api/analyze-schedule?date=${date}`);
                console.log('Response:', response.data.payload); // Log the response to check the structure
                setAnalyze(response.data.payload);
            } catch (error) {
                console.error('Error fetching nurse data:', error);
            }
        };

        if (!analyze) {
            fetchData();
        }

    }, [analyze]);

    useEffect(() => {
        if (analyze) {
            const acuityMixArray = analyze?.acuityMix && Object.keys(analyze?.acuityMix);
            setAcuityMixArray(acuityMixArray);
        }
    }, [analyze]);

    if (!analyze) {
        return <div>Loading...</div>;
    }

    const cardData = [
        {
            number: analyze?.overallScore || 0,
            caption: "Overall Score"
        },
        {
            number: analyze?.allocatedAppointments || 0,
            caption: "Allocated Appts."
        },
        {
            number: analyze?.numberOfNurses || 0,
            caption: "Total Nurses"
        },
        {
            number: analyze?.numberOfChairs || 0,
            caption: "Total Chairs"
        },
        {
            number: "Acuity Mix",
            caption: analyze?.acuityMix && acuityMixArray?.length > 0 ? (
                <>
                    (1):<span className="text-black">{analyze?.acuityMix[acuityMixArray[0]] || 0} </span>
                    (2):<span className="text-black">{analyze?.acuityMix[acuityMixArray[1]] || 0} </span>
                    (3):<span className="text-black">{analyze?.acuityMix[acuityMixArray[2]] || 0} </span>
                    (4):<span className="text-black">{analyze?.acuityMix[acuityMixArray[3]] || 0} </span>
                    (5+):<span className="text-black">{analyze?.acuityMix[acuityMixArray[4]] || 0} </span>
                </>
            ) : (
                0
            )
        }
    ];

    const handleRedirect = () => {
        const duration = 5000; // 5 seconds in milliseconds
        const increment = 100; // Update progress every 100 milliseconds
        const totalIncrements = duration / increment;
        const incrementAmount = 100 / totalIncrements;

        let currentProgress = 0;
        setLoading(true);
        const interval = setInterval(() => {
            currentProgress += incrementAmount;
            if (currentProgress >= 100) {
                clearInterval(interval);
                setView(true);
                setLoading(false);
            }
        }, increment);
    };

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="p-6 flex justify-between items-start flex-wrap my-3 mt-5 bg-white shadow-md rounded-xl">
                {
                    cardData.map((item) => (
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

            <div className="my-5 p-6 bg-white rounded-lg shadow">
                <BarChart analyze={analyze} />
            </div>

            <div className="flex justify-center">
                {!loading && !view ? (
                    <button
                        className="font-bold bg-blue-900 text-white py-2 px-16 rounded shadow"
                        onClick={handleRedirect}
                    >
                        Ready to Optimize?
                    </button>
                ) : loading ? (
                    <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
                        <div className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-500 animate-progress"></div>
                    </div>
                ) : (
                    <button
                        className="bg-green-500 text-white py-2 px-16 rounded shadow flex items-center"
                        onClick={() => setChange(3)}
                    >
                        View Result <ArrowForwardIcon className="ml-2" />
                    </button>
                )}
            </div>

            <div className="my-5 p-6 bg-white rounded-lg shadow mt-8">
                <div className="text-2xl mb-4 font-bold">Areas for Improvement</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
                  {[
                    {
                      value: analyze?.overallScore || 0,
                      label: ['Overall Score'],
                    },
                    {
                      value: analyze?.nursingOverTimeScore || 0,
                      label: ['Nursing Overtime Score'],
                    },
                    {
                      value: analyze?.middayOverloadScore || 0,
                      label: ['Mid-Day Overload Score'],
                    },
                    {
                      value: analyze?.patientWaitTimeScore || 0,
                      label: ['Wait Time Score'],
                    },
                  ].map((item, index) => {
                    let colorClass = '#28A745'; // default color class
                    if (item.value < 33) {
                      colorClass = '#FF5A5F';
                    } else if (item.value < 66) {
                      colorClass = '#FFC107';
                    }

                    return (
                      <div key={index}>
                          <RadialBar color={colorClass} value={item.value} label={item.label} />
                      </div>
                    );
                  })}
                </div>

            </div>


            <style jsx>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 3s linear forwards;
                }
            `}</style>
        </div>
    );
};

export default Identify;
