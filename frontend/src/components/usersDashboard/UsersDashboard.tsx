import Table from "react-bootstrap/Table";
import { DashboardBody } from "./dashboardBody/DashboardBody";
import { DashboardHeader } from "./dashboardHeader/DashboardHeader";
import { useUsersDashboard } from "./useUsersDashboard";
import { Container } from "react-bootstrap";
const UsersDashboard = () => {
  const { users, checkUser, isCheckedUser, selectAllUsers, toolbarAction } =
    useUsersDashboard();

  return users ? (
    <Container className="mx-auto mt-5 " fluid="sm">
      <Table striped bordered hover className="w-75">
        <DashboardHeader
          toolbarAction={toolbarAction}
          users={users}
          selectAllUsers={selectAllUsers}
        />
        <DashboardBody
          checkUser={checkUser}
          isCheckedUser={isCheckedUser}
          users={users}
        />
      </Table>
    </Container>
  ) : (
    <>
      <div> loading</div>
    </>
  );
};

export { UsersDashboard };
