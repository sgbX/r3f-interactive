import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { torusCode, sceneCode, controlsCode } from "../lib/torusCode";
import { Copy, Check, Code2 } from "lucide-react";
import { useState } from "react";

interface CodeDisplayProps {
  onClose: () => void;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ onClose }) => {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const copyToClipboard = (code: string, tab: string) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  return (
    <Card className="w-full h-full flex flex-col border-t-0 rounded-t-none rounded-b-lg bg-background/95 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Code Explorer
            </CardTitle>
            <CardDescription>
              Examine the code that powers this 3D torus visualization
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden pb-0">
        <Tabs defaultValue="torus" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="torus">Torus Component</TabsTrigger>
            <TabsTrigger value="scene">Scene Setup</TabsTrigger>
            <TabsTrigger value="controls">UI Controls</TabsTrigger>
          </TabsList>
          
          <div className="relative h-[calc(100%-50px)] overflow-auto">
            <TabsContent value="torus" className="h-full m-0">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  height: "100%",
                }}
                showLineNumbers
              >
                {torusCode}
              </SyntaxHighlighter>
            </TabsContent>
            
            <TabsContent value="scene" className="h-full m-0">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  height: "100%",
                }}
                showLineNumbers
              >
                {sceneCode}
              </SyntaxHighlighter>
            </TabsContent>
            
            <TabsContent value="controls" className="h-full m-0">
              <SyntaxHighlighter
                language="tsx"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                  height: "100%",
                }}
                showLineNumbers
              >
                {controlsCode}
              </SyntaxHighlighter>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
      
      <CardFooter className="pt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(torusCode, "torus")}
            disabled={copiedTab === "torus"}
          >
            {copiedTab === "torus" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Torus Code
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(sceneCode, "scene")}
            disabled={copiedTab === "scene"}
          >
            {copiedTab === "scene" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Scene Code
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(controlsCode, "controls")}
            disabled={copiedTab === "controls"}
          >
            {copiedTab === "controls" ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Controls Code
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CodeDisplay;
