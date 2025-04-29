import React, { useState } from "react";
import Controls from "./Controls";
import CodeDisplay from "./CodeDisplay";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Code, Github, Info } from "lucide-react";
import { useTorusStore } from "../lib/stores/useTorusStore";
import { useAudio } from "../lib/stores/useAudio";

const Interface: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const { playSuccessSound } = useAudio();
  const { isKnotMode } = useTorusStore();

  const toggleCodeDisplay = () => {
    setShowCode(!showCode);
    playSuccessSound();
  };

  const openGithubRepo = () => {
    window.open("https://github.com/pmndrs/react-three-fiber", "_blank");
    toast.success("Opening React Three Fiber GitHub repo");
  };

  const showInfo = () => {
    toast.info(
      <div className="space-y-2">
        <p className="font-semibold">Interactive 3D Torus Explorer</p>
        <p>
          This application demonstrates the capabilities of React Three Fiber and Three.js.
          Modify the torus properties using the controls and view the source code to learn how it works!
        </p>
      </div>,
      { duration: 5000 }
    );
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              {isKnotMode ? "Interactive Torus Knot" : "Interactive Torus"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Built with React Three Fiber
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={showInfo}
          >
            <Info size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={openGithubRepo}
          >
            <Github size={20} />
          </Button>
          
          <Button
            variant={showCode ? "default" : "outline"}
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleCodeDisplay}
          >
            <Code size={20} className="mr-2" />
            {showCode ? "Hide Code" : "View Code"}
          </Button>
        </div>
      </div>
      
      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-auto">
        {showCode ? (
          <CodeDisplay onClose={() => setShowCode(false)} />
        ) : (
          <Controls />
        )}
      </div>
    </div>
  );
};

export default Interface;
