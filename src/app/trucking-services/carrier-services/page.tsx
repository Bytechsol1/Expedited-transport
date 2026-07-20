import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.carrierServices.metadata;

export default function CarrierServicesPage() {
  return <ServicePageTemplate {...servicePages.carrierServices} />;
}
