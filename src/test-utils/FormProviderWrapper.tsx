import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { defaultSelectedValues } from "../constants";

const FormProviderWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm({
    defaultValues: { parkData: defaultSelectedValues },
  });
  return <FormProvider {...methods} getValues={jest.fn()}>{children}</FormProvider>;
};

export default FormProviderWrapper;
