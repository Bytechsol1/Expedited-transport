const fs = require('fs');
const expedited = fs.readFileSync('src/app/trucking-services/expedited-trucking/page.tsx', 'utf8');

let ltl = expedited.replace(/ExpeditedTruckingPage/g, 'LtlTruckingServicesPage');
ltl = ltl.replace(/expeditedTrucking/g, 'ltlTrucking');
ltl = ltl.replace(/Expedited Trucking/g, 'LTL Trucking');
ltl = ltl.replace(/<span>Expedited<\/span>/g, '<span>LTL<\/span>');

// Replace benefits
const oldBenefits = `const benefits = [
  "Guaranteed delivery times",
  "Real-time status notifications",
  "Fewer stops and flexible deliveries",
  "Reduced handling of your items",
  "Dedicated customer service",
];`;

const newBenefits = `const benefits = [
  "Less than 12 pallets or 15,000 lbs",
  "Save on shipping rates",
  "Reduce warehousing costs",
  "Straightforward tracking",
  "Additional services (liftgates, inside pickup)",
  "Reducing environmental impact",
];`;
ltl = ltl.replace(oldBenefits, newBenefits);

// Replace summary
const oldSummary = `Experience unmatched reliability in time-critical delivery. Our premium semi-truck fleet, featuring high-capacity cargo bays and powerful engines, is built for speed and security. We guarantee your most urgent shipments reach their destination on schedule. Contact us to optimize your high-priority cargo logistics.`;

const newSummary = `Just because you don't have enough freight to fill up a truck does not mean you have to be throwing money away. With Expedited Transport Services, you only pay for the space you need. Our less-than-truckload shipping services are everything you need to keep your operation running smoothly without worrying about the size of your cargo.`;
ltl = ltl.replace(oldSummary, newSummary);

// Replace split header
ltl = ltl.replace('Trust Your Business with Our Expedited Freight Company', 'The Best LTL Carrier for Smaller Shipments');
ltl = ltl.replace('Having successfully completed many different accelerated shipping jobs, we have made a name for ourselves as a top-notch resource for quick and stress-free deliveries. If you are depending on materials reaching their destination by a particular date, we encourage you to get in touch with us and we will help you work out the details for your shipment as quickly as possible.', 'Our carefully coordinated approach is designed to provide a budget-friendly option for smaller freight. We will combine your cargo with other similar shipments while also factoring in your deadlines to ensure timely arrivals without the need for high prices.');
ltl = ltl.replace('Some of the additional benefits of hiring our expedited freight carrier for your job include:', 'Some of the additional benefits of hiring our LTL freight carrier for your job include:');

// Replace features
ltl = ltl.replace('Any Load Size', 'Details Matter');
ltl = ltl.replace('The Expedited Trucking Company for Any Job', 'Details Matter with LTL Trucking');
ltl = ltl.replace('Unlike some hotshot trucking companies, which can only accommodate smaller loads, we are happy to help you with cargo of all shapes and sizes. From single pallets to entire truckloads, our qualified team of trucking experts works hard to get your shipments delivered on time, no matter the distance.', 'We take pride in being a local LTL carrier with strong attention to detail, making sure there is ample space for your materials and that they reach their destination on time.');

ltl = ltl.replace('Affordable Rates', 'Trusted Carrier');
ltl = ltl.replace('Reasonable Rates on Expedited Trucking', 'Work with a Trusted LTL Carrier');
ltl = ltl.replace('Just because you need your products delivered quickly does not mean it needs to hurt your bottom line. Thanks to our honest and affordable pricing structure, you can get your freight to where it needs to be without overspending. In fact, many of our clients have come to depend on our expedited shipping for all of their deliveries, helping them lower inventory costs and add flexibility to their supply chain.', 'We are honored to already have many businesses trust us to keep them moving, and we hope to count you among them next time you need shipping services.');

ltl = ltl.replace('Safety First', 'Cargo Safety');
ltl = ltl.replace('Your Freight Is Safe with Our Expedited Freight Services', 'Keeping Your Cargo Safe');
ltl = ltl.replace('On top of completing your shipments on time, we also guarantee their safety from start to finish. In fact, there are actually many security benefits that come from our expedited trucking services. Because there will be fewer stops and fewer handling requirements during transit, there is less chance for damage or loss during the process.', 'Our carefully organized shipments ensure secure loading so your pallets or other materials are protected during transit.');

ltl = ltl.replace('Customer Experience', 'Expert Advice');
ltl = ltl.replace('Stay Informed with Our Expedited Trucking Company', 'When to Hire an LTL Freight Company');
ltl = ltl.replace('In addition to our punctual deliveries, we also pride ourselves on our fantastic customer experience. We know that our clients are hinging their business on our expedited trucking, which is why we do everything to help them feel confident with their decision. We can provide you with real-time status updates throughout the process and answer any questions that come to mind along the way.', 'If you are on the fence about whether to use an LTL trucking company or not, our experts will be happy to help and give you an honest recommendation.');

ltl = ltl.replace('Get Started with Our Expedited Trucking Today', 'Contact Us for LTL Shipping Today');
ltl = ltl.replace('Whether you would like to know more about how we can accommodate your situation or would like to schedule our expedited shipping as soon as possible, we are here to help. We believe that our impressive history in the expedited trucking field makes us an easy choice to transport your freight quickly, carefully, and on budget. Speak with our experts today by calling (860) 988-3887.', 'If you are curious about our LTL shipping services and the benefits we can bring to your operation, give us a call at (860) 988-3887.');
ltl = ltl.replace('Expedited%20Trucking%20Inquiry', 'LTL%20Trucking%20Inquiry');

fs.writeFileSync('src/app/trucking-services/ltl-trucking/page.tsx', ltl);
console.log('Done');
