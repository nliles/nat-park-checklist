import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import Checkbox from "components/ui/Checkbox";
import Total from "components/Total";
import FormHelper from "components/ui/FormHelper";
import { ListProps } from "./types";
import copy from "./en";
import styles from "./index.module.scss";

const ParkList = ({
  parks = [],
  initialParkValues,
  selectedDropdownItem,
  handleOnChange,
  handleOnSubmit,
  saveFormRes,
  setSaveFormRes,
}: ListProps) => {
  const onSubmit = async (data: { parkData: string[] }) => {
    await handleOnSubmit(data.parkData);
  };

  const isLoggedIn = useSelector((state: State) => !!state.auth.token);

  const methods = useForm({
    defaultValues: {
      parkData: initialParkValues || [],
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
    watch,
  } = methods;

  const formData = watch().parkData;

  const handleChange = () => {
    handleOnChange(formData);
  }

  const error =
    saveFormRes === "error" ? copy.errorMsg : "";
  const success = saveFormRes === "success" ? copy.successMsg : "";
  const describedby = error ? "form_error" : "form_helper";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{`${selectedDropdownItem} checklist`}</h2>
        <Total count={formData.length} total={parks.length} styleName={styles.count} />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} aria-describedby={describedby}>
          <div className={styles.listContainer}>
            {parks &&
              parks.map((park, i) => (
                <Checkbox
                  key={park.fullName}
                  label={`${i + 1}. ${park.fullName}`}
                  id={park.id}
                  name="parkData"
                  handleOnChange={handleChange}
                />
              ))}
          </div>
          {isLoggedIn && (
            <div className={styles.buttonWrapper}>
              <Button
                sizeSm
                disabled={!isDirty}
                isLoading={isSubmitting}
                txt="Save"
                type={ButtonType.SUBMIT}
              />
              <FormHelper id="form" error={error} success={success} delay={3} />
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default ParkList;
