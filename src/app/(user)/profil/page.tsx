"use client";
import React, { useState } from "react";
import {
  CardContent,
  Typography,
  Grid,
  Avatar,
  Divider,
  Stack,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandGithub,
  IconBrandTwitter,
} from "@tabler/icons-react";
import BlankCard from "./shared/BlankCard";
import ParentCard from "./shared/ParentCard";

const SocialIcons = [
  { name: "Facebook", icon: <IconBrandFacebook size="18" color="#1877F2" /> },
  { name: "Instagram", icon: <IconBrandInstagram size="18" color="#D7336D" /> },
  { name: "Github", icon: <IconBrandGithub size="18" color="#006097" /> },
  { name: "Twitter", icon: <IconBrandTwitter size="18" color="#1C9CEA" /> },
];

const ProfilePage = () => {
  const theme = useTheme();

  // State untuk data statis
  // const [profileData, setProfileData] = useState({
  //   name: "Nama Lengkap Pengguna",
  //   email: "user.email@example.com",
  //   phone: "+123 456 7890",
  //   alamat: "Alamat Lengkap",
  //   otherInfo: {
  //     Jenis Kelamin: "Laki-laki",
  //     Tempat Lahir: "Tempat Lahir",
  //     Tanggal Lahir: "01-01-2000",
  //     Jurusan: "S1 Teknik Informatika",
  //     pendidikan terakhir: "S1",
  //     Tahun Lulus: "2020",
  //     Pengaaman Kerja
  //     Minat: "Teknologi, Musik",
  //     Keahlian: "Programming, Design",
  //     Organisasi: "Himpunan Mahasiswa Teknik Informatika",
  //     Hobi: "berenang",
  //     Prestasi: "Juara 1 Lomba Desain 2020",
  //   },
  // });

  // Fungsi untuk menangani perubahan data
  const handleChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOtherInfoChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      otherInfo: {
        ...prev.otherInfo,
        [field]: value,
      },
    }));
  };

  return (
    <ParentCard title="Halaman Profil Pengguna">
      <form>
        <Grid container spacing={3}>
          {/* Kolom 1 */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Card 1 */}
              <BlankCard>
                <CardContent>
                  <Stack direction="column" alignItems="center" gap={2}>
                    <Avatar
                      alt="User Avatar"
                      src="/images/profile/user-avatar.jpg"
                      sx={{ width: "120px", height: "120px" }}
                    />
                    <Box textAlign="center">
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {'profileData.name'}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Deskripsi Singkat
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box
                  p={2}
                  textAlign="center"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.05)" : "grey.100",
                  }}
                >
                  {SocialIcons.map((sicon) => (
                    <IconButton key={sicon.name}>{sicon.icon}</IconButton>
                  ))}
                </Box>
              </BlankCard>

              {/* Card 2 */}
              <BlankCard>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Informasi Kontak
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={'profileData.email'}
                      onChange={(e) => handleChange("email", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="No HP"
                      value={'profileData.phone'}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                                        <TextField
                      fullWidth
                      label="Alamat"
                      value={"amban"}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                  </Stack>
                </CardContent>
              </BlankCard>
            </Stack>
          </Grid>

          {/* Kolom 2 */}
          <Grid item xs={12} md={6}>
          <BlankCard>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Informasi Tambahan
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Jenis Kelamin"
                      value={'profileData.email'}
                      onChange={(e) => handleChange("email", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tempat Lahir"
                      value={'profileData.phone'}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tanggal Lahir"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Jurusan"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Pendidikan Terakhir"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tahun Lulus"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Pengalaman Kerja"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Minat"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Keahlian"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Organisasi"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Hobi"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Prestasi"
                      value={'profileData.alamat'}
                      onChange={(e) => handleChange("name", e.target.value)}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                  </Stack>
                </CardContent>
              </BlankCard>
          </Grid>
        </Grid>

        {/* Tombol Simpan */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" type="submit" sx={{ fontSize: "16px" }}>
            Simpan
          </Button>
        </Box>
      </form>
    </ParentCard>
  );
};

export default ProfilePage;
