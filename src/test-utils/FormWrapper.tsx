import { ReactNode } from 'react';
import { useForm, FormProvider } from "react-hook-form";

const FormWrapper = ({ children}: { children: ReactNode }) => {
  const methods = useForm({ defaultValues: [] });
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(jest.fn())}>
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
