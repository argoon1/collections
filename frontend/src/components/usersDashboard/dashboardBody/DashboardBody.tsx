import { User } from "../useUsersDashboard";
import styles from "./dashboardBody.module.css";
type DashboardBodyProps = {
  users: User[];
  isCheckedUser: (email: string) => boolean;
  checkUser: (email: string) => void;
};
const DashboardBody = ({
  users,
  isCheckedUser,
  checkUser,
}: DashboardBodyProps) => {
  return (
    <tbody className={styles.dashboardBody}>
      {users.map((user) => (
        <tr>
          {Object.values(user).map((userData, idx) => {
            return (
              <>
                {idx === 0 && (
                  <input
                    type="checkbox"
                    checked={isCheckedUser(user.email)}
                    onClick={() => checkUser(user.email)}
                  ></input>
                )}
                <td>{userData}</td>
              </>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export { DashboardBody };
