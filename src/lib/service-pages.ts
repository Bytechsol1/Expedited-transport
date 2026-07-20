import type { Metadata } from "next";
import type { ServicePageTemplateProps, ServiceCard } from "@/components/ServicePageTemplate";
import { BarChart3, Boxes, CheckCircle2, Clock3, MapPinned, Package, ShieldCheck, Ship, Truck, Warehouse, Waypoints } from "lucide-react";

export type ServicePageData = ServicePageTemplateProps & {
  metadata: Metadata;
};

const commonBody =
  "Dummy service copy for the route. Use this layout to present a focused message about the service, then replace the text when the final content is ready.";

const makeCards = (cards: ServiceCard[]): ServiceCard[] => cards;

export const servicePages = {
  expeditedTrucking: {
    metadata: {
      title: "Expedited Trucking | Expedited Transport Services",
      description: "Dummy expedited trucking page for Expedited Transport Services.",
    },
    eyebrow: "Expedited Trucking",
    title: "Expedited Trucking",
    summary: "Fast-moving freight support for time-sensitive shipments that need direct handling and quick coordination.",
    body: commonBody,
    imageSrc: "/images/truck4.jpg",
    imageAlt: "Expedited trucking support",
    points: ["Priority dispatch", "Direct communication", "Tight scheduling"],
    cards: makeCards([
      { title: "Fast routing", description: "Keep urgent freight moving with a straightforward route and fewer delays.", icon: Waypoints },
      { title: "Time-sensitive loads", description: "Dummy copy for loads that need immediate attention and clear tracking.", icon: Clock3 },
      { title: "Protected handling", description: "Basic handling notes for shipments that must stay secure from pickup to dropoff.", icon: ShieldCheck },
    ]),
  },
  ltlTrucking: {
    metadata: {
      title: "LTL Trucking | Expedited Transport Services",
      description: "Dummy LTL trucking page for Expedited Transport Services.",
    },
    eyebrow: "LTL Trucking",
    title: "Less-Than-Truckload",
    summary: "Flexible freight coverage for smaller shipments that still deserve reliable pickup, movement, and delivery.",
    body: commonBody,
    imageSrc: "/images/truck1.jpg",
    imageAlt: "LTL trucking support",
    points: ["Smaller load planning", "Budget-friendly moves", "Simple scheduling"],
    cards: makeCards([
      { title: "Partial load planning", description: "Dummy content for organizing compact shipments into a clean shipping flow.", icon: Boxes },
      { title: "Cost control", description: "A placeholder for keeping smaller shipments efficient without unnecessary complexity.", icon: BarChart3 },
      { title: "Consolidated moves", description: "Combine freight when needed so trips stay practical and direct.", icon: Truck },
    ]),
  },
  freightShipping: {
    metadata: {
      title: "Freight Shipping | Expedited Transport Services",
      description: "Dummy freight shipping page for Expedited Transport Services.",
    },
    eyebrow: "Freight Shipping",
    title: "Freight Shipping",
    summary: "A clean dummy overview for moving freight with simple visibility from pickup to destination.",
    body: commonBody,
    imageSrc: "/images/ship.jpg",
    imageAlt: "Freight shipping support",
    points: ["Pickup coordination", "Transit visibility", "Delivery windows"],
    cards: makeCards([
      { title: "Dock coordination", description: "Placeholder copy for keeping freight lined up for the next step.", icon: Ship },
      { title: "Transit tracking", description: "Dummy visibility notes for knowing where freight is during the trip.", icon: MapPinned },
      { title: "Arrival planning", description: "A simple note for keeping delivery timing predictable.", icon: Clock3 },
    ]),
  },
  freightTransportation: {
    metadata: {
      title: "Freight Transportation | Expedited Transport Services",
      description: "Dummy freight transportation page for Expedited Transport Services.",
    },
    eyebrow: "Freight Transportation",
    title: "Freight Transportation",
    summary: "Freight movement for businesses that want a dependable shipping process without unnecessary noise.",
    body: commonBody,
    imageSrc: "/images/truck2.jpg",
    imageAlt: "Freight transportation support",
    points: ["Regional coverage", "Cross-dock support", "Route optimization"],
    cards: makeCards([
      { title: "Regional coverage", description: "Dummy copy for handling local and regional freight moves with ease.", icon: MapPinned },
      { title: "Cross-dock support", description: "Placeholder language for faster transfers between inbound and outbound legs.", icon: Warehouse },
      { title: "Route optimization", description: "Basic notes about selecting the simplest path for freight movement.", icon: Waypoints },
    ]),
  },
  logisticsServices: {
    metadata: {
      title: "Logistics Services | Expedited Transport Services",
      description: "Dummy logistics services page for Expedited Transport Services.",
    },
    eyebrow: "Logistics Services",
    title: "Logistics Services",
    summary: "Operational support for planning, monitoring, and keeping moving parts aligned across the supply chain.",
    body: commonBody,
    imageSrc: "/images/truck3.jpg",
    imageAlt: "Logistics services support",
    points: ["Planning support", "Status updates", "Clear coordination"],
    cards: makeCards([
      { title: "Load planning", description: "Placeholder workflow notes for preparing shipments before they move.", icon: Boxes },
      { title: "Shipment visibility", description: "Dummy details for keeping stakeholders informed at every step.", icon: MapPinned },
      { title: "Communication", description: "A simple stand-in for keeping everyone on the same page.", icon: BarChart3 },
    ]),
  },
  carrierServices: {
    metadata: {
      title: "Carrier Services | Expedited Transport Services",
      description: "Dummy carrier services page for Expedited Transport Services.",
    },
    eyebrow: "Carrier Services",
    title: "Carrier Services",
    summary: "A placeholder carrier services page for matching capacity with shipments that need reliable attention.",
    body: commonBody,
    imageSrc: "/images/truck4.jpg",
    imageAlt: "Carrier services support",
    points: ["Capacity matching", "Driver coordination", "Delivery proof"],
    cards: makeCards([
      { title: "Capacity matching", description: "Dummy copy for pairing the right truck with the right shipment.", icon: Truck },
      { title: "Driver coordination", description: "Placeholder note for communication before, during, and after the load.", icon: Waypoints },
      { title: "Delivery proof", description: "A simple stand-in for completed delivery confirmation.", icon: CheckCircle2 },
    ]),
  },
  localTruckingCompany: {
    metadata: {
      title: "Local Trucking Company | Expedited Transport Services",
      description: "Dummy local trucking company page for Expedited Transport Services.",
    },
    eyebrow: "Local Trucking",
    title: "Local Trucking Company",
    summary: "Local freight support for nearby routes, quick turnarounds, and direct pickup and dropoff coordination.",
    body: commonBody,
    imageSrc: "/images/truck1.jpg",
    imageAlt: "Local trucking support",
    points: ["Nearby routes", "Flexible pickups", "Quick turnarounds"],
    cards: makeCards([
      { title: "Nearby routes", description: "Dummy copy for short-distance moves and local delivery support.", icon: MapPinned },
      { title: "Flexible pickups", description: "Placeholder text for adapting to changing pickup windows.", icon: Clock3 },
      { title: "Simple dispatch", description: "A basic note for getting local freight moving quickly.", icon: Truck },
    ]),
  },
} satisfies Record<string, ServicePageData>;

