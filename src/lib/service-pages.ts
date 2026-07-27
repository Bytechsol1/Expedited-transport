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
      description: "Time-sensitive freight shipping with direct coordination, quick response, and dependable delivery windows.",
    },
    eyebrow: "Expedited Trucking",
    title: "Expedited Trucking",
    summary: "If you are on a tight deadline and need freight delivered quickly, Expedited Transport Services is the company to call.",
    body:
      "We are proud to offer expedited trucking services you can rely on, with dependable transportation at great rates and exceptional client care. Having successfully completed many accelerated shipping jobs, we have built a reputation as a trusted resource for quick, stress-free deliveries. If your shipment must arrive by a specific date, our team will help you work out the details as quickly as possible.",
    imageSrc: "/images/truck4.jpg",
    imageAlt: "Expedited trucking support",
    points: ["Guaranteed delivery times", "Real-time status notifications", "Dedicated customer service"],
    cards: makeCards([
      {
        title: "Direct handling",
        description: "Fewer stops and fewer handoffs keep freight moving quickly and reduce the chance of delays.",
        icon: Waypoints,
      },
      {
        title: "Shipment visibility",
        description: "Stay informed with real-time updates and clear communication throughout the trip.",
        icon: Clock3,
      },
      {
        title: "Safer transit",
        description: "Reduced handling means less opportunity for damage or loss while the shipment is on the road.",
        icon: ShieldCheck,
      },
    ]),
  },
  ltlTrucking: {
    metadata: {
      title: "LTL Trucking | Expedited Transport Services",
      description: "Less-than-truckload shipping with flexible freight support and reliable delivery.",
    },
    eyebrow: "LTL Trucking",
    title: "LTL Trucking",
    summary:
      "Just because you don't have enough freight to fill up a truck does not mean you have to be throwing money away. With Expedited Transport Services, you only pay for the space you need. Our less-than-truckload shipping services are everything you need to keep your operation running smoothly without worrying about the size of your cargo.",
    body:
      "The Best LTL Carrier. Fair Prices on Smaller Shipments. Our carefully coordinated approach is designed to provide a budget-friendly option for smaller freight. We will combine your cargo with other similar shipments while also factoring in your deadlines to ensure timely arrivals without the need for high prices. Details Matter with LTL Trucking. We take pride in being a local LTL carrier with strong attention to detail, making sure there is ample space for your materials and that they reach their destination on time. Keeping Your Cargo Safe. Our carefully organized shipments ensure secure loading so your pallets or other materials are protected during transit.",
    imageSrc: "/images/truck1.jpg",
    imageAlt: "LTL trucking support",
    points: [
      "You have less than 12 pallets or 15,000 pounds of freight",
      "You want to save on shipping rates",
      "You want to reduce your warehousing costs by shipping materials right away",
      "Straightforward tracking information",
      "Additional services, such as liftgates and inside pickup",
      "Reducing your environmental impact",
    ],
    hideHeroAccent: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    cards: makeCards([
      {
        title: "Work with a Trusted LTL Carrier",
        description: "We are honored to already have many businesses trust us to keep them moving, and we hope to count you among them next time you need shipping services.",
        icon: Truck,
      },
      {
        title: "When to Hire an LTL Freight Company",
        description: "If you are on the fence about whether to use an LTL trucking company or not, our experts will be happy to help and give you an honest recommendation.",
        icon: Warehouse,
      },
      {
        title: "Contact Expedited Transport Services for LTL Shipping Today",
        description: "If you are curious about our LTL shipping services and the benefits we can bring to your operation, give us a call at (860) 988-3887.",
        icon: MapPinned,
      },
    ]),
  },
  freightShipping: {
    metadata: {
      title: "Freight Shipping | Expedited Transport Services",
      description: "Reliable freight shipping with on-time coordination, careful handling, and direct communication.",
    },
    eyebrow: "Freight Shipping",
    title: "Freight Shipping",
    summary:
      "Take the stress out of your shipping process with the services from Expedited Transport Services. As a trusted freight company with a history of success, we allow you to focus on more important things while we get your materials to their destination on time.",
    body:
      "Don\'t hesitate to contact us if you would like to learn more about what we have to offer. Reach us at (860) 988-3887 today.",
    imageSrc: "/images/ship.jpg",
    imageAlt: "Freight shipping support",
    points: ["On-time deliveries", "Clear communication", "Careful freight handling"],
    hideHeroAccent: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    hideLowerSections: true,
    cards: makeCards([
      { title: "Dock coordination", description: "Keep freight lined up for the next step with clear pickup and loading coordination.", icon: Ship },
      { title: "Transit tracking", description: "Stay informed on where your freight is during the trip with simple visibility.", icon: MapPinned },
      { title: "Arrival planning", description: "Plan delivery timing with a process built around predictability and direct updates.", icon: Clock3 },
    ]),
  },
  freightTransportation: {
    metadata: {
      title: "Freight Transportation | Expedited Transport Services",
      description: "Freight transportation services with dependable scheduling, careful handling, and clear communication.",
    },
    eyebrow: "",
    title: "Freight Transportation",
    summary:
      "Expedited Transport Services is the name to remember for freight transportation services. Our reliability, professionalism, and transparent pricing have helped us distinguish ourselves as a trustworthy company with many loyal clients. For more information about the benefits of working with us, we invite you to get in touch with us at (860) 988-3887.",
    body: "",
    imageSrc: "/images/truck2.jpg",
    imageAlt: "Freight transportation support",
    points: [],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    hideLowerSections: true,
    cards: makeCards([
      { title: "Regional coverage", description: "Dummy copy for handling local and regional freight moves with ease.", icon: MapPinned },
      { title: "Cross-dock support", description: "Placeholder language for faster transfers between inbound and outbound legs.", icon: Warehouse },
      { title: "Route optimization", description: "Basic notes about selecting the simplest path for freight movement.", icon: Waypoints },
    ]),
  },
  logisticsServices: {
    metadata: {
      title: "Logistics Services | Expedited Transport Services",
      description: "Logistics services with attentive planning, on-time coordination, and budget-conscious freight support.",
    },
    eyebrow: "",
    title: "Logistics Services",
    summary:
      "Could your supply chain benefit from some added efficiency? The transportation and logistics services from Expedited Transport Services are everything you need to make that happen. Our attentive staff utilizes in-depth industry knowledge and advanced software to ensure that all of your deliveries are completed on time and according to budget.",
    body: "Speak with our experts today by calling (860) 988-3887.",
    imageSrc: "/images/truck3.jpg",
    imageAlt: "Logistics services support",
    points: [],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    hideLowerSections: true,
    cards: makeCards([
      { title: "Load planning", description: "Placeholder workflow notes for preparing shipments before they move.", icon: Boxes },
      { title: "Shipment visibility", description: "Dummy details for keeping stakeholders informed at every step.", icon: MapPinned },
      { title: "Communication", description: "A simple stand-in for keeping everyone on the same page.", icon: BarChart3 },
    ]),
  },
  carrierServices: {
    metadata: {
      title: "Carrier Services | Expedited Transport Services",
      description: "Carrier services with secure, cost-effective freight support and dependable communication.",
    },
    eyebrow: "",
    title: "Carrier Services",
    summary:
      "When you need to transport large shipments, hiring a carrier service is the most secure and cost-effective way to do so. Here at Expedited Transport Services, we specialize in all types of freight shipping and pride ourselves on our dependable service.",
    body: "If you would like to discuss the products you need to be shipped and how we can accommodate them, please get in touch with us at (860) 988-3887.",
    imageSrc: "/images/truck4.jpg",
    imageAlt: "Carrier services support",
    points: [],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    hideLowerSections: true,
    cards: makeCards([
      { title: "Capacity matching", description: "Dummy copy for pairing the right truck with the right shipment.", icon: Truck },
      { title: "Driver coordination", description: "Placeholder note for communication before, during, and after the load.", icon: Waypoints },
      { title: "Delivery proof", description: "A simple stand-in for completed delivery confirmation.", icon: CheckCircle2 },
    ]),
  },
  localTruckingCompany: {
    metadata: {
      title: "Local Trucking Company | Expedited Transport Services",
      description: "Local trucking services with honest rates, direct coordination, and reliable nearby freight support.",
    },
    eyebrow: "",
    title: "Local Trucking\nCompany",
    summary:
      "When you want to ensure that you are hiring a reputable trucking company, it always helps to go local. Here at Expedited Transport Services, we take pride in providing the surrounding area with valuable trucking services at honest rates.",
    body: "Keep your business running smoothly without taking a gamble with a faraway freight carrier by contacting us at (860) 988-3887.",
    imageSrc: "/images/truck1.jpg",
    imageAlt: "Local trucking support",
    points: [],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    hideLowerSections: true,
    cards: makeCards([
      { title: "Nearby routes", description: "Dummy copy for short-distance moves and local delivery support.", icon: MapPinned },
      { title: "Flexible pickups", description: "Placeholder text for adapting to changing pickup windows.", icon: Clock3 },
      { title: "Simple dispatch", description: "A basic note for getting local freight moving quickly.", icon: Truck },
    ]),
  },
} satisfies Record<string, ServicePageData>;








