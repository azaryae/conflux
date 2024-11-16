"use client";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import Image from "next/image";
import ParentCard from "../../shared/ParentCard";
import Transection from "./code/TransectionCode";
import { useRouter } from "next/navigation";

const Banner1 = () => {
  const router = useRouter(); 

  return (
    <ParentCard title="History" codeModel={<Transection />}>
      <Card
        elevation={0}
        sx={{
          backgroundColor: (theme) => theme.palette.secondary.light,
          py: 0,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <CardContent sx={{ p: "30px" }}>
          <Grid container spacing={3} justifyContent="space-between">
            <Grid item sm={6} display="flex" alignItems="center">
              <Box
                sx={{
                  textAlign: {
                    xs: "center",
                    sm: "left",
                  },
                }}
              >
                <Typography variant="h5">
                  Riwayat Latihan Wawancara
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" my={2}>
                  Lihat riwayat keseluruhan latihan wawancara anda disini!
                </Typography>
                <Button variant="contained" color="secondary"
                onClick={() => router.push("/riwayat")}>
                  Lihat
                </Button>
              </Box>
            </Grid>
            <Grid item sm={4}>
              <Box mb="-150px">
                <Image
                  src={"/images/backgrounds/track-bg.png"}
                  alt={"trackBg"}
                  height={195}
                  width={168}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ParentCard>
  );
};

export default Banner1;
