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
import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod";

const SocialIcons = [
  { name: "Facebook", icon: <IconBrandFacebook size="18" color="#1877F2" /> },
  { name: "Instagram", icon: <IconBrandInstagram size="18" color="#D7336D" /> },
  { name: "Github", icon: <IconBrandGithub size="18" color="#006097" /> },
  { name: "Twitter", icon: <IconBrandTwitter size="18" color="#1C9CEA" /> },
];

interface RegisterFormProps{
  email: string;
  no_hp: number;
  alamat: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jurusan: string;
  pendidikan_terakhir: string;
  tahun_lulus: number;
  pengalaman_kerja: string;
  minat: string;
  keahlian: string;
  organisasi: string;
  hobi: string;
  prestasi: string;

}

const schema = z.object({
  email: z.string().email({message: "Invalid email format"}),
  no_hp: z.string(),
  alamat: z.string(),
  jenis_kelamin: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.string(),
  jurusan: z.string(),
  pendidikan_terakhir: z.string(),
  tahun_lulus: z.string(),
  pengalaman_kerja: z.string(),
  minat: z.string(),
  keahlian: z.string(),
  organisasi: z.string(),
  hobi: z.string(),
  prestasi: z.string(),




});


const ProfilePage = () => {
  const theme = useTheme();

  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      email: "",
      no_hp: "",
      alamat: "",
      jenis_kelamin: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jurusan: "",
      pendidikan_terakhir: "",
      tahun_lulus: "",
      pengalaman_kerja: "",
      minat: "",
      keahlian: "",
      organisasi: "",
      hobi: "",
      prestasi: "",

    },
  });

  const onSubmit = async (data: RegisterFormProps) => {
    try {
      let response = await fetch('/api/profil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Data berhasil disimpan");
        setTimeout(() => {
          window.location.assign("/profil");
          reset();
        }
        , 1500);
      } else if (response.status === 400) {
        const data = await response.json(); // Tunggu parsing JSON
        const errormessage = data.error;
        toast.error(errormessage);
      } else {
        toast.error("Data gagal disimpan, silahkan coba lagi");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan, silahkan coba lagi nanti.");
    }
  };

  return (
    
    <Box>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <Grid container spacing={3}>
          {/* Kolom 1 */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {/* Card 1 */}
              <BlankCard>
                <CardContent>
                  <Stack direction="column" alignItems="center" gap={2}>
                    {/* <Avatar
                      alt="User Avatar"
                      src="/images/profile/user-avatar.jpg"
                      sx={{ width: "120px", height: "120px" }}
                    /> */}
                    <Box textAlign="center">
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Nama Lengkap
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
                      id="email"
                      type="email"
                      {...register("email")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="No HP"
                      id="no_hp"
                      type="number"
                      {...register("no_hp")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                      <TextField
                      fullWidth
                      label="Alamat"
                      id="alamat"
                      type="text"
                      {...register("alamat")}
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
                      id="jenis_kelamin"
                      type="text"
                      {...register("jenis_kelamin")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tempat Lahir"
                      id="tempat_lahir"
                      type="text"
                      {...register("tempat_lahir")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tanggal Lahir"
                      id="tanggal_lahir"
                      type="date"
                      {...register("tanggal_lahir")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Jurusan"
                      id="jurusan"
                      type="text"
                      {...register("jurusan")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Pendidikan Terakhir"
                      id="pendidikan_terakhir"
                      type="text"
                      {...register("pendidikan_terakhir")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Tahun Lulus"
                      id="tahun_lulus"
                      type="number"
                      {...register("tahun_lulus")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Pengalaman Kerja"
                      id="pengalaman_kerja"
                      type="text"
                      {...register("pengalaman_kerja")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Minat"
                      id="minat"
                      type="text"
                      {...register("minat")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Keahlian"
                      id="keahlian"
                      type="text"
                      {...register("keahlian")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Organisasi"
                      id="organisasi"
                      type="text"
                      {...register("organisasi")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Hobi"
                      id="hobi"
                      type="text"
                      {...register("hobi")}
                      InputProps={{
                        sx: { fontSize: "16px" },
                      }}
                      InputLabelProps={{ sx: { fontSize: "14px" } }}
                    />
                    <TextField
                      fullWidth
                      label="Prestasi"
                      id="prestasi"
                      type="text"
                      {...register("prestasi")}
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
    </Box>

  );
};

export default ProfilePage;
