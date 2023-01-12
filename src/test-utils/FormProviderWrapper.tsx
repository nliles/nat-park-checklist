import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

const FormProviderWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm({ defaultValues: { parkData: {} } });
  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};

export default FormProviderWrapper;
