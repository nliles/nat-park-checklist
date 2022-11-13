import startCase from "lodash/startCase";
import { Parks } from "types";
import getParkTotal from "helpers/getParkTotal";
import styles from "./index.module.scss";

const DataTable = ({
  count,
  total,
  items,
}: {
  count: number;
  total: number;
  items: Parks;
}) => {
  const headers = ["Park Category", "Visited", "Total"];
  const itemKeys = Object.keys(items);
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
              <td className={styles.td}>{startCase(item)}</td>
              <td className={styles.td}>{items[item].length || 0}</td>
              <td className={styles.td}>{getParkTotal(item)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.tfoot}>
          <tr>
            <th className={styles.th}>Total</th>
            <td className={styles.td}>
              <strong>{count}</strong>
            </td>
            <td>{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;
