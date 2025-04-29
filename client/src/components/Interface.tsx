import React, { useState } from "react";
import Controls from "./Controls";
import CodeDisplay from "./CodeDisplay";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Code, Github, Info } from "lucide-react";
import { useTorusStore, ShapeMode } from "../lib/stores/useTorusStore";
import { useAudio } from "../lib/stores/useAudio";

const Interface: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const { playSuccess } = useAudio();
  const { shapeMode } = useTorusStore();

  const toggleCodeDisplay = () => {
    setShowCode(!showCode);
    playSuccess();
  };

  const openGithubRepo = () => {
    window.open("https://github.com/YOUR_USERNAME", "_blank", "noopener,noreferrer");
    toast.success("Opening my GitHub profile", {
      duration: 3000,
      position: "top-center"
    });
  };

  const showInfo = () => {
    toast.info(
      <div className="space-y-2">
        <p className="font-semibold">Interactive 3D Shape Explorer</p>
        <p>
          I built this application to explore 3D graphics with React Three Fiber and Three.js.
          You can modify the shape properties and view my source code to see how I implemented it!
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <strong>Interaction:</strong> Click and drag to rotate the shape. Use the scroll wheel to zoom in/out.
        </p>
        <p className="text-xs text-muted-foreground">
          Try switching between different shape modes using the toggle buttons.
        </p>
      </div>,
      { 
        duration: 5000,
        position: "top-center",
        closeButton: true
      }
    );
  };

  // Function to get the current title based on shape mode
  const getShapeTitle = () => {
    switch (shapeMode) {
      case ShapeMode.KNOT:
        return "Interactive Torus Knot";
      case ShapeMode.WEIRD:
        return "Interactive Weird Shape";
      case ShapeMode.TORUS:
      default:
        return "Interactive Torus";
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="bg-background/85 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-primary/20">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              {getShapeTitle()}
            </h1>
            <p className="text-sm text-muted-foreground">
              Created by me, {new Date().getFullYear()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/85 backdrop-blur-sm shadow-md border border-primary/10"
            onClick={showInfo}
            aria-label="Information"
            title="About this app"
          >
            <Info size={20} />
            <span className="sr-only">Information</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/85 backdrop-blur-sm shadow-md border border-primary/10"
            onClick={openGithubRepo}
            aria-label="GitHub"
            title="Visit my GitHub profile"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </Button>
          
          <Button
            variant={showCode ? "default" : "outline"}
            className="rounded-full bg-background/85 backdrop-blur-sm shadow-md border border-primary/10"
            onClick={toggleCodeDisplay}
            aria-label={showCode ? "Hide Code" : "View Code"}
            title={showCode ? "Hide code display" : "View source code"}
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
