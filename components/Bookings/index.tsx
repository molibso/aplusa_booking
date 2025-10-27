"use client"; // Make sure this is at the top to declare the component as client-side

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const Booking = () => {
  // Sample data for demonstration
  const rows = [
    { id: 1, name: 'John Doe', date: '2024-11-10', status: 'Confirmed', total: '$150.00' },
    { id: 2, name: 'Jane Smith', date: '2024-11-11', status: 'Pending', total: '$100.00' },
    { id: 3, name: 'Sam Wilson', date: '2024-11-12', status: 'Cancelled', total: '$200.00' },
    { id: 4, name: 'Anna Lee', date: '2024-11-13', status: 'Confirmed', total: '$180.00' },
    { id: 5, name: 'David Brown', date: '2024-11-14', status: 'Pending', total: '$120.00' },
    { id: 6, name: 'Linda Green', date: '2024-11-15', status: 'Confirmed', total: '$250.00' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Slice rows for pagination
  const currentRows = rows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(rows.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bookings
      </Typography>
      
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Customer Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Booking Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outlined"
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="body2">
          Page {currentPage} of {Math.ceil(rows.length / rowsPerPage)}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handlePageChange('next')}
          disabled={currentPage === Math.ceil(rows.length / rowsPerPage)}
        >
          Next
        </Button>
      </div>
    </Box>
  );
};

export default Booking;
