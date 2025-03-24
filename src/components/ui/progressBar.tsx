import React from "react";

interface ProgressBarProps {
  value: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="w-full bg-secondary rounded-full h-2.5">
      <div className='bg-primary h-2.5 rounded-md' style={{ width: `${value}%` }} 
      ></div>
    </div>
  );
};

export default ProgressBar;
