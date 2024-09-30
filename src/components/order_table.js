import React from 'react';

const OrderTable = ({ orders, selectedOrders, handleOrderCheckboxChange }) => {

    const handleRowClick = (order, event) => {
        if (event.target.type !== 'checkbox') {
            handleOrderCheckboxChange(order);
        }
    };

    return (
        <div className="table-container">
            <table border="1" className="table-style">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Order Id</th>
                        <th>Product</th>
                        <th>Customer Name</th>
                        <th>Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} onClick={(e) => handleRowClick(order, e)} style={{ cursor: 'pointer' }}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedOrders.some(selectedOrder => selectedOrder._id === order._id)}
                                    onChange={() => handleOrderCheckboxChange(order)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </td>
                            <td>{order.orderId}</td>
                            <td>{order.product}</td>
                            <td>{order.customerName}</td>
                            <td>{order.date}</td>
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
                       /* Responsive adjustments */
                @media (max-width: 768px) {
                    .table-style, .table-style thead, .table-style tbody, .table-style th, .table-style td, .table-style tr {
                        display: block;
                    }

                    .table-style thead tr {
                        display: none; /* Hide header on small screens */
                    }

                    .table-style tr {
                        margin-bottom: 10px;
                        border-bottom: 2px solid #ddd;
                    }

                    .table-style td {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px;
                        text-align: right;
                        border: none;
                        position: relative;
                    }

                    .table-style td::before {
                        content: attr(data-label);
                        position: absolute;
                        left: 10px;
                        width: calc(50% - 20px); 
                        font-weight: bold;
                        white-space: nowrap;
                    }

                    .table-style td[data-label="Price"] {
                        text-align: right;
                    }
                }
            `}</style>
        </div>
    );
};

export default OrderTable;