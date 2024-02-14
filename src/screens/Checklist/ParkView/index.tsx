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
  count: number;
  handleListItemChange: (item: string) => void;
  loading?: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks?: string[];
  selectedDropdownItem: ParkDesignationType;
  handleOnSubmit: (values: string[]) => void;
};

const ParkView = ({
  count,
  loading = false,
  parks,
  initialValues,
  selectedDropdownItem,
  handleListItemChange,
  handleOnSubmit,
}: ParkViewProps) => {
  const { watch, setValue } = useFormContext();

  const formData = watch().parkData || [];

  const formatListItem = (item: string) => {
    return `${startCase(item)}s (${getParkTotal(item as ParkDesignation)})`;
  };

  const dropdownItem = startCase(selectedDropdownItem);
  const formatSelectedItem = (item: string) => `${startCase(item)}s`;

  const handleClick = (id: string) => {
    let newData = [...formData];
    if (formData.includes(id)) {
      newData = formData.filter((parkId: string) => parkId !== id);
    } else {
      newData.push(id);
    }
    setValue("parkData", newData, { shouldDirty: true });
  };

  const totalProps = {
    count: formData.length,
    total: parks.length,
    tooltipText: copy.tooltipCopy(dropdownItem.toLowerCase()),
  };

  return (
    <PageWrapper count={count}>
      <div className={styles.container}>
        <Header title={`${dropdownItem}s`} />
          {loading && <Spinner />}
          {!loading && (
          <>
            <div className={styles.dropdownWrapper}>
            <Total
              {...totalProps}
              styleName={styles.mobileCount}
            />
            <Dropdown
              list={LIST_OPTIONS}
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
            handleOnClick={handleClick}
          />
          <ParkList
            parks={parks}
            selectedDropdownItem={dropdownItem}
            initialParkValues={initialValues}
            handleOnSubmit={handleOnSubmit}
          />
        </>
          )}
      </div>
    </PageWrapper>
  );
};

export default ParkView;