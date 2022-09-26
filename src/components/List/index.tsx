import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { Park } from "types";
import Button from "components/ui/Button";
import Checkbox from "components/ui/Checkbox";
import Total from "components/Total";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  selectedParks: string[];
  handleChange: (items: string[]) => void;
  handleSubmit: () => void;
};

const showLogIn = true;

const List = ({
  parks = [],
  selectedDropdownItem,
  selectedParks = [],
  handleChange,
  handleSubmit,
}: ListType) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const count = parks.filter((p: any) => selectedParks.includes(p.id)).length;

  type Values = {
    parkData: string[];
  };

  const handleOnChange = (values: Values) => {
    handleChange(values.parkData);
  };

  const initialValues = {
    parkData: [],
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
            <Form onChange={() => handleOnChange(values)}>
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
                <Button
                  sizeSm
                  disabled={isSubmitting || !dirty || !isValid}
                  txt="Save"
                  type="submit"
                  styleName={styles.button}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default List;
