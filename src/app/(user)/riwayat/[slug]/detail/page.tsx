// src/pages/DetailRiwayat.js

import React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { Typography, Box, Paper, Grid, Button } from "@mui/material";
import Footer from '@/app/components/frontend-pages/shared/footer';
import ScrollToTop from '@/app/components/frontend-pages/shared/scroll-to-top';


const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/riwayat",
    title: "Riwayat",
  },
  {
    title: "Detail Riwayat",
  },
];

const DetailRiwayat = () => {
  const riwayatDetail = {
    date: "19 November 2024",
    questions: 20,
    duration: 60,
    score: 85,
    feedback: [
      "Jawaban menunjukkan kemampuan analisis yang baik.",
      "Gunakan kalimat lebih spesifik pada pertanyaan terkait pengalaman.",
      "Berikan contoh konkret untuk mendukung jawaban.",
    ],
  };

  return (
    <PageContainer title="Detail Riwayat" description="Halaman Detail Riwayat">
      {/* Breadcrumb */}
      <Breadcrumb title="Detail Riwayat" items={BCrumb} />
      {/* End Breadcrumb */}

      {/* Container */}
      <Box className="p-6">
        <Paper elevation={3} className="p-6 shadow-lg">
          <Typography
            variant="h4"
            className="font-bold text-purple-600 text-center mb-6"
          >
            Detail Riwayat Latihan Wawancara
          </Typography>

          <Grid container spacing={6}>
            {/* Informasi Dasar */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className="font-bold mb-2">
                Tanggal:
              </Typography>
              <Typography className="text-lg mb-4">{riwayatDetail.date}</Typography>

              <Typography variant="h6" className="font-bold mb-2">
                Jumlah Pertanyaan:
              </Typography>
              <Typography className="text-lg mb-4">{riwayatDetail.questions}</Typography>

              <Typography variant="h6" className="font-bold mb-2">
                Durasi:
              </Typography>
              <Typography className="text-lg">{riwayatDetail.duration} menit</Typography>
            </Grid>

            {/* Skor dan Feedback */}
            <Grid item xs={12} md={6}>
              <Box className="bg-purple-50 p-4 rounded-lg shadow-inner">
                <Typography
                  variant="h6"
                  className="font-bold text-center text-purple-800 mb-4"
                >
                  Skor Latihan: <span className="text-3xl">{riwayatDetail.score}</span>/100
                </Typography>
                <Typography variant="body1" className="mb-2">
                  Saran Perbaikan:
                </Typography>
                <ul className="list-disc pl-5 space-y-2">
                  {riwayatDetail.feedback.map((item, index) => (
                    <li key={index} className="text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </Box>
            </Grid>
          </Grid>

          {/* CTA */}
          <Box className="mt-8 flex justify-center">
            <Button
              variant="contained"
              className="bg-purple-600 text-white hover:bg-purple-400 px-6 py-3 transition-colors text-lg"
              href="/riwayat"
            >
              Kembali ke Riwayat
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Footer dan ScrollToTop */}
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default DetailRiwayat;
