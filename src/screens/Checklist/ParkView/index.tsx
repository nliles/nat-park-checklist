import ParkList from "screens/Checklist/ParkList";
import Map from "components/Map";
import Spinner from "components/ui/Spinner";
import Dropdown from "components/ui/Dropdown";
import Header from "components/Header";
import startCase from "lodash/startCase";
import { LIST_OPTIONS } from "../../../constants";
import getParkTotal from "helpers/getParkTotal";
import { ParkViewProps } from "./types";
import styles from "./index.module.scss";

const ParkView = ({
  loading = false,
  parks,
  selectedParks = [],
  initialValues,
  selectedDropdownItem,
  handleListItemChange,
  handleOnChange,
  handleSubmit,
  saveFormRes,
}: ParkViewProps) => {
  const formatListItem = (item: string) => {
    return `${startCase(item)}s (${getParkTotal(item)})`;
  };

  const dropdownItem = startCase(selectedDropdownItem);

  return (
    <div className={styles.container}>
      <Header title={`${dropdownItem}s`} />
      {loading && <Spinner />}
      {!loading && (
        <>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              list={LIST_OPTIONS}
              initialSelectedItem={selectedDropdownItem}
              handleClick={handleListItemChange}
              formatListItem={formatListItem}
            />
          </div>
          <Map
            parks={parks}
            selectedParks={selectedParks}
            styleName={styles.map}
          />
          <ParkList
            parks={parks}
            selectedDropdownItem={dropdownItem}
            initialParkValues={initialValues}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleSubmit}
            saveFormRes={saveFormRes}
          />
        </>
      )}
    </div>
  );
};

export default ParkView;
