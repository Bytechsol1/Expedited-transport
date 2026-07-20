import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.freightTransportation.metadata;

export default function FreightTransportationPage() {
  return <ServicePageTemplate {...servicePages.freightTransportation} />;
}
