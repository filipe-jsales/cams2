import { CameraResolution } from "../../enums/cams/cams.enum";

export interface Cam {
  id: number;
  name: string;
  protocol: string;
  URL: string;
  isAnalytical: boolean;
  hostingDays?: number;
  storage?: string;
  resolution: CameraResolution;
  status: string;
  observations?: string;
  userId?: number;
}
