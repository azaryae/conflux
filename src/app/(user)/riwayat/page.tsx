// src/pages/Riwayat.js

import React from "react";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import Footer from "../../components/frontend-pages/shared/footer";
import ScrollToTop from "../../components/frontend-pages/shared/scroll-to-top";
import { Button } from "@mui/material";
import Link from "next/link";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/dashboard",
    title: "Dashboard",
  },
];

const Riwayat = () => {
  const data = [
    {
      image: "https://via.placeholder.com/300x200",
      date: "17 November 2024",
      questions: 10,
      duration: 30,
    },
  ];

  return (
    <PageContainer title="Riwayat" description="Halaman Riwayat">
      {/* Breadcrumb */}
      <Breadcrumb title="Conflux AI" items={BCrumb} />
      {/* End Breadcrumb */}

      {/* Container untuk Card */}
      <div className="p-4">
        <Grid container spacing={6}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="h-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4">
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="Card Image"
                />
                <CardContent className="flex-grow">

                      <Typography
                        variant="h6"
                        component="div"
                        className="text-lg font-bold mb-1"
                      >
                        {item.date}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        className="text-base mb-1"
                      >
                        Jumlah Pertanyaan: {item.questions}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        className="text-base mb-1"
                      >
                        Durasi: {item.duration} menit
                      </Typography>
                 
                    {/* Tombol di sisi kanan */}
                    <Link href="/riwayat/detail">
                      <Button
                        variant="contained"
                        className="bg-purple-600 flex text-white hover:bg-purple-400 transition-colors text-sm"
                      >
                        Lihat
                      </Button>
                    </Link>
               
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Footer dan ScrollToTop */}
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default Riwayat;
