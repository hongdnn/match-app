import React from 'react';

const OrderTable = ({ orders, selectedOrders, handleOrderCheckboxChange }) => {
    return (
        <div className="table-container">
            <table border="1" className="table-style">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Customer Name</th>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.some(selectedOrder => selectedOrder._id === order._id)}
                                    onChange={() => handleOrderCheckboxChange(order)}
                                />
                            </td>
                            <td>{order.customerName}</td>
                            <td>{order.orderId}</td>
                            <td>{order.date}</td>
                            <td>{order.product}</td>
                            <td>${order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                .table-container {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }
        
                .table-style {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: #f0f8ff; /* Light blue background */
                }
        
                .table-style th {
                    background-color: #4682b4; /* Light blue header */
                    color: white;
                    padding: 5px;
                    text-align: left;
                }
        
                .table-style td {
                    padding: 12px;
                    border: 1px solid #ccc;
                }
        
                .table-style tr:hover {
                     background-color: #d0eaff; /* Darker light blue on hover */
                }
        
                .table-style input[type="checkbox"] {
                     cursor: pointer; /* Pointer cursor for checkbox */
                }
            `}</style>
        </div>
    );
};

export default OrderTable;