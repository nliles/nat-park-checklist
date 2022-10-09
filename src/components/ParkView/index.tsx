import React, { Dispatch } from "react";
import List from "components/List";
import Map from "components/Map";
import Spinner from "components/ui/Spinner";
import Dropdown from "../ui/Dropdown";
import { Response, Park } from "types";
import Header from "components/Header";
import { removeDashes } from "helpers";
import { LIST_OPTIONS } from "../../constants";
import styles from "./index.module.scss";

type ParkViewType = {
  handleListItemChange: (item: string) => void;
  loading: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks: string[];
  selectedDropdownItem: string;
  handleOnChange: (values: string[]) => void;
  handleSubmit: () => void;
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
  return (
    <div className={styles.container}>
      <Header title={`${removeDashes(selectedDropdownItem)}s`} />
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
            initialParkValues={initialValues}
            selectedParks={selectedParks}
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
