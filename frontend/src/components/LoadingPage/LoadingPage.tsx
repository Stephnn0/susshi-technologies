import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import "./loading-screen.css"

const LoadingScreen: React.FC = () => {
  return (
    <div className="custom-loading-screen">
      <div className="loading-spinner">
        <CircularProgress/>
      </div>
    </div>
  );
};

export default LoadingScreen;
