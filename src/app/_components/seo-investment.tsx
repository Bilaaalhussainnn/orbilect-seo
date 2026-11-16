import { ServiceInvestment } from "./service-investment";

export default function SeoInvestment({ pricingPage = false }: { pricingPage?: boolean } = {}) {
  return <ServiceInvestment pricingPage={pricingPage} />;
}
