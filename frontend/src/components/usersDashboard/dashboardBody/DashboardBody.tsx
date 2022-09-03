import { User } from "../useUsersDashboard";
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
    <tbody>
      {users.map((user) => (
        <tr>
          {Object.values(user).map((userData, idx) => {
            console.log(userData, "USER DATAS");
            return (
              <>
                {idx === 0 && (
                  <input
                    type="checkbox"
                    checked={isCheckedUser(user.email)}
                    onClick={() => checkUser(user.email)}
                  ></input>
                )}
                <td>{"a"}</td>
              </>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export { DashboardBody };
