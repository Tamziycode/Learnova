import React from "react";

const skeletonStyle = `
  .skeleton-container {
    width: 100%;
    max-width: 320px;
    margin: 10px;
    border-radius: 8px;
    background-color: rgba(200, 200, 200, 0.15);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    overflow: hidden;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .skeleton-image {
    width: 100%;
    height: 200px;
    background-color: rgba(150, 150, 150, 0.15);
  }

  .skeleton-text {
    height: 16px;
    margin: 10px 16px;
    background-color: rgba(150, 150, 150, 0.1);
    border-radius: 4px;
  }

  .skeleton-text.short {
    width: 40%;
  }

  .skeleton-text.medium {
    width: 70%;
  }

  .skeleton-text.long {
    width: 90%;
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const LoadingSkeleton = () => {
  return (
    <>
      <style>{skeletonStyle}</style>
      <div className="skeleton-container">
        <div className="skeleton-image" />
        <div className="skeleton-text long" />
        <div className="skeleton-text medium" />
        <div className="skeleton-text short" />
        <div className="skeleton-text medium" />
      </div>
    </>
  );
};

export default LoadingSkeleton;
