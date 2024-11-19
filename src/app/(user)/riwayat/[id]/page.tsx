"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Alert,
} from "@mui/material";

interface Wawancara {
  id: number;
  pertanyaan: string;
  jawaban: string;
  saran: string;
}

interface DataWawancara {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  wawancara: Wawancara[];
}

export default function RiwayatPage({ params }: { params: { id: string } }) {
  const id = Number(params.id); // Convert to number if required

  const [dataWawancara, setDataWawancara] = useState<DataWawancara | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Wait until `id` is available from the router
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/wawancara/riwayat/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDataWawancara(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!id) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>Loading route information...</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!dataWawancara) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>No data found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Data Wawancara
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Wawancara ID: {dataWawancara.id}</Typography>
          <Typography>User ID: {dataWawancara.user_id}</Typography>
          <Typography>
            Created At:{" "}
            {new Date(dataWawancara.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Typography>
        </CardContent>
      </Card>
      <Box>
        <Typography variant="h5" gutterBottom>
          Hasil wawancara dan saran
        </Typography>
        <Grid container spacing={2}>
          {dataWawancara.wawancara.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    <strong>Pertanyaan:</strong> {item.pertanyaan}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Jawaban:</strong> {item.jawaban}
                  </Typography>
                  {item.saran && (
                    <Typography variant="body1" color="text.secondary">
                      <strong>Saran:</strong> {item.saran}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

