import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { Park } from "types/park";
import startCase from "lodash/startCase";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import Checkbox from "components/ui/Checkbox";
import styles from "./index.module.scss";

type ListProps = {
  parks: Park[];
  selectedDropdownItem: string;
  handleOnSubmit: () => void;
};

const ParkList = ({
  parks = [],
  selectedDropdownItem,
  handleOnSubmit,
}: ListProps) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{`${startCase(selectedDropdownItem)} checklist`}</h2>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={styles.listContainer}>
          {parks &&
            parks.map((park, i) => {
              return (
              <Checkbox
                key={park.fullName}
                label={`${i + 1}. ${park.fullName}`}
                id={park.id}
                name={`parkData.${selectedDropdownItem}`}
              />
            )})}
        </div>
        {isLoggedIn && (
          <div className={styles.buttonWrapper}>
            <Button
              sizeSm
              disabled={!isDirty}
              isLoading={isSubmitting}
              text="Save"
              type={ButtonType.SUBMIT}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default ParkList;
