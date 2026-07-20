import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.localTruckingCompany.metadata;

export default function LocalTruckingCompanyPage() {
  return <ServicePageTemplate {...servicePages.localTruckingCompany} />;
}
