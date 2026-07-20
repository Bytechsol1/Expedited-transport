import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.expeditedTrucking.metadata;

export default function HotshotTruckingServicesPage() {
  return <ServicePageTemplate {...servicePages.expeditedTrucking} />;
}
