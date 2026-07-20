import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.logisticsServices.metadata;

export default function LogisticsServicesPage() {
  return <ServicePageTemplate {...servicePages.logisticsServices} />;
}
