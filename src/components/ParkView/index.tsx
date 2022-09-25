import List from "components/List";
import Map from "components/Map";
import Spinner from "components/ui/Spinner";
import SubNav from "components/SubNav";
import Dropdown from "../ui/Dropdown";
import { Park } from "types";
import { removeDashes } from "helpers";
import { LIST_OPTIONS } from "../../constants";
import styles from "./index.module.scss";

type ParkViewType = {
  handleListItemChange: (item: string) => void;
  handleSelected: (item: string) => void;
  loading: boolean;
  parks: Park[];
  selectedParks: string[];
  selectedDropdownItem: string;
  handleSaveData: () => void;
};

const ParkView = ({
  loading,
  parks,
  selectedParks,
  selectedDropdownItem,
  handleListItemChange,
  handleSelected,
  handleSaveData,
}: ParkViewType) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h2 className={styles.header}>{`${removeDashes(
          selectedDropdownItem
        )}s`}</h2>
      </div>
      {loading && <Spinner />}
      {!loading && (
        <>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              list={LIST_OPTIONS}
              initialSelectedItem={selectedDropdownItem}
              handleClick={handleListItemChange}
            />
          </div>
          <Map parks={parks} selectedParks={selectedParks} />
          <List
            parks={parks}
            selectedDropdownItem={selectedDropdownItem}
            selectedParks={selectedParks}
            handleChange={handleSelected}
            handleSubmit={handleSaveData}
          />
        </>
      )}
    </div>
  );
};

export default ParkView;
