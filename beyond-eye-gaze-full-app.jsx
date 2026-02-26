import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Check, ChevronRight } from 'lucide-react';

// Calibration Page Component
function CalibrationPage({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [sensorReading, setSensorReading] = useState(0);
  const [calibrationData, setCalibrationData] = useState({
    rest: null,
    openMouth: null,
    leftMovement: null,
    rightMovement: null
  });

  const calibrationSteps = [
    {
      id: 'rest',
      title: 'Rest Position',
      instruction: 'Keep your jaw relaxed and still',
      description: 'This helps us understand your natural resting position'
    },
    {
      id: 'openMouth',
      title: 'Open Mouth',
      instruction: 'Open your mouth wide',
      description: 'Open as wide as comfortable for 3 seconds'
    },
    {
      id: 'leftMovement',
      title: 'Left Movement',
      instruction: 'Move your jaw to the left',
      description: 'Shift your jaw left and hold for 3 seconds'
    },
    {
      id: 'rightMovement',
      title: 'Right Movement',
      instruction: 'Move your jaw to the right',
      description: 'Shift your jaw right and hold for 3 seconds'
    }
  ];

  const currentStepData = calibrationSteps[currentStep];

  // Simulate sensor readings (replace with actual sensor data)
  useEffect(() => {
    if (isCalibrating) {
      const interval = setInterval(() => {
        setSensorReading(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isCalibrating]);

  const startCalibration = () => {
    setIsCalibrating(true);
    setSensorReading(0);

    // Simulate 3-second calibration
    setTimeout(() => {
      const avgReading = Math.random() * 100;
      setCalibrationData(prev => ({
        ...prev,
        [currentStepData.id]: avgReading
      }));
      setIsCalibrating(false);
      
      if (currentStep < calibrationSteps.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 500);
      }
    }, 3000);
  };

  const allStepsComplete = Object.values(calibrationData).every(val => val !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-8">
        <h1 className="text-3xl font-bold text-indigo-900 text-center">
          Beyond Eye Gaze
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Sensor Calibration Setup
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {calibrationSteps.length}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(((currentStep + (isCalibrating ? 0.5 : 0)) / calibrationSteps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentStep + (isCalibrating ? 0.5 : 0)) / calibrationSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Calibration Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-indigo-200">
            {!allStepsComplete ? (
              <>
                {/* Step Title */}
                <div className="text-center mb-8">
                  <div className="inline-block bg-indigo-100 text-indigo-800 px-6 py-2 rounded-full text-sm font-semibold mb-4">
                    {currentStepData.title}
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    {currentStepData.instruction}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {currentStepData.description}
                  </p>
                </div>

                {/* Sensor Visualization */}
                <div className="mb-8">
                  <div className="bg-gray-100 rounded-2xl p-8 relative overflow-hidden">
                    {/* Animated sensor reading bar */}
                    <div className="relative h-24 bg-gray-200 rounded-xl overflow-hidden">
                      <div 
                        className={`absolute left-0 top-0 h-full rounded-xl transition-all duration-200 ${
                          isCalibrating 
                            ? 'bg-gradient-to-r from-green-400 to-green-600' 
                            : 'bg-gradient-to-r from-indigo-400 to-indigo-600'
                        }`}
                        style={{ width: `${sensorReading}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">
                          {isCalibrating ? 'Calibrating...' : 'Ready'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Checkmark for completed step */}
                    {calibrationData[currentStepData.id] !== null && !isCalibrating && (
                      <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  {calibrationData[currentStepData.id] === null ? (
                    <button
                      onClick={startCalibration}
                      disabled={isCalibrating}
                      className={`px-12 py-5 rounded-full text-xl font-bold transition-all transform hover:scale-105 ${
                        isCalibrating
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl'
                      }`}
                    >
                      {isCalibrating ? 'Hold Position...' : 'Start Calibration'}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-3 text-green-600">
                      <Check className="w-8 h-8" />
                      <span className="text-2xl font-bold">Step Complete!</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // All Steps Complete
              <div className="text-center">
                <div className="inline-block bg-green-100 rounded-full p-6 mb-6">
                  <Check className="w-16 h-16 text-green-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Calibration Complete!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Your sensors are now calibrated and ready to use
                </p>
                <button
                  onClick={onComplete}
                  className="inline-flex items-center gap-3 px-12 py-5 bg-indigo-600 text-white rounded-full text-xl font-bold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  Start Communicating
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Completed Steps Indicator */}
          {!allStepsComplete && (
            <div className="mt-8 flex justify-center gap-3">
              {calibrationSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`w-4 h-4 rounded-full transition-all ${
                    calibrationData[step.id] !== null
                      ? 'bg-green-500 scale-110'
                      : index === currentStep
                        ? 'bg-indigo-600 scale-110'
                        : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Help Text */}
      <div className="bg-indigo-900 text-white py-4 px-8 text-center">
        <p className="text-sm opacity-90">
          Take your time with each step. Calibration ensures accurate detection of your movements.
        </p>
      </div>
    </div>
  );
}

// Main Communication Page Component
function CommunicationPage({ onRecalibrate }) {
  const [detectedText, setDetectedText] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Simulate jaw movement detection (replace with actual sensor data)
  useEffect(() => {
    const simulateDetection = () => {
      const phrases = [
        'Hello',
        'I need help',
        'Thank you',
        'Yes',
        'No',
        'I am hungry',
        'I am thirsty',
        'I am tired',
        ''
      ];
      
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setDetectedText(randomPhrase);
      setIsDetecting(randomPhrase !== '');
    };

    // Simulate detection every 5 seconds for demo
    const interval = setInterval(simulateDetection, 5000);
    return () => clearInterval(interval);
  }, []);

  const speakText = () => {
    if (detectedText && speechEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(detectedText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (speechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-8">
        <h1 className="text-3xl font-bold text-indigo-900 text-center">
          Beyond Eye Gaze
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Communication Through Movement
        </p>
      </header>

      {/* Main Display Area */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Detection Status Indicator */}
          <div className="flex items-center justify-center mb-6">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full ${
              isDetecting 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                isDetecting ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="font-medium">
                {isDetecting ? 'Detecting' : 'Standby'}
              </span>
            </div>
          </div>

          {/* Text Display Box */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 min-h-[300px] flex items-center justify-center border-4 border-indigo-200">
            {detectedText ? (
              <p className="text-6xl font-bold text-indigo-900 text-center leading-tight break-words">
                {detectedText}
              </p>
            ) : (
              <div className="text-center">
                <p className="text-3xl text-gray-400 font-medium mb-3">
                  No words detected
                </p>
                <p className="text-lg text-gray-400">
                  Waiting for jaw movement...
                </p>
              </div>
            )}
          </div>

          {/* Instruction Text */}
          <p className="text-center text-gray-600 mt-6 text-lg">
            {detectedText 
              ? 'Use the audio button to play this phrase aloud' 
              : 'Move your jaw to communicate'}
          </p>
        </div>
      </main>

      {/* Audio Control Button - Bottom Right */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={detectedText ? speakText : toggleSpeech}
          disabled={!detectedText && speechEnabled}
          className={`group relative rounded-full p-6 shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            detectedText 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : speechEnabled 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
          }`}
          aria-label={detectedText ? 'Play audio' : speechEnabled ? 'Audio enabled' : 'Audio disabled'}
        >
          {speechEnabled ? (
            <Volume2 className="w-10 h-10 text-white" />
          ) : (
            <VolumeX className="w-10 h-10 text-white" />
          )}
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
              {detectedText 
                ? 'Speak phrase aloud' 
                : speechEnabled 
                  ? 'No phrase to speak' 
                  : 'Audio disabled'}
            </div>
          </div>
        </button>

        {/* Audio Toggle - Small button next to main button */}
        <button
          onClick={toggleSpeech}
          className="absolute -top-2 -left-2 bg-white rounded-full p-2 shadow-lg border-2 border-gray-200 hover:border-indigo-400 transition-all"
          aria-label="Toggle audio"
        >
          <div className={`w-3 h-3 rounded-full ${
            speechEnabled ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
        </button>
      </div>

      {/* Recalibrate Button - Bottom Left */}
      <div className="fixed bottom-8 left-8">
        <button
          onClick={onRecalibrate}
          className="group relative bg-white hover:bg-gray-50 text-gray-700 px-6 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-300 hover:border-indigo-400"
          aria-label="Recalibrate sensors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-semibold">Recalibrate</span>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-0 mb-3 hidden group-hover:block">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap">
              Restart sensor calibration
            </div>
          </div>
        </button>
      </div>

      {/* Demo Instructions */}
      <div className="bg-indigo-900 text-white py-4 px-8 text-center">
        <p className="text-sm opacity-90">
          <strong>Demo Mode:</strong> Phrases change automatically every 5 seconds. 
          Replace with actual jaw sensor integration.
        </p>
      </div>
    </div>
  );
}

// Main App Component with Page Navigation
export default function BeyondEyeGazeApp() {
  const [isCalibrated, setIsCalibrated] = useState(false);

  const handleRecalibrate = () => {
    setIsCalibrated(false);
  };

  return (
    <>
      {!isCalibrated ? (
        <CalibrationPage onComplete={() => setIsCalibrated(true)} />
      ) : (
        <CommunicationPage onRecalibrate={handleRecalibrate} />
      )}
    </>
  );
}
