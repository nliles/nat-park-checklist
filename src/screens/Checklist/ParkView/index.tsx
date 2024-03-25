import { useFormContext } from "react-hook-form";
import cn from "classnames";
import PageWrapper from "components/PageWrapper";
import { Park } from "types/park";
import ParkDesignation, { ParkDesignationType } from "enum/ParkDesignation";
import ParkList from "screens/Checklist/ParkList";
import Map from "components/Map";
import Total from "components/Total";
import Spinner from "components/ui/Spinner";
import Dropdown from "components/ui/Dropdown";
import Header from "components/Header";
import getParkDesignation from "helpers/getParkDesignation";
import startCase from "lodash/startCase";
import { LIST_OPTIONS, STATES_LIST } from "../../../constants";
import getParkTotal from "helpers/getParkTotal";
import copy from "./copy";
import styles from "./ParkView.module.scss";

export type ParkViewProps = {
  handleListItemChange: ({ designation, state }: { designation?: string | null; state?: string | null}) => void;
  isLoading?: boolean;
  parks: Park[];
  selectedParks?: string[];
  selectedDropdownItem?: ParkDesignationType;
  selectedState?: string;
  handleOnSubmit: () => void;
};

const ParkView = ({
  isLoading = false,
  parks,
  selectedDropdownItem,
  selectedState,
  handleListItemChange,
  handleOnSubmit,
}: ParkViewProps) => {
  const { watch, setValue } = useFormContext();

  const formData = watch("parkData");
  const formatListItem = (item: string) =>
    `${startCase(item)}s (${getParkTotal(item as ParkDesignation)})`;
  const allDesignations = Object.values(formData).flat(1);
  const dropdownItem = startCase(selectedDropdownItem);
  const headerTitle = selectedDropdownItem
    ? `${dropdownItem}s`
    : `${copy.allDesignationTitle}s`;
  const formatSelectedItem = (item: string) => `${startCase(item)}s`;
  const stateText = selectedState ? `(${selectedState})` : '';
  const listTitle = selectedDropdownItem ? `${dropdownItem} checklist ${stateText}` : `${copy.allDesignationTitle} checklist ${stateText}`

  const handleClick = (id: string, parkCode: string, designation: string) => {
    const formattedName = getParkDesignation(designation, parkCode);
    let designationArray = formData[formattedName].slice();
    if (designationArray.includes(id)) {
      designationArray = designationArray.filter(
        (parkId: string) => parkId !== id
      );
    } else {
      designationArray.push(id);
    }
    setValue(`parkData.${formattedName}`, designationArray, {
      shouldDirty: true,
    });
  };

  const selectedData = selectedDropdownItem
  ? formData[selectedDropdownItem]
  : allDesignations;

  const found = parks.filter(park => selectedData.includes(park.id))

  const totalProps = {
    count: found.length || 0,
    total: parks.length,
    tooltipText: copy.tooltipCopy(dropdownItem.toLowerCase()),
  };

  return (
    <PageWrapper count={allDesignations.length || 0}>
      <div className={styles.container}>
        <Header title={headerTitle} />
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div className={styles.dropdownWrapper}>
              <Total {...totalProps} styleName={styles.mobileCount} />
              <div className={styles.dropdowns}>
                <Dropdown
                  items={LIST_OPTIONS}
                  label={copy.designationLabel}
                  initialSelectedItem={selectedDropdownItem}
                  handleClick={handleListItemChange}
                  formatListItem={formatListItem}
                  formatSelectedItem={formatSelectedItem}
                  className={styles.designation}
                  keyValue="designation"
                />
                <Dropdown
                  items={STATES_LIST}
                  label={copy.stateLabel}
                  handleClick={handleListItemChange}
                  className={styles.state}
                  initialSelectedItem={selectedState}
                  keyValue="state"
                />
              </div>
              <Total
                {...totalProps}
                styleName={cn(styles.count, styles.desktopCount)}
              />
            </div>
            <Map
              parks={parks}
              selectedParks={formData}
              handleClick={handleClick}
            />
            <ParkList
              parks={parks}
              listTitle={listTitle}
              handleOnSubmit={handleOnSubmit}
            />
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default ParkView;
