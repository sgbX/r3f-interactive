import React from "react";
import { useTorusStore, ShapeMode } from "../lib/stores/useTorusStore";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";
import { useAudio } from "../lib/stores/useAudio";
import { 
  Volume2, VolumeX, 
  Play, Pause, 
  Rotate3D, 
  RefreshCw, 
  Eye, 
  EyeOff,
  Box,
  CircleOff
} from "lucide-react";

export const Controls: React.FC = () => {
  const {
    color,
    setColor,
    wireframe,
    setWireframe,
    tubeRadius,
    setTubeRadius,
    radius,
    setRadius,
    radialSegments,
    setRadialSegments,
    tubularSegments,
    setTubularSegments,
    rotationSpeed,
    setRotationSpeed,
    autoRotate,
    setAutoRotate,
    isAnimating,
    setIsAnimating,
    shapeMode,
    setShapeMode,
    resetToDefaults,
  } = useTorusStore();

  const { isMuted, toggleMute, playHit } = useAudio();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
    playHit();
  };

  return (
    <Card className="w-full rounded-t-none rounded-b-lg bg-background/95 backdrop-blur-sm border-t-0 shadow-lg border-2 border-primary/30">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl text-primary drop-shadow-sm">Shape Controls</h3>
          <div className="flex items-center gap-2">
            {/* Shape toggles for Torus, Knot, and Weird shape */}
            <Toggle
              pressed={shapeMode === ShapeMode.TORUS}
              onPressedChange={() => {
                setShapeMode(ShapeMode.TORUS);
                playHit();
              }}
              aria-label="Torus Mode"
              title="Switch to Torus"
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
            >
              <CircleOff size={18} className="text-foreground" />
            </Toggle>
            
            <Toggle
              pressed={shapeMode === ShapeMode.KNOT}
              onPressedChange={() => {
                setShapeMode(ShapeMode.KNOT);
                playHit();
              }}
              aria-label="Knot Mode"
              title="Switch to Torus Knot"
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
            >
              <Rotate3D size={18} className="text-foreground" />
            </Toggle>
            
            <Toggle
              pressed={shapeMode === ShapeMode.WEIRD}
              onPressedChange={() => {
                setShapeMode(ShapeMode.WEIRD);
                playHit();
              }}
              aria-label="Weird Shape Mode"
              title="Switch to Weird Shape"
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
            >
              <Box size={18} className="text-foreground" />
            </Toggle>
            
            <Toggle
              pressed={autoRotate}
              onPressedChange={setAutoRotate}
              aria-label="Toggle Auto Rotation"
              title="Toggle Auto Rotation"
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
              onClick={() => playHit()}
            >
              <RefreshCw size={18} className="text-foreground" />
            </Toggle>
            
            <Toggle
              pressed={isAnimating}
              onPressedChange={setIsAnimating}
              aria-label="Toggle Animation"
              title="Toggle Pulse Animation"
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
              onClick={() => playHit()}
            >
              {isAnimating ? <Pause size={18} className="text-foreground" /> : <Play size={18} className="text-foreground" />}
            </Toggle>
            
            <Toggle
              pressed={wireframe}
              onPressedChange={setWireframe}
              aria-label="Toggle Wireframe"
              title="Toggle Wireframe Mode"
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
              onClick={() => playHit()}
            >
              {wireframe ? <Eye size={18} className="text-foreground" /> : <EyeOff size={18} className="text-foreground" />}
            </Toggle>
            
            <Button
              variant="outline"
              size="icon"
              title="Reset to Defaults"
              onClick={() => {
                resetToDefaults();
                playHit();
              }}
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
            >
              <RefreshCw size={18} className="text-foreground" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              title={isMuted ? "Unmute" : "Mute"}
              onClick={toggleMute}
              className="w-9 h-9 bg-primary/20 hover:bg-primary/40 hover:border-primary/60 transition-all shadow-md border border-primary/30"
            >
              {isMuted ? <VolumeX size={18} className="text-foreground" /> : <Volume2 size={18} className="text-foreground" />}
            </Button>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <Tabs defaultValue="shape" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-primary/10">
            <TabsTrigger 
              value="shape" 
              className="font-semibold text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors data-[state=active]:bg-primary/25 data-[state=active]:text-foreground"
            >
              Shape
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="font-semibold text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-colors data-[state=active]:bg-primary/25 data-[state=active]:text-foreground"
            >
              Appearance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="shape" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="radius" className="font-semibold text-foreground">Radius: <span className="text-primary">{radius.toFixed(1)}</span></Label>
                </div>
                <Slider
                  id="radius"
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={[radius]}
                  onValueChange={(value) => {
                    setRadius(value[0]);
                    playHit();
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="tubeRadius" className="font-semibold text-foreground">Tube Radius: <span className="text-primary">{tubeRadius.toFixed(2)}</span></Label>
                </div>
                <Slider
                  id="tubeRadius"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={[tubeRadius]}
                  onValueChange={(value) => {
                    setTubeRadius(value[0]);
                    playHit();
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="radialSegments" className="font-semibold text-foreground">Radial Segments: <span className="text-primary">{Math.round(radialSegments)}</span></Label>
                </div>
                <Slider
                  id="radialSegments"
                  min={3}
                  max={64}
                  step={1}
                  value={[radialSegments]}
                  onValueChange={(value) => {
                    setRadialSegments(value[0]);
                    playHit();
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="tubularSegments" className="font-semibold text-foreground">Tubular Segments: <span className="text-primary">{Math.round(tubularSegments)}</span></Label>
                </div>
                <Slider
                  id="tubularSegments"
                  min={3}
                  max={100}
                  step={1}
                  value={[tubularSegments]}
                  onValueChange={(value) => {
                    setTubularSegments(value[0]);
                    playHit();
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="color" className="font-semibold text-foreground">Color</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="color"
                    value={color}
                    onChange={handleColorChange}
                    className="w-10 h-10 rounded cursor-pointer border border-input"
                  />
                  <div className="text-sm text-muted-foreground">{color}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="rotationSpeed" className="font-semibold text-foreground">Rotation Speed: <span className="text-primary">{rotationSpeed.toFixed(1)}</span></Label>
                </div>
                <Slider
                  id="rotationSpeed"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={[rotationSpeed]}
                  onValueChange={(value) => {
                    setRotationSpeed(value[0]);
                    playHit();
                  }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="wireframe"
                  checked={wireframe}
                  onCheckedChange={(checked) => {
                    setWireframe(checked);
                    playHit();
                  }}
                />
                <Label htmlFor="wireframe" className="font-semibold text-foreground">Wireframe Mode</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="autorotate"
                  checked={autoRotate}
                  onCheckedChange={(checked) => {
                    setAutoRotate(checked);
                    playHit();
                  }}
                />
                <Label htmlFor="autorotate" className="font-semibold text-foreground">Auto Rotate</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Controls;
