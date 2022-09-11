import { Park } from "types";
import Checkbox from "components/ui/Checkbox";

type ListItemType = {
  park: Park;
  handleChange: (item: string) => void;
  index: number;
  selectedParks: string[];
};

const ListItem = ({
  park,
  handleChange,
  index = 0,
  selectedParks,
}: ListItemType) => {
  const { id, fullName } = park;
  const label = `${index + 1}. ${fullName}`;
  const isSelected = selectedParks.includes(id);
  return (
    <Checkbox
      checked={isSelected}
      label={label}
      handleChange={handleChange}
      id={id}
    />
  );
};

export default ListItem;
