import List from "../List";
import Map from "../Map";
import Spinner from "../ui/Spinner";
import SubNav from "../SubNav";
import NavBar from "../NavBar";
import { Park } from "../../types";
import { removeDashes } from "../../helpers";
import styles from "./index.module.scss";

type ParkViewType = {
  handleListItemChange: (item: string) => void;
  handleSelected: (item: string) => void;
  loading: boolean;
  parks: Park[];
  selectedParks: string[];
  selectedDropdownItem: string;
};

const ParkView = ({
  loading,
  parks,
  selectedParks,
  selectedDropdownItem,
  handleListItemChange,
  handleSelected,
}: ParkViewType) => {
  return (
    <div className={styles.container}>
      <NavBar/>
      <div className={styles.titleSection}>
        <h2 className={styles.header}>{`${removeDashes(
          selectedDropdownItem
        )}s`}</h2>
      </div>
      {loading && <Spinner />}
      {!loading && (
        <>
          <SubNav
            selectedParks={selectedParks}
            selectedDropdownItem={selectedDropdownItem}
            handleListItemChange={handleListItemChange}
          />
          <Map parks={parks} selectedParks={selectedParks} />
          <List
            parks={parks}
            selectedDropdownItem={selectedDropdownItem}
            selectedParks={selectedParks}
            handleChange={handleSelected}
          />
        </>
      )}
    </div>
  );
};

export default ParkView;
