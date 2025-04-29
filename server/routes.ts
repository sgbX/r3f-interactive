import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Torus application is running" });
  });
  
  // Info endpoint that returns information about three.js
  app.get("/api/info", (req, res) => {
    res.json({
      title: "Interactive 3D Torus",
      description: "A 3D visualization using Three.js and React Three Fiber",
      technologies: [
        "React",
        "Three.js",
        "React Three Fiber",
        "Tailwind CSS",
        "TypeScript"
      ],
      version: "1.0.0"
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
