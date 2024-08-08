import React from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import LoopIcon from '@mui/icons-material/Loop';
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineSearch } from "react-icons/hi";
import { useAuth0 } from '@auth0/auth0-react';

function GetStarted() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-customBlue"></div>
      <div className="flex justify-center items-center h-screen relative">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: "url('/images/nurse-picture.jpeg')" }}></div>
        <div className="relative z-50 rounded-2xl p-10 bg-white shadow-2xl" style={{ boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}>
          <div className="pt-2 pb-5 flex justify-center">
            <img src="/images/title-image.png" alt="logo" className="w-64 h-auto" />
          </div>
          <div className="shadow rounded-xl p-8 bg-white">
            <p className="border-b-2 border-gray-300 text-lg font-semibold pb-3">
              3 Simple Steps:
            </p>
            <ul className="pt-4">
              <li className="py-2 flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold">1</span>
                <UploadIcon className="mx-2 text-xl" />
                <span className="text-lg font-semibold mr-2">Upload</span>
                <span className="text-lg">Today’s Infusion Schedule</span>
              </li>
              <li className="py-2 flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold">2</span>
                <HiOutlineSearch className="mx-2 text-xl" />
                <span className="text-lg font-semibold mr-2">Identify</span>
                <span className="text-lg">Areas for Improvement</span>
              </li>
              <li className="py-2 flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full font-bold">3</span>
                <LoopIcon className="mx-2 text-xl" />
                <span className="text-lg font-semibold mr-2">Optimize</span>
                <span className="text-lg">Schedule & View Results</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center p-4 pt-5">
            <button 
              className="text-white bg-customBlue rounded-full px-8 py-3 text-xl drop-shadow-2xl hover:bg-blue-700 transition flex items-center" 
              onClick={() => loginWithRedirect()}
            >
              Get Started <FaArrowRight className="pl-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;