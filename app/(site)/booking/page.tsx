"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import Head from 'next/head';

interface BookingData {
  id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
  email: string;
}

const Bookings = () => {
  const [data, setData] = useState<BookingData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [monthlyRegistrations, setMonthlyRegistrations] = useState(0);
  const [weeklyRegistrations, setWeeklyRegistrations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const apiUrl = `${process.env.NEXT_PUBLIC_BUNERT_URL}?s=${process.env.NEXT_PUBLIC_SYSTEM_TOKEN}&page=${currentPage - 1}`;
      const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();

        if (result.status === 1 && result.data) {
          setData(result.data);
          const total = result.paging.total_count;
          const now = new Date();
          const currentMonth = now.toISOString().slice(0, 7);
          const startOfWeek = new Date();
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          
          const monthlyCount = result.data.filter(entry => 
            entry.created_at.startsWith(currentMonth)).length;
          
          const weeklyCount = result.data.filter(entry => 
            new Date(entry.created_at) >= startOfWeek).length;
          
          setTotalRegistrations(total);
          setMonthlyRegistrations(monthlyCount);
          setWeeklyRegistrations(weeklyCount);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentRows = data.slice(0, rowsPerPage);

  return (
    <>
      <Head>
        <meta name="description" content="Manage and view customer bookings." />
        <meta name="author" content="Your Company" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bookings</title>
      </Head>
      <Box sx={{ padding: 2 , marginTop: "5%"}}>
        <div className="mx-auto max-w-7xl px-6 mt-10">
          <h3 className="text-2xl font-semibold mb-4" style={{ color: 'black' }}>
            Registrierte Kunden
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[ 
              { label: 'Total Registrations', value: totalRegistrations },
              { label: 'This Month', value: monthlyRegistrations },
              { label: 'This Week', value: weeklyRegistrations }
            ].map((item, index) => (
              <Card key={index} sx={{ textAlign: 'center', padding: 2, minWidth: 120, boxShadow: 3, borderRadius: 2, background: '#f9fafb' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>{item.label}</Typography>
                  {loading ? <Typography>Loading...</Typography> : <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#29c3ec' }}>{item.value}</Typography>}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Customer Name</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Birthday</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                  </tr>
                </thead>
                <tbody className="max-h-60 overflow-y-auto">
                  {currentRows.map((row, index) => (
                    <tr key={row.id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-4 py-2">{`${row.first_name} ${row.last_name}`}</td>
                      <td className="px-4 py-2">{row.birthday}</td>
                      <td className="px-4 py-2">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default Bookings;
