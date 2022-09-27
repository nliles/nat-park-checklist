import { useEffect } from "react";
import { useFormikContext} from 'formik'
import isEqual from 'lodash/isEqual';

type Values = {
  parkData: string[];
};

const FormikEffect = ({ initialValues, onChange }: { initialValues: string[], onChange: (values: string[]) => void }) => {
  const { values } = useFormikContext<Values>();

  useEffect(() => {
    if (!isEqual(initialValues, values.parkData)) {
      onChange(values.parkData)
    }
  }, [initialValues, values, onChange])

  return null
}

export default FormikEffect
