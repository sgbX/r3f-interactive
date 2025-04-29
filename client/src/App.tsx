import React, { useEffect, useState, Suspense } from "react";
import Scene from "./components/Scene";
import Interface from "./components/Interface";
import { useAudio } from "./lib/stores/useAudio";
import { Toaster } from "sonner";

function App() {
  const [ready, setReady] = useState(false);
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Initialize audio
  useEffect(() => {
    // Load audio files
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.4;

    const hit = new Audio("/sounds/hit.mp3");
    hit.volume = 0.3;

    const success = new Audio("/sounds/success.mp3");
    success.volume = 0.5;

    // Set audio in the store
    setBackgroundMusic(bgMusic);
    setHitSound(hit);
    setSuccessSound(success);

    setReady(true);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  if (!ready) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* 3D Scene */}
      <Suspense fallback={<div className="w-screen h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-primary">Loading 3D scene...</div>
      </div>}>
        <Scene />
      </Suspense>
      
      {/* UI Interface */}
      <Interface />
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
