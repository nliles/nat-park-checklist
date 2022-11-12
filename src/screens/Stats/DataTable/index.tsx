import { LIST_OPTIONS, TOTAL_UNITS, PARK_INFO } from "../../../constants";
import startCase from "lodash/startCase";
import { Parks } from "types";
import styles from "./index.module.scss";

const getTotalUnits = (park: string) => {
  const parkCount = Object.values(PARK_INFO[park]);
  const arr = Array.prototype.concat.apply([], parkCount);
  return arr.length;
};

const DataTable = ({ count, selected }: { count: number; selected: Parks }) => {
  const headers = ['Park Category', 'Visited', 'Total']
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.row}>
            {headers.map(header => (
              <th className={styles.th}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {LIST_OPTIONS.map((option) => (
            <tr key={option} className={styles.tr}>
              <td className={styles.td}>{startCase(option)}</td>
              <td className={styles.td}>{selected[option]?.length || 0}</td>
              <td className={styles.td}>{getTotalUnits(option)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.tfoot}>
          <tr>
            <th className={styles.th}>Total</th>
            <td className={styles.td}>
              <strong>{count}</strong>
            </td>
            <td>{TOTAL_UNITS}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;
