import React, { Dispatch } from "react";
import List from "screens/Checklist/List";
import Map from "components/Map";
import Spinner from "components/ui/Spinner";
import Dropdown from "components/ui/Dropdown";
import { Response, Park } from "types";
import Header from "components/Header";
import startCase from "lodash/startCase";
import { LIST_OPTIONS } from "../../../constants";
import getParkTotal from "helpers/getParkTotal";
import styles from "./index.module.scss";

type ParkViewType = {
  handleListItemChange: (item: string) => void;
  loading: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks: string[];
  selectedDropdownItem: string;
  handleOnChange: (values: string[]) => void;
  handleSubmit: (values: string[]) => void;
  saveFormRes?: string;
  setSaveFormRes: Dispatch<React.SetStateAction<Response | undefined>>;
};

const ParkView = ({
  loading,
  parks,
  selectedParks,
  initialValues,
  selectedDropdownItem,
  handleListItemChange,
  handleOnChange,
  handleSubmit,
  saveFormRes,
  setSaveFormRes,
}: ParkViewType) => {
  const formatListItem = (item: string) => {
    const count = getParkTotal(item);
    return `${startCase(item)}s (${count})`;
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
            handleSubmit={handleSubmit}
            saveFormRes={saveFormRes}
            setSaveFormRes={setSaveFormRes}
          />
        </>
      )}
    </div>
  );
};

export default ParkView;
