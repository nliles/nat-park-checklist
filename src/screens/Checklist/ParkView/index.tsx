import { useFormContext } from "react-hook-form";
import PageWrapper from "components/PageWrapper";
import ParkDesignation from "enum/ParkDesignation";
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
  count,
  loading = false,
  parks,
  initialValues,
  selectedDropdownItem,
  handleListItemChange,
  handleOnSubmit,
  saveFormRes,
}: ParkViewProps) => {
  const { watch } = useFormContext();

  const formData = watch().parkData || [];

  const formatListItem = (item: string) => {
    return `${startCase(item)}s (${getParkTotal(item as ParkDesignation)})`;
  };

  const dropdownItem = startCase(selectedDropdownItem);
  const formatSelectedItem = (item: string) => `${startCase(item)}s`;

  return (
    <PageWrapper count={count}>
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
                formatSelectedItem={formatSelectedItem}
              />
            </div>
            <Map
              parks={parks}
              selectedParks={formData}
              styleName={styles.map}
            />
            <ParkList
              parks={parks}
              selectedDropdownItem={dropdownItem}
              initialParkValues={initialValues}
              handleOnSubmit={handleOnSubmit}
              saveFormRes={saveFormRes}
            />
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default ParkView;
