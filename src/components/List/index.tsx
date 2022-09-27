import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { Park } from "types";
import FormikEffect from './FormikEffect'
import Button from "components/ui/Button";
import Checkbox from "components/ui/Checkbox";
import Total from "components/Total";
import FormError from "components/ui/FormError";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  selectedParks: string[];
  handleOnChange: (values: string[]) => void;
  handleSubmit: () => void;
  saveError?: string;
};

const showLogIn = true;

const List = ({
  parks = [],
  selectedDropdownItem,
  handleOnChange,
  selectedParks = [],
  handleSubmit,
  saveError
}: ListType) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const count = parks.filter((p: any) => selectedParks.includes(p.id)).length;

  type Values = {
    parkData: string[];
  };

  const initialValues = {
    parkData: selectedParks || [],
  };

  const handleOnSubmit = async () => {
    await handleSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{`${selectedDropdownItem.replaceAll("-", " ")} checklist`}</h2>
        <Total count={count} total={parks.length} styleName={styles.count} />
      </div>
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ values, isValid, dirty, isSubmitting }) => {
          return (
          <>
           <FormikEffect initialValues={selectedParks || []} onChange={handleOnChange}/>
            <Form>
              <div className={styles.listContainer}>
                {parks &&
                  parks.map((park: any, i: number) => (
                    <Checkbox
                      key={park.fullName}
                      label={`${i + 1}. ${park.fullName}`}
                      id={park.id}
                      name="parkData"
                    />
                  ))}
              </div>
              {isLoggedIn && showLogIn && (
              <div className={styles.buttonWrapper}>
                <Button
                  sizeSm
                  disabled={isSubmitting || !dirty || !isValid}
                  txt="Save"
                  type="submit"
                />
                <FormError id="form" error={saveError}/>
                </div>
              )}
            </Form>
          </>
          );
        }}
      </Formik>
    </div>
  );
};

export default List;
