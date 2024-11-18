"use client";

import React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { Typography, Box, Paper, Grid, Table, TableBody, TableRow, TableCell, Button } from "@mui/material";
import Footer from '@/app/components/frontend-pages/shared/footer';
import ScrollToTop from '@/app/components/frontend-pages/shared/scroll-to-top';
import Link from "next/link";

const BCrumb = [
  { to: "/", title: "Home" },
  { title: "Detail Riwayat" },
];

const DetailRiwayat = () => {
  const riwayatDetail = {
    date: "19 November 2024",
    questions: 20,
    duration: 60,
    gestur: "Sering menggaruk kepala",
    ekspresi: "Sering gurup",
    score: 85,
    feedback: [
      "Jawaban menunjukkan kemampuan analisis yang baik.",
      "Gunakan kalimat lebih spesifik pada pertanyaan terkait pengalaman.",
      "Berikan contoh konkret untuk mendukung jawaban.",
    ],
    photo: "https://via.placeholder.com/100",
    banner: "https://via.placeholder.com/1200x300",
    questionAnswers: [
      { question: "Apa motivasi Anda melamar pekerjaan ini?", answer: "Saya tertarik dengan visi perusahaan." },
      { question: "Ceritakan pengalaman Anda memimpin tim.", answer: "Saya pernah memimpin tim proyek IT." },
    ],
  };

  const handleBackClick = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <PageContainer title="Detail Riwayat" description="Halaman Detail Riwayat">
      {/* Breadcrumb */}
      <Breadcrumb title="Detail Riwayat" items={BCrumb} />

      {/* Banner */}
      <Box
        sx={{
          width: "100%",
          height: "500px",
          backgroundImage: `url(${riwayatDetail.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: 4,
        }}
      />

      {/* Card Container */}
      <Box sx={{ px: 4, maxWidth: "1200px", mx: "auto" }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: "12px",
            width: "100%", // Card sesuai lebar container
          }}
        >
          {/* Header */}
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" color="primary" gutterBottom>
                Detail Riwayat Latihan Wawancara
              </Typography>
            </Grid>
          </Grid>

          {/* Informasi Dua Kolom */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">Tanggal:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{riwayatDetail.date}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">Jumlah Pertanyaan:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{riwayatDetail.questions}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold">Durasi:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{riwayatDetail.duration} menit</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">Gestur:</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">{riwayatDetail.gestur}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">Ekspresi:</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">{riwayatDetail.ekspresi}</Typography>
            </Grid>

          </Grid>

          {/* Skor dan Saran */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Skor Latihan: {riwayatDetail.score}/100
            </Typography>
            <Paper sx={{ p: 3, backgroundColor: "#f3f3f3" }}>
              <Typography variant="body1" fontWeight="bold" gutterBottom>
                Saran Perbaikan:
              </Typography>
              <ul>
                {riwayatDetail.feedback.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Paper>
          </Box>

          {/* Daftar Pertanyaan dan Jawaban */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Pertanyaan dan Jawaban
            </Typography>
            <Table sx={{ width: "100%" }}>
              <TableBody>
                {riwayatDetail.questionAnswers.map((qa, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        width: "40%",
                        textAlign: "center", // Simetris horizontal
                        verticalAlign: "middle", // Simetris vertikal
                      }}
                    >
                      {qa.question}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center", // Simetris horizontal
                        verticalAlign: "middle", // Simetris vertikal
                      }}
                    >
                      {qa.answer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          {/* Tombol Kembali */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Link href="/dashboard">
            <Button variant="contained" color="primary">
              Kembali
            </Button>
            </Link>

          </Box>
        </Paper>
      </Box>

      {/* Footer */}
      {/* <Footer /> */}
      <ScrollToTop />
    </PageContainer>
  );
};

export default DetailRiwayat;
