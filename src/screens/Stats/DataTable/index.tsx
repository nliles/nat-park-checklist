import startCase from "lodash/startCase";
import { SelectedParks } from "types";
import ParkDesignation from "enum/ParkDesignation";
import { ParkData } from "types/park";
import styles from "./DataTable.module.scss";
import copy from "./copy";

type DataTableProps = {
  selected: SelectedParks;
  parks?: ParkData;
  total: number;
};

const DataTable = ({ selected, parks, total }: DataTableProps) => {
  const headers = [copy.category, copy.visited, copy.total];
  const itemKeys = Object.keys(selected) as ParkDesignation[];
  const totalParks = Object.values(selected).flat(1);
  console.log(parks);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.row}>
            {headers.map((header) => (
              <th className={styles.th} key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {itemKeys?.map((item) => (
            <tr key={item} className={styles.tr}>
              <td className={styles.td}>{`${startCase(item)}s`}</td>
              <td className={styles.td}>{selected[item].length}</td>
              <td className={styles.td}>{parks?.[item]?.length || 0}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.tfoot}>
          <tr>
            <th className={styles.th}>Total</th>
            <td className={styles.td}>
              <strong>{totalParks.length}</strong>
            </td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;
