import React, { Dispatch } from "react";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { Park } from "types";
import { Response } from "types";
import FormikEffect from "./FormikEffect";
import Button from "components/ui/Button";
import Checkbox from "components/ui/Checkbox";
import Total from "components/Total";
import FormHelper from "components/ui/FormHelper";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  selectedParks: string[];
  handleOnChange: (values: string[]) => void;
  handleSubmit: () => void;
  saveFormRes?: string;
  setSaveFormRes: Dispatch<React.SetStateAction<Response | undefined>>;
};

const List = ({
  parks = [],
  initialParkValues,
  selectedDropdownItem,
  handleOnChange,
  selectedParks = [],
  handleSubmit,
  saveFormRes,
  setSaveFormRes,
}: ListType) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const count = parks.filter((p: any) => selectedParks.includes(p.id)).length;

  const initialValues = {
    parkData: initialParkValues || [],
  };

  const handleOnSubmit = async () => {
    await handleSubmit();
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
      <div className={styles.header}>
        <h2>{`${selectedDropdownItem.replaceAll("-", " ")} checklist`}</h2>
        <Total count={count} total={parks.length} styleName={styles.count} />
      </div>
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ dirty, isSubmitting }) => {
          return (
            <>
              <FormikEffect
                initialValues={selectedParks || []}
                onChange={handleOnChange}
              />
              <Form onChange={handleFormChange} aria-describedby={describedby}>
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
                {isLoggedIn && (
                  <div className={styles.buttonWrapper}>
                    <Button
                      sizeSm
                      disabled={isSubmitting || !dirty}
                      isLoading={isSubmitting}
                      txt="Save"
                      type="submit"
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
