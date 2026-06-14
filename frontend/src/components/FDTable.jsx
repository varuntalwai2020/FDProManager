import { useEffect, useState } from "react";
import API from "../services/api";

function FDTable() {
  const [fds, setFds] = useState([]);
  const [searchBank, setSearchBank] = useState("");
  const [sortOrder, setSortOrder] = useState("earliest");
  const [loading, setLoading] = useState(true);

  const fetchFDs = async () => {
    try {
      const response = await API.get("/fd");
      setFds(response.data);
    } catch (error) {
      console.error("Error fetching FDs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFDs();
  }, []);

  const deleteFD = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FD?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/fd/${id}`);
      alert("FD Deleted Successfully");
      fetchFDs();
    } catch (error) {
      console.error(error);
      alert("Error deleting FD");
    }
  };

  if (loading) {
    return <h3>Loading FDs...</h3>;
  }

  const totalInvestment = fds.reduce(
    (sum, fd) => sum + Number(fd.principal || 0),
    0
  );
  const filteredFDs = fds
  .filter((fd) =>
    fd.bank_name
      ?.toLowerCase()
      .includes(searchBank.toLowerCase())
  )
  .sort((a, b) => {
    const dateA = new Date(a.maturity_date);
    const dateB = new Date(b.maturity_date);

    return sortOrder === "earliest"
      ? dateA - dateB
      : dateB - dateA;
  });

  const totalMaturityValue = fds.reduce(
    (sum, fd) => sum + Number(fd.maturity_value || 0),
    0
  );

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>FD Dashboard</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3>Total FDs</h3>
          <p>{fds.length}</p>
        </div>

        <div>
          <h3>Total Investment</h3>
          <p>₹{totalInvestment.toLocaleString()}</p>
        </div>

        <div>
          <h3>Total Maturity Value</h3>
          <p>₹{totalMaturityValue.toLocaleString()}</p>
        </div>
      </div>
      <div style={{ marginBottom: "15px" }}>
  <input
    type="text"
    placeholder="Search by Bank Name"
    value={searchBank}
    onChange={(e) => setSearchBank(e.target.value)}
    style={{
      padding: "8px",
      width: "300px",
      fontSize: "14px"
    }}
  />
</div>
<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    alignItems: "center"
  }}
>
  <input
    type="text"
    placeholder="Search by Bank Name"
    value={searchBank}
    onChange={(e) => setSearchBank(e.target.value)}
    style={{
      padding: "8px",
      width: "250px"
    }}
  />

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    style={{
      padding: "8px"
    }}
  >
    <option value="earliest">
      Earliest Maturity First
    </option>

    <option value="latest">
      Latest Maturity First
    </option>
  </select>
</div>
      <h2>All FDs</h2>

      {fds.length === 0 ? (
        <p>No FD records found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>Bank</th>
              <th>FD Number</th>
              <th>Customer</th>
              <th>Principal</th>
              <th>Interest %</th>
              <th>Maturity Value</th>
              <th>Maturity Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          {filteredFDs.map((fd) => (
              <tr key={fd.id}>
                <td>{fd.bank_name}</td>
                <td>{fd.fd_number}</td>
                <td>{fd.customer_name}</td>
                <td>₹{Number(fd.principal).toLocaleString()}</td>
                <td>{fd.interest_rate}%</td>
                <td>
                  ₹{Number(fd.maturity_value).toLocaleString()}
                </td>
                <td>
                  {new Date(fd.maturity_date).toLocaleDateString()}
                </td>
                <td>{fd.status}</td>

                <td>
                  <button
                    onClick={() => deleteFD(fd.id)}
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FDTable;