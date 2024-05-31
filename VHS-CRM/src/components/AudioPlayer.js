import React, { useState } from 'react';

const AudioPlayer = ({ recordingPath }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <button onClick={togglePlay}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <audio controls={true} autoPlay={false} loop={false} onEnded={() => setIsPlaying(false)}>
                <source src={recordingPath} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;
