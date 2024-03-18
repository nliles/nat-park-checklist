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
import startCase from "lodash/startCase";
import { LIST_OPTIONS } from "../../../constants";
import getParkTotal from "helpers/getParkTotal";
import copy from "./copy";
import styles from "./index.module.scss";

export type ParkViewProps = {
  handleListItemChange: (item: string) => void;
  isLoading?: boolean;
  parks: Park[];
  selectedParks?: string[];
  selectedDropdownItem: ParkDesignationType;
  handleOnSubmit: () => void;
};

const ParkView = ({
  isLoading = false,
  parks,
  selectedDropdownItem,
  handleListItemChange,
  handleOnSubmit,
}: ParkViewProps) => {
  const { watch, setValue } = useFormContext();

  const formData = watch().parkData || {};

  const formatListItem = (item: string) => {
    if (item === ParkDesignation.ALL_DESIGNATIONS) return copy.selectAll;
    return `${startCase(item)}s (${getParkTotal(item as ParkDesignation)})`;
  };

  const dropdownItem = startCase(selectedDropdownItem);
  const formatSelectedItem = (item: string) => `${startCase(item)}s`;

  const handleClick = (id: string, designation: string) => {
    let newData: any = structuredClone(formData);
    const designationArray = newData[selectedDropdownItem];
    if (designationArray.includes(id)) {
      designationArray.filter((parkId: string) => parkId !== id);
    } else {
      designationArray.push(id);
    }
    setValue("parkData", newData, { shouldDirty: true });
  };

  const totalProps = {
    count: formData[selectedDropdownItem].length,
    total: parks.length,
    tooltipText: copy.tooltipCopy(dropdownItem.toLowerCase()),
  };

  const allDesignationTotal = Object.values(formData).flat(1).length

  return (
    <PageWrapper count={allDesignationTotal}>
      <div className={styles.container}>
        <Header title={`${dropdownItem}s`} />
          {isLoading && <Spinner />}
          {!isLoading && (
          <>
            <div className={styles.dropdownWrapper}>
            <Total
              {...totalProps}
              styleName={styles.mobileCount}
            />
            <Dropdown
              items={LIST_OPTIONS}
              initialSelectedItem={selectedDropdownItem}
              handleClick={handleListItemChange}
              formatListItem={formatListItem}
              formatSelectedItem={formatSelectedItem}
            />
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
            selectedDropdownItem={selectedDropdownItem}
            handleOnSubmit={handleOnSubmit}
          />
        </>
        )}
      </div>
    </PageWrapper>
  );
};

export default ParkView;