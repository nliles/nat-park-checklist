import ListItem from "components/ListItem";
import { Park } from "types";
import Total from "components/Total";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  selectedParks: string[];
  handleChange: (item: string) => void;
  handleSubmit: () => void;
};

const isLoggedIn = false;

const List = ({
  parks = [],
  selectedDropdownItem,
  selectedParks = [],
  handleChange,
  handleSubmit,
}: ListType) => {
  const count = parks.filter((p: any) => selectedParks.includes(p.id)).length;

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{`${selectedDropdownItem.replaceAll("-", " ")} checklist`}</h2>
        <Total count={count} total={parks.length} styleName={styles.count} />
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.listContainer}>
          {parks &&
            parks.map((park: any, i: number) => (
              <ListItem
                selectedParks={selectedParks}
                key={park.fullName}
                index={i}
                park={park}
                handleChange={handleChange}
              />
            ))}
        </div>
        {isLoggedIn && (
          <button className={styles.button} type="submit">
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default List;
