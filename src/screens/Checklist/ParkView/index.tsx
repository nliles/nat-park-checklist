import List from "screens/Checklist/List";
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
  setSaveFormRes,
}: ParkViewProps) => {
  const formatListItem = (item: string) => {
    return `${startCase(item)}s (${getParkTotal(item)})`;
  };

  return (
    <div className={styles.container}>
      <Header title={`${startCase(selectedDropdownItem)}s`} />
      {loading && <Spinner />}
      {!loading && (
        <>
          <div className={styles.dropdownWrapper}>
            <Dropdown
              list={LIST_OPTIONS}
              initialSelectedItem={`${startCase(selectedDropdownItem)}s`}
              handleClick={handleListItemChange}
              formatListItem={formatListItem}
            />
          </div>
          <Map
            parks={parks}
            selectedParks={selectedParks}
            styleName={styles.map}
          />
          <List
            parks={parks}
            selectedDropdownItem={selectedDropdownItem}
            initialParkValues={initialValues}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleSubmit}
            saveFormRes={saveFormRes}
            setSaveFormRes={setSaveFormRes}
          />
        </>
      )}
    </div>
  );
};

export default ParkView;
