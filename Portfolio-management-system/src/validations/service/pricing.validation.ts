import * as yup from "yup";

export const servicePricingSchema = yup.object({
  pricing: yup.string().required("Pricing is required"),
  duration: yup.string().required("Duration is required"),
});

export type ServicePricingData = yup.InferType<typeof servicePricingSchema>;
