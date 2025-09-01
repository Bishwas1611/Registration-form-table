import { useState } from "react";
// import { useEffect } from "react";
import "./Table.module.css";
export default function Table({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ textAlign: "center" }}>No records available.</p>;
  }
  const [record, setRecord] = useState(data);
  const [filter, setFilter] = useState("All");
  let filteredData =
    filter === "All"
      ? data
      : data.filter((user) => user.department === filter);
  const [sortOrder, setSortOrder] = useState(null); // null, "asc", "desc"
  if (sortOrder === "asc") {
    filteredData = [...filteredData].sort((a, b) => a.salary - b.salary);
  } else if (sortOrder === "desc") {
    filteredData = [...filteredData].sort((a, b) => b.salary - a.salary);
  }

  const handleDelete = (index) => {
    const updated = record.filter((_, i) => i != index);
    setRecord(updated);
  };
  // const handleDelete = (index) => {
  //   const updated = records.filter((_, i) => i !== index);
  //   setRecords(updated);
  // };
  const departments = [
    "All",
    ...new Set(record.map((user) => user.department)),
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // filter left, buttons right
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        {/* Filter Section (Left) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label htmlFor="dept">Filter by department:</label>
          <select
            value={filter}
            name="dept"
            id="dept"
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "4px 6px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
              outline: "none",
              backgroundColor: "#f9fafb",
              color: "#374151",
              minWidth: "120px",
              height: "32px",
              lineHeight: "20px",
            }}
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons Section (Right) */}
        <div>
          <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
  Sort Salary {sortOrder === "asc" ? "⬆️" : "⬇️"}
</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Marital Status</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.department}</td>
              <td>{user.salary}</td>
              <td>{user.marital ? "yes" : "no"}</td>
              <td>
                {user.photo && (
                  <img
                    src={
                      URL.createObjectURL(user.photo) // if it's a File object
                    }
                    alt={`user${index}`}
                    width="50"
                    height="50"
                    style={{ borderRadius: "6px" }}
                  />
                )}
              </td>
              <td>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#ef4444", // red
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
