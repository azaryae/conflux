"use client";
import { CardContent, Typography, Button } from "@mui/material";
import ParentCard from "../../shared/ParentCard";
import { Box } from "@mui/system";
import Image from "next/image";

import NotificationCode from "./code/NotificationCode";

const Banner2 = () => {
  return (
    <ParentCard title="Data Diri" codeModel={<NotificationCode />}>
      <CardContent sx={{ p: "30px" }}>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          textTransform="uppercase"
          color="textSecondary"
        >
          Data Pribadi
        </Typography>
        
        <Box textAlign="center">
          <Typography variant="h5">Pengguna</Typography>
          <Box textAlign="left" mt={2}>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Umur:
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Jenis Kelamin: 
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Agama: 
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Pekerjaan: 
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={2}>
              Email: 
            </Typography>
          </Box>

          <Button color="primary" variant="contained" size="large">
            Update Data
          </Button>
        </Box>
      </CardContent>
    </ParentCard>
  );
};

export default Banner2;
