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
    accordionTitle: "All the Information You Need on Freight Trucking",
    accordionDescription: "If you are looking to bring some dependability to your supply chain, then we are here to help. We want all of our prospective clients to feel comfortable working with us, which is why we pride ourselves on our honest and upfront approach. If you have any questions or concerns, all you need to do is reach out to us for a prompt response and detailed answers.",
    points: [
      "LTL trucking",
      "Dry van trucking",
      "Logistics services",
      "Warehousing services",
      "Or any other trucking services"
    ],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    cards: makeCards([
      {
        title: "Comprehensive Freight Transportation",
        description: "Throughout our time in business, we have worked hard to develop connections and improve upon the services we provide. These days, we feel confident saying that we provide a complete offering of valuable transportation services. If you are looking for a freight company that does it all, then you have come to the right place.",
        icon: Truck,
      },
      {
        title: "Freight Shipping You Never Have to Wait On",
        description: "Punctuality matters in the trucking industry, and we do everything in our power to ensure our clients never have to worry about late arrivals. With a measurable history of success and a commitment to timely service, your cargo is always in capable hands when you trust it with us. Make sure you never have to worry about missed deadlines or service interruptions by hiring our qualified crew.",
        icon: Clock3,
      },
      {
        title: "Your Freight Is Safe with Us",
        description: "When you want to ensure safe and secure transportation for your valuable materials, Expedited Transport Services is the company to hire. We use industry-leading safety measures and plan all of our jobs carefully to ensure that your products reach their destination in perfect condition. If you have any questions about our ability to handle your cargo safely, don’t hesitate to contact us.",
        icon: ShieldCheck,
      },
      {
        title: "Budget-Conscious Freight Shipping",
        description: "Hiring the best trucking company available is only worthwhile if it fits into your budget. With that in mind, you can always expect straightforward pricing without any hidden or surprise fees when you choose us for the job. Our services are competitively priced and are part of the reason why so many businesses choose us for all of their hauling.",
        icon: Waypoints,
      }
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
      "Could your supply chain benefit from some added efficiency? The transportation and logistics services from Expedited Transport Services are everything you need to make that happen. Our attentive staff utilizes in-depth industry knowledge and advanced software to ensure that all of your deliveries are completed on time and according to budget. Speak with our experts today by calling (860) 988-3887.",
    body: "",
    imageSrc: "/images/truck3.jpg",
    imageAlt: "Logistics services support",
    accordionTitle: "Work with a Top Logistics Company",
    accordionDescription: "The purpose of transport logistics is to oversee your entire supply chain and make intelligent decisions that will help optimize your freight shipments. If you are tired of the headache that comes along with organizing your deliveries, then you are guaranteed to find value in our services. We are proud to be a logistics company trusted by many organizations who count on us to make sure their shipments reach their destination in the smoothest way possible. No matter the size of your business, you can count on us to scale with you and stay on top of all of your transportation needs.",
    points: [
      "Planning and optimizing routes",
      "Order management",
      "Freight auditing",
      "Selecting transportation carriers",
      "Warehousing and inventory management",
      "Customs management"
    ],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    cards: makeCards([
      {
        title: "Minimize Your Costs with Freight Logistics",
        description: "One clear benefit of using our logistic services is the cost-saving benefits. Not only will our professional management help reduce some of the unnecessary spendings within your supply chain, but it will also allow you and your staff to be more productive during your workday. On top of this, we provide our services at honest and affordable rates, so you can truly maximize your budget.",
        icon: Boxes,
      },
      {
        title: "Open Communication with Your Logistics Company",
        description: "Here at Expedited Transport Services, we do everything we can to ensure a pleasant and worthwhile experience for our clients. We make sure to provide you with all of the relevant details regarding your transportation process and are always available to answer questions that come to you along the way. You never have to be left in the dark regarding your shipments again with our qualified logistics.",
        icon: MapPinned,
      },
      {
        title: "The Only Logistics Company You Need",
        description: "A lot of time and effort goes into managing your supply chain. Constantly researching, contacting, and dealing with transportation companies takes time out of your day and requires a lot of energy. With that in mind, our goal is to be the only point of contact you need to ensure all of your shipments go smoothly. Stop spreading yourself thin and let our industry experts handle everything for you.",
        icon: BarChart3,
      },
      {
        title: "Highly Recommended Logistics Experts",
        description: "Throughout our time in business, we have earned a reputation as a reliable resource for any business that relies on the transportation of goods. We have been honored to establish partnerships with many fantastic companies who rely on us to keep them running smoothly, and we hope to count you among them soon.",
        icon: CheckCircle2,
      }
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
      "When you need to transport large shipments, hiring a carrier service is the most secure and cost-effective way to do so. Here at Expedited Transport Services, we specialize in all types of freight shipping and pride ourselves on our dependable service. If you would like to discuss the products you need to be shipped and how we can accommodate them, please get in touch with us at (860) 988-3887.",
    body: "",
    imageSrc: "/images/carrier-hero.png",
    imageAlt: "Carrier services support",
    accordionTitle: "Reliable Shipping Estimates",
    accordionDescription: "Having a trustworthy overview of your shipping rates makes it much easier to feel confident when hiring a carrier service, which is something we strive to provide for all of our prospective clients. Our time in the industry, combined with our dedication to our clients, ensures that you never have to worry about hurting your bottom line when using our trucking services.",
    points: [
      "Cost-effective shipping rates",
      "Accommodating freight services",
      "FTL, LTL, and PTL options",
      "Dependable communication",
      "Professional shipping equipment"
    ],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    cards: makeCards([
      {
        title: "Accommodating Freight Shippers",
        description: "With our shipping services, you only pay for the space you need. No matter the size of your load, you can count on us to pick it up and transport it in the most budget-friendly way. We aim to provide all of our clients with the most convenient options to keep their supply chain moving when it needs to be.",
        icon: Truck,
      },
      {
        title: "Full Truckload (FTL) Shipping",
        description: "This option is for when you know that you will be able to fill up an entire shipping container with your product and materials. This is typically the quickest option, as no other pickups or drop-offs will need to be conducted on the way to the destination.",
        icon: Waypoints,
      },
      {
        title: "Less Than Truckload (LTL) Shipping",
        description: "LTL freight shipping is ideal for when you only have a small size load that needs to be transported. If your shipment exceeds 150lbs but is still much smaller than a full freight container, we are the ideal shipping carrier. We plan the logistics carefully and coordinate your shipment with other deliveries so that you do not have to pay for a full truckload when you don’t need it.",
        icon: Warehouse,
      },
      {
        title: "Partial Truckload (PTL) Shipping",
        description: "In between FTL and LTL shipping, partial truckload shipping takes up about half of a standard freight container. This allows you to receive the cost-saving benefits of grouping your shipment while also minimizing the handling required, which means your products will reach their destination faster.",
        icon: MapPinned,
      },
      {
        title: "Your Shipments Are Safe with Our Carrier Services",
        description: "With a great deal of experience on the road and professional shipping equipment, you can always feel secure when you use our carrier services. We will carefully load and secure your materials to ensure that they will be kept safe throughout transit. Thanks to our careful approach, you can breathe easy knowing that we will help you eliminate damage and get your products to their location in perfect condition.",
        icon: ShieldCheck,
      }
    ]),
  },
  localTruckingCompany: {
    metadata: {
      title: "Local Trucking Company | Expedited Transport Services",
      description: "Local trucking services with honest rates, direct coordination, and reliable nearby freight support.",
    },
    eyebrow: "",
    title: "Local Trucking Company",
    summary:
      "When you want to ensure that you are hiring a reputable trucking company, it always helps to go local. Here at Expedited Transport Services, we take pride in providing the surrounding area with valuable trucking services at honest rates. Keep your business running smoothly without taking a gamble with a faraway freight carrier by contacting us at (860) 988-3887.",
    body: "",
    imageSrc: "/images/local-trucking-hero-new.png",
    imageAlt: "Local trucking support",
    accordionTitle: "The Leading Local Trucking Company",
    accordionDescription: "Here at Expedited Transport Services, we are driven by constant improvement and success. Providing our valued clients with exceptional service is very important to us, which has helped us earn a solid reputation both locally and nationwide. Some of the things that help us stand out as a local trucking service include:",
    points: [
      "Transparent and competitive pricing",
      "Experienced drivers",
      "Knowledgeable local logistics experts",
      "Dedicated customer service",
      "Punctual deliveries",
      "Well-maintained vehicles"
    ],
    hideHeroAccent: true,
    hideHeroEyebrow: true,
    hideHeroNote: true,
    hideHeroPoints: true,
    cards: makeCards([
      {
        title: "Top-Notch Service from Local Freight Carriers",
        description: "With our vast knowledge of the local area and a strong commitment to our clients, you can always expect a positive experience when you work with us. We put a strong emphasis on open communication and do everything we can to ensure that one-time customers become repeat customers. We encourage you to give us a call if you have any questions about our ability to meet your needs.",
        icon: MapPinned,
      },
      {
        title: "Feel Secure with Our Local Trucking Service",
        description: "When you trust a third party to transport cargo for your business, you always want to feel confident that it will arrive in the same condition it leaves in. To ensure that our clients have nothing to worry about, we are dedicated to taking all of the appropriate measures to guarantee safe transit. Our vehicles are frequently inspected and serviced, and we pay careful attention during the loading and unloading process to make sure that there is never any room for error.",
        icon: ShieldCheck,
      },
      {
        title: "Local Hauling That’s Completed on Time",
        description: "We know how important it is for our clients to receive their shipments on time, which is why we plan carefully and utilize all of our resources to provide exactly that. Our familiarity with the local area and time in the industry means that we never make promises we can’t keep. When we are behind your trucking, you can relax knowing that we will reach your destination on time.",
        icon: Clock3,
      },
      {
        title: "Save Money with Our Local Freight Company",
        description: "We are loyal to our customers here at Expedited Transport Services, and this includes a promise always to charge fair and straightforward prices for our transportation services. When you want to know exactly where your budget is going, you can always trust the rates we charge. If you would like to discuss the hauling you need and get an estimate on the expected costs, we encourage you to get in touch.",
        icon: Waypoints,
      }
    ]),
  },
} satisfies Record<string, ServicePageData>;








