import ThermometerSVG from "./ThermometerSVG";
import StopperSVG from "./StopperSVG";
import PlantSVG from "./PlantSVG";
import CylinderSVG from "./CylinderSVG";
import BakingSodaSVG from "./BakingSodaSVG";
import VinegarSVG from "./VinegarSVG";
import SunIconSVG from "./SunIconSVG";
import StopwatchSVG from "./StopwatchSVG";

export {
  ThermometerSVG,
  StopperSVG,
  PlantSVG,
  CylinderSVG,
  BakingSodaSVG,
  VinegarSVG,
  SunIconSVG,
  StopwatchSVG,
};

export type InventoryToolId =
  | "thermoA"
  | "thermoB"
  | "thermoD"
  | "stopperA"
  | "stopperB"
  | "stopperC"
  | "stopperD"
  | "plant"
  | "cylinder"
  | "bakingSoda"
  | "vinegar"
  | "sun"
  | "stopwatch";

export function InventoryToolIcon({
  item,
  className = "w-8 h-8",
}: {
  item: InventoryToolId;
  className?: string;
}) {
  switch (item) {
    case "thermoA":
      return <ThermometerSVG label="A" className={className} />;
    case "thermoB":
      return <ThermometerSVG label="B" className={className} />;
    case "thermoD":
      return <ThermometerSVG label="D" className={className} />;
    case "stopperA":
      return <StopperSVG label="A" className={className} />;
    case "stopperB":
      return <StopperSVG label="B" className={className} />;
    case "stopperC":
      return <StopperSVG label="C" className={className} />;
    case "stopperD":
      return <StopperSVG label="D" className={className} />;
    case "plant":
      return <PlantSVG className={className} />;
    case "cylinder":
      return <CylinderSVG className={className} />;
    case "bakingSoda":
      return <BakingSodaSVG className={className} />;
    case "vinegar":
      return <VinegarSVG className={className} />;
    case "sun":
      return <SunIconSVG className={className} />;
    case "stopwatch":
      return <StopwatchSVG className={className} />;
    default:
      return null;
  }
}
