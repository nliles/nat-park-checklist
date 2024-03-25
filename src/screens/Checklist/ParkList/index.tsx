import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { Park } from "types/park";
import startCase from "lodash/startCase";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import Checkbox from "components/ui/Checkbox";
import getParkDesignation from "helpers/getParkDesignation";
import styles from "./ParkList.module.scss";

type ListProps = {
  parks: Park[];
  listTitle: string;
  handleOnSubmit: () => void;
};

const ParkList = ({
  parks = [],
  listTitle,
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
        <h2>{listTitle}</h2>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {parks.length ? (
          <div className={styles.listContainer}>
            {parks.map((park, i) => {
              const formattedName = getParkDesignation(
                park.designation,
                park.parkCode
              );
              return (
                <Checkbox
                  key={park.fullName}
                  label={`${i + 1}. ${park.fullName}`}
                  id={park.id}
                  name={`parkData.${formattedName}`}
                />
              );
            })}
          </div>
        ) : (
          <em className={styles.noResults}>No results found</em>
        )}
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
