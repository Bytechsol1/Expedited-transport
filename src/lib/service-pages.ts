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
      "Just because you don’t have enough freight to fill up a truck does not mean you have to be throwing money away—with Expedited Transport Services, you only pay for the space you need. Our less-than-truckload (LTL) shipping services are everything you need to keep your operation running smoothly without worrying about the size of your cargo. Speak with our experts today by calling (860) 988-3887.",
    body:
      "If you are on the fence about whether to use an LTL trucking company or not, our experts will be happy to help. You are always welcome to get in touch with us for our honest recommendation on the type of shipping you need.",
    imageSrc: "/images/truck1.jpg",
    imageAlt: "LTL trucking support",
    accordionTitle: "When to Hire an LTL Freight Company",
    accordionDescription: "If you are on the fence about whether to use an LTL trucking company or not, our experts will be happy to help. You are always welcome to get in touch with us for our honest recommendation on the type of shipping you need. Some of the reasons you might use our LTL services include:",
    points: [
      "You have less than 12 pallets or 15,000 pounds of freight",
      "You want to save on shipping rates",
      "You want to reduce your warehousing costs",
      "Straightforward tracking information",
      "Additional services, such as liftgates",
      "Reducing your environmental impact",
    ],
    cards: makeCards([
      {
        title: "Fair Prices on Smaller Shipments",
        description: "Our carefully coordinated approach to our shipping services is designed to provide our clients with a budget-friendly option for their smaller freight. We will combine your cargo with other similar shipments while also factoring in your deadlines to ensure timely arrivals without the need for high prices. If you would like to know more about your options, please give us a call.",
        icon: Truck,
      },
      {
        title: "Details Matter with LTL Trucking",
        description: "We take pride in being a local LTL carrier with strong attention to detail. Before we even pick up your freight, we will be focused on the job at hand. Our logistics experts make sure that there will be ample space for your materials when our trucks arrive and that they reach their destination on time. A few small factors can make the difference between a good experience and a great one—which is what we hope to provide for all of our clients.",
        icon: Warehouse,
      },
      {
        title: "Keeping Your Cargo Safe",
        description: "Our careful and well-organized shipments also ensure the safe transit of your valuable materials. We make sure your pallets or other materials are loaded securely into our vehicles with no chance for them to be damaged during transit. This allows you to breathe easy when we are on the job, knowing that you never have to worry about hurting your bottom line by throwing away product.",
        icon: ShieldCheck,
      },
      {
        title: "Work with a Trusted LTL Carrier",
        description: "We are honored to already have many businesses trust us to keep them moving, and we hope to count you among them next time you need shipping services. We have worked hard to constantly push ourselves forward and provide the best service possible for our clients.",
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
      "Take the stress out of your shipping process with the services from Expedited Transport Services. As a trusted freight company with a history of success, we allow you to focus on more important things while we get your materials to their destination on time. Don’t hesitate to contact us if you would like to learn more about what we have to offer. Reach us at (860) 988-3887 today.",
    body: "",
    imageSrc: "/images/ship.jpg",
    imageAlt: "Freight shipping support",
    accordionTitle: "A Dedicated Freight Company",
    accordionDescription: "With so many carriers to choose from, it isn’t always easy to make the right choice for your business. With that in mind, we here at Expedited Transport Services work hard to provide our clients with first-rate shipping solutions that they can feel confident in. If you have been searching for a transportation company that will go the extra mile for you, then you have come to the right place. Some of the benefits of choosing us for your next shipment include:",
    points: [
      "Straightforward and competitive pricing",
      "On-time deliveries",
      "Industry-leading safety measures",
      "Accommodating customer support",
      "Measurable history of success",
      "Experienced and qualified drivers"
    ],
    hideHeroAccent: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    cards: makeCards([
      {
        title: "Upgrade Your Business with Our Freight Shipping",
        description: "Our transportation services are exactly what you need to take your business to the next level. No matter where you need to transport your products or materials, you can count on us to get it there on time and in perfect condition. As you continue to scale up your organization, you can count on us to accommodate your shipping needs at every stage of your growth.",
        icon: Ship,
      },
      {
        title: "Experienced Freight Company",
        description: "We have a wealth of experience in all stages of the shipping process, making us a valuable resource for your operation. Whether you have some burning questions about optimizing your shipments or just want to ensure you are hiring a reputable company, you can’t go wrong when you work with us.",
        icon: MapPinned,
      },
      {
        title: "Consistency Matters with Freight Shipping",
        description: "Having confidence in your freight carrier is important, which is why we strive for excellence with every job that we take. We are proud to have maintained a solid history of punctual and damage-free deliveries, which has helped us become the go-to shipping company for many organizations. When you want to eliminate the chance for errors with your shipping, then we are the team for the job.",
        icon: Clock3,
      },
      {
        title: "Great Customer Service from Your Freight Company",
        description: "We work hard to provide all of our clients with an exceptional experience. We treat everyone who contacts us with the courtesy and respect they deserve, and we are always happy to address any questions or concerns. We also emphasize open communication throughout the entire shipping process, so you never have to worry about being left in the dark on the status of your deliveries.",
        icon: Warehouse,
      }
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








