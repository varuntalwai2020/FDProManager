import FDForm from "../components/FDForm";
import FDTable from "../components/FDTable";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>FD Management System</h1>

      <FDForm />

      <hr />

      <FDTable />
    </div>
  );
}

export default Dashboard;