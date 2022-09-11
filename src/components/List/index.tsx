import ListItem from "components/ListItem";
import { Park } from "types";
import Total from "components/Total";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  selectedParks: string[];
  handleChange: (item: string) => void;
};

const List = ({
  parks = [],
  selectedDropdownItem,
  selectedParks = [],
  handleChange,
}: ListType) => {
  const count = parks.filter((p: any) => selectedParks.includes(p.id)).length;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{`${selectedDropdownItem.replaceAll("-", " ")} checklist`}</h2>
        <Total count={count} total={parks.length} styleName={styles.count} />
      </div>
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
    </div>
  );
};

export default List;
