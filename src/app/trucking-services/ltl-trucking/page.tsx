import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.ltlTrucking.metadata;

export default function LtlTruckingServicesPage() {
  return <ServicePageTemplate {...servicePages.ltlTrucking} />;
}
