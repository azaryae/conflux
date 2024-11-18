"use client";
import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Pastikan impor yang benar
import { useSession } from "next-auth/react";

const WelcomeCard = () => {
  const router = useRouter(); // Definisikan router di sini\\
  const {data: session} = useSession();

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        py: 0,
        position: "relative",
      }}
    >
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box>
              <Box
                gap="16px"
                mb={5}
                sx={{
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="/images/profile/user-1.jpg"
                  alt="img"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="h5" whiteSpace="nowrap">
                  Selamat datang, {session?.user?.name}
                </Typography>
              </Box>

              <Stack
                mt={8}
                spacing={2}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <Typography variant="h2" whiteSpace="nowrap">
                    100{" "}
                  </Typography>
                  <Typography variant="subtitle1" whiteSpace="nowrap">
                    Total Token dimiliki
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push("/token")}
                  >
                    Lihat
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box
              sx={{
                width: "340px",
                height: "246px",
                position: "absolute",
                right: "-26px",
                bottom: "-70px",
                marginTop: "20px",
              }}
            >
              <Image
                src="/images/backgrounds/welcome-bg2.png"
                alt="img"
                width={340}
                height={250}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
