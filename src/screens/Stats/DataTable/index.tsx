import { LIST_OPTIONS } from "../../../constants";
import startCase from "lodash/startCase";
import getTotal from "helpers/getTotal";
import { Parks } from "types";
import styles from "./index.module.scss";

const DataTable = ({ count, selected }: { count: number; selected: Parks }) => {
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
              <td className={styles.td}>{startCase(option)}</td>
              <td className={styles.td}>{selected[option]?.length || 0}</td>
              <td className={styles.td}>{getTotal(option)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.tfoot}>
          <tr>
            <th className={styles.th}>Total</th>
            <td className={styles.td}>
              <strong>{count}</strong>
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;
