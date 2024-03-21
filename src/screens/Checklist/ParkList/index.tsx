import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import camelCase from "lodash/camelCase";
import { Park } from "types/park";
import startCase from "lodash/startCase";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import Checkbox from "components/ui/Checkbox";
import styles from "./index.module.scss";

type ListProps = {
  parks: Park[];
  selectedDropdownItem?: string;
  handleOnSubmit: () => void;
};

const ParkList = ({
  parks = [],
  selectedDropdownItem,
  handleOnSubmit,
}: ListProps) => {
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const headerCopy = selectedDropdownItem ? startCase(selectedDropdownItem) : 'National Park Unit';

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
    watch
  } = useFormContext();

  const formData = watch('parkData');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{`${headerCopy} checklist`}</h2>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={styles.listContainer}>
          {parks &&
            parks.map((park, i) => {
              // TODO: Fix park designations
              const fieldName = formData[camelCase(park.designation)] ? camelCase(park.designation) : 'otherDesignation'
              return (
                <Checkbox
                  key={park.fullName}
                  label={`${i + 1}. ${park.fullName}`}
                  id={park.id}
                  name={`parkData.${fieldName}`}
                />
              );
            })}
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
