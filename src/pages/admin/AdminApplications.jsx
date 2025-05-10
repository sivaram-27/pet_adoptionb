import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch('http://localhost:8080/api/adoptions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setApplications(data);
    };
    fetchApplications();
  }, [token]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>Adoption Applications</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Send</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map(app => (
              <TableRow key={app.id}>
                <TableCell>{app.petId}</TableCell>
                <TableCell>{app.firstName} {app.lastName}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.phone}</TableCell>
                <TableCell>
                  <a
                    href={`mailto:${app.email}?subject=Regarding%20Your%20Pet%20Adoption%20Application&body=Hello%20${app.firstName}%20${app.lastName},%0D%0A%0D%0AThis%20is%20a%20message%20from%20the%20admin%20(hemanthvhb@gmail.com)%20regarding%20your%20pet%20adoption%20application.%0D%0A%0D%0A`}
                    style={{ textDecoration: 'none' }}
                  >
                    <button style={{
                      background: 'linear-gradient(45deg, #FF8E53 30%, #FFC107 90%)',
                      border: 'none',
                      borderRadius: '20px',
                      color: 'white',
                      padding: '6px 16px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                      Send Email
                    </button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminApplications; 