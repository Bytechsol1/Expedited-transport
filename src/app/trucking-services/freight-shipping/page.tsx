import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicePages } from "@/lib/service-pages";

export const metadata = servicePages.freightShipping.metadata;

export default function FreightShippingPage() {
  return <ServicePageTemplate {...servicePages.freightShipping} />;
}
