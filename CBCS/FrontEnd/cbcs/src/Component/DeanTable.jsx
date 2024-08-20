import React, { useEffect, useState } from 'react'; 
import { UseDeanAuthContext } from "../Hooks/UseDeanAuthContext"

const DeanTable = ({ Dept }) => {
    const { DEAN } = UseDeanAuthContext();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:4000/cbcs/Dean/getstudinfo`, {
                    method: 'POST',
                    body: JSON.stringify({ Dept }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${DEAN.token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchData();
    }, [Dept, DEAN.token]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="student-container">
            {data.length === 0 ? (
                <div>No student information available.</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Batch</th>
                            <th>Dept</th>
                            <th>RegNo</th>
                            <th>CAE_1</th>
                            <th>CAE_2</th>
                            <th>SEM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value, index) => (
                            <tr key={index}>
                                <td>{value.Name}</td>
                                <td>{value.Email}</td>
                                <td>{value.Batch}</td>
                                <td>{value.Dept}</td>
                                <td>{value.RegNo}</td>
                                <td >{value.CAE1 ? value.CAE1 : "N/A"}</td>
                                <td >{value.CAE2 ? value.CAE2 : "N/A"}</td>
                                <td>{value.SEM ? value.SEM : "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DeanTable;
