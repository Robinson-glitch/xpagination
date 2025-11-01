import React, { useEffect, useState,useMemo } from 'react';
import './App.css';


const API_URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
const rowsPerPage = 10;

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => setEmployees(data))
      .catch((error) => {
        alert('failed to fetch data');
        console.error(error);
      });
  }, []);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = employees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="App">
      <h1>Employee Data</h1>
      <div className="pagination">
        <button onClick={goToPreviousPage}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={goToNextPage}>
          Next
        </button>
      </div>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}

export default App;
