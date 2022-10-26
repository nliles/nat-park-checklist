import React, { Dispatch } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import startCase from "lodash/startCase";
import { State } from "reducers/types";
import { Park } from "types";
import { Response } from "types";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import Checkbox from "components/ui/Checkbox";
import Total from "components/Total";
import FormHelper from "components/ui/FormHelper";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  handleOnChange: (values: string[]) => void;
  handleSubmit: (values: string[]) => void;
  saveFormRes?: string;
  setSaveFormRes: Dispatch<React.SetStateAction<Response | undefined>>;
};

const List = ({
  parks = [],
  initialParkValues,
  selectedDropdownItem,
  handleOnChange,
  handleSubmit,
  saveFormRes,
  setSaveFormRes,
}: ListType) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);

  const initialValues = {
    parkData: initialParkValues || [],
  };

  const handleOnSubmit = async (values: { parkData: string[] }) => {
    await handleSubmit(values.parkData);
  };

  const error =
    saveFormRes === "error" ? "Your data was not saved. Please try again" : "";
  const success = saveFormRes === "success" ? "Saved!" : "";
  const describedby = error ? "form_error" : "form_helper";

  const handleFormChange = () => {
    if (saveFormRes) {
      setSaveFormRes(undefined);
    }
  };

  return (
    <div className={styles.container}>
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ dirty, isSubmitting, values }) => {
          return (
            <>
              <div className={styles.header}>
                <h2>{`${startCase(selectedDropdownItem)} checklist`}</h2>
                <Total
                  count={values.parkData.length}
                  total={parks.length}
                  styleName={styles.count}
                />
              </div>
              <Form onChange={handleFormChange} aria-describedby={describedby}>
                <div className={styles.listContainer}>
                  {parks &&
                    parks.map((park: any, i: number) => (
                      <Checkbox
                        key={park.fullName}
                        label={`${i + 1}. ${park.fullName}`}
                        id={park.id}
                        name="parkData"
                        handleChange={handleOnChange}
                      />
                    ))}
                </div>
                {isLoggedIn && (
                  <div className={styles.buttonWrapper}>
                    <Button
                      sizeSm
                      disabled={isSubmitting || !dirty}
                      isLoading={isSubmitting}
                      txt="Save"
                      type={ButtonType.SUBMIT}
                    />
                    <FormHelper id="form" error={error} success={success} />
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
