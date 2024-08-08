import React from 'react';
import CapacityGraph from '../components/kpi-dashboard/CapacityGraph';
import PatientValueGraph from '../components/kpi-dashboard/PatientValueGraph';
import PatientWaitGraph from '../components/kpi-dashboard/PatientWaitGraph';
import NavButtons from '../components/kpi-dashboard/NavButtons';
import DailyApptsNurse from '../components/kpi-dashboard/Cards/DailyApptsNurse';
import NursingNPS from '../components/kpi-dashboard/Cards/NursingNPS';
import DailyApptsChair from '../components/kpi-dashboard/Cards/DailyApptsChair';
import ForecastAccuracy from '../components/kpi-dashboard/Cards/ForecastAccuracy';
import LateClosings from '../components/kpi-dashboard/Cards/LateClosings';
import LunchBreakAdherence from '../components/kpi-dashboard/Cards/LunchBreakAdherence';
import NoShowRate from '../components/kpi-dashboard/Cards/NoShowRate';
import NursingOvertime from '../components/kpi-dashboard/Cards/NursingOvertime';


function ExecutiveReports() {
  return (
    <div>
      <div className="lg:pl-64">

        <div className="my-5 flex h-16 shrink-0 items-center justify-between bg-white px-4 sm:px-6 lg:px-8">
          <h1 className="font-bold text-4xl font-manrope text-custom-blue">Executive Reports</h1>
        </div>

        
        <div className="bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6">
            <NavButtons />
          </div>
        </div>


        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 grid-cols-3 md:max-lg:grid-cols-3 sm:max-md:grid-cols-2">
              <div className="text-center col-span-1 sm:col-span-1">
                <CapacityGraph />
              </div>
              <div className="text-center col-span-1 sm:col-span-1">
                <PatientValueGraph />
              </div>
              <div className="text-center col-span-1 sm:max-md:col-span-2">
                <PatientWaitGraph />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-start font-bold text-xl font-manrope text-custom-blue">Provider Experience</div>
              <div className="text-start font-bold text-xl font-manrope text-custom-blue">Patient Experience</div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4 md:max-lg:grid-cols-4 sm:max-md:grid-cols-2">
              <div className="text-center"><NursingNPS /></div>
              <div className="text-center"><NursingOvertime /></div>
              <div className="text-center"><DailyApptsNurse /></div>
              <div className="text-center"><DailyApptsChair /></div>
              <div className="text-center"><LunchBreakAdherence /></div>
              <div className="text-center"><LateClosings /></div>
              <div className="text-center"><ForecastAccuracy /></div>
              <div className="text-center"><NoShowRate /></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExecutiveReports;