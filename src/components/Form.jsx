import { useRef } from "react";
import Table from "./Table";
import "./Form.module.css";
import { useState } from "react";
export default function Form() {
  const fileInputRef = useRef(null);
  const initialVal = {
    name: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    marital: false,
    photo: null,
  };
  const [form, setForm] = useState([]);
  const [formData, setFormdata] = useState(initialVal);
  const { name, age, address, department, salary, marital, photo } = formData;
  const handleForm = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.age ||
      !formData.department ||
      !formData.salary ||
      !formData.photo
    ) {
      alert("Please fill in all required fields!");
      return; // stops execution (doesn't add empty row)
    }
    console.log("form submitted successfully");
    console.log(formData);
    setForm((prev) => [...prev, formData]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFormdata(initialVal);
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      return setFormdata((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    }
    if (e.target.type === "file") {
      return setFormdata((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    }

    return setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <form action="" onSubmit={handleForm}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
        />

        <br />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="department">Department:</label>
        <select
          name="department"
          id="department"
          value={department}
          onChange={handleChange}
        >
          <option value="">---Select Department---</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
        </select>
        <br />

        <label htmlFor="salary">Salary(in rupees)</label>
        <input
          type="number"
          id="salary"
          name="salary"
          onChange={handleChange}
        />

        <br />
        <label htmlFor="marital">Married:</label>
        <input
          type="checkbox"
          name="marital"
          id="marital"
          checked={marital}
          onChange={handleChange}
        />

        <br />
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          onClick={(e) => {
            e.target.value = null; // <-- clears input before user chooses
          }}
          onChange={handleChange}
        />

        {photo && (
          <div>
            <img
              src={URL.createObjectURL(photo)}
              alt="preview"
              width="100px"
              height="100px"
              ref={fileInputRef}
            />
          </div>
        )}
        <br />

        <input type="submit" value={"Register"} />
      </form>
      <Table data={form}></Table>
    </>
  );
}
