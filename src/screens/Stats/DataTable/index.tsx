import { LIST_OPTIONS, PARK_INFO } from "../../../constants";
import { removeDashes } from "helpers";
import styles from "./index.module.scss";

const getTotal = (park: string) => {
  return [...Object.values(PARK_INFO[park])].reduce(
    (acc, element) => acc + element.length,
    0
  );
};

const DataTable = ({ count }: { count: number }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.row}>
            <th className={styles.th}>Park Category</th>
            <th className={styles.th}>Visited</th>
            <th className={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {LIST_OPTIONS.map((option) => (
            <tr key={option} className={styles.tr}>
              <td className={styles.td}>{removeDashes(option)}</td>
              <td className={styles.td}>0</td>
              <td className={styles.td}>{getTotal(option)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.tfoot}>
          <tr>
            <th className={styles.th}>Total</th>
            <td></td>
            <td className={styles.td}>
              <strong>{count}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;
