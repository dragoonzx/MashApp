import React from "react";

interface IMeshMashupsListProps {
  className?: string;
}

function MashMashupsList({ className }: IMeshMashupsListProps) {
  return (
    <div className={className}>
      <span className="text-3xl">Mashups of the track</span>
      <div className="container flex mx-auto w-full items-center justify-center mt-4">
        <ul className="flex flex-col">
          <li className="border-gray-400 flex flex-row mb-2">
            <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                💧
              </div>
              <div className="flex-1 pl-1 mr-16">
                <div className="font-medium">Track name</div>
                <div className="text-gray-600 text-sm">The Weeknd</div>
              </div>
              <div className="text-gray-600 text-xs">1:32</div>
            </div>
          </li>
          <li className="border-gray-400 flex flex-row mb-2">
            <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                ⚽️
              </div>
              <div className="flex-1 pl-1 mr-16">
                <div className="font-medium">Track name</div>
                <div className="text-gray-600 text-sm">Booba</div>
              </div>
              <div className="text-gray-600 text-xs">3:24</div>
            </div>
          </li>
          <li className="border-gray-400 flex flex-row mb-2">
            <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                📖
              </div>
              <div className="flex-1 pl-1 mr-16">
                <div className="font-medium">Track name</div>
                <div className="text-gray-600 text-sm">DaBaby</div>
              </div>
              <div className="text-gray-600 text-xs">2:01</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MashMashupsList;
