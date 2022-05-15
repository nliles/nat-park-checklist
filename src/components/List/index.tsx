import ListItem from "../ListItem";
import { Park } from "../../types";
import styles from "./index.module.scss";

type ListType = {
  parks: Park[];
  selectedParks: string[];
  handleChange: (item: string) => void;
};

const List = ({ parks = [], selectedParks = [], handleChange }: ListType) => {
  const count = parks.filter((p: any) => selectedParks.includes(p.id)).length;
  const countDisplay = `${count} out of ${parks.length}`;
  return (
    <div className={styles.container}>
      <h2>
        Checklist <span className={styles.count}>{countDisplay}</span>
      </h2>
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
