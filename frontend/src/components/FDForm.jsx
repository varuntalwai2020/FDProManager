import { useState } from "react";
import API from "../services/api";

function FDForm() {
  const [formData, setFormData] = useState({
    bank_name: "",
    fd_number: "",
    customer_name: "",
    email: "",
    mobile: "",
    principal: "",
    interest_rate: "",
    start_date: "",
    maturity_date: "",
    maturity_value: "",
    nominee: "",
    branch: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const calculateMaturityValue = () => {
    const principal = Number(formData.principal);
    const rate = Number(formData.interest_rate);
  
    if (
      !principal ||
      !rate ||
      !formData.start_date ||
      !formData.maturity_date
    ) {
      return 0;
    }
  
    const start = new Date(formData.start_date);
    const maturity = new Date(formData.maturity_date);
  
    const years =
      (maturity - start) / (1000 * 60 * 60 * 24 * 365);
  
    const maturityValue =
      principal + (principal * rate * years) / 100;
  
    return maturityValue.toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const maturityValue = calculateMaturityValue();
  
    try {
      await API.post("/fd", {
        ...formData,
        maturity_value: maturityValue
      });
  
      alert("FD Added Successfully");
  
      setFormData({
        bank_name: "",
        fd_number: "",
        customer_name: "",
        email: "",
        mobile: "",
        principal: "",
        interest_rate: "",
        start_date: "",
        maturity_date: "",
        maturity_value: "",
        nominee: "",
        branch: ""
      });
  
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
  
      alert("Error Saving FD");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New FD</h2>

      <input name="bank_name" placeholder="Bank Name" onChange={handleChange} value={formData.bank_name} />
      <br /><br />

      <input name="fd_number" placeholder="FD Number" onChange={handleChange} value={formData.fd_number} />
      <br /><br />

      <input name="customer_name" placeholder="Customer Name" onChange={handleChange} value={formData.customer_name} />
      <br /><br />

      <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
      <br /><br />

      <input name="mobile" placeholder="Mobile" onChange={handleChange} value={formData.mobile} />
      <br /><br />

      <input name="principal" placeholder="Principal Amount" onChange={handleChange} value={formData.principal} />
      <br /><br />

      <input name="interest_rate" placeholder="Interest Rate" onChange={handleChange} value={formData.interest_rate} />
      <br /><br />

      <input type="date" name="start_date" onChange={handleChange} value={formData.start_date} />
      <br /><br />

      <input type="date" name="maturity_date" onChange={handleChange} value={formData.maturity_date} />
      <br /><br />
      <div style={{ marginTop: "10px" }}>
  <strong>
    Calculated Maturity Value:
    ₹ {calculateMaturityValue()}
  </strong>
</div>
      <input name="nominee" placeholder="Nominee" onChange={handleChange} value={formData.nominee} />
      <br /><br />

      <input name="branch" placeholder="Branch" onChange={handleChange} value={formData.branch} />
      <br /><br />

      <button type="submit">
        Save FD
      </button>
    </form>
  );
}
export default FDForm;