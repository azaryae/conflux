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
          <Typography variant="h5">Azarya Aditya Krisna Moeljono</Typography>
          <Box textAlign="left" mt={2}>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Umur: 20
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Jenis Kelamin: Laki-laki
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Agama: Kristen Protestan
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={1}>
              Pekerjaan: Mahasiswa
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={2}>
              Email: azaryamoeljono12@gmail.com
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
