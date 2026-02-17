import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BeyondEyeGaze() {
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
