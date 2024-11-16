'use client';
import {
  Grid,
  Button,
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import React from 'react';
import CustomFormLabel from './theme-elements/CustomFormLabel';
import CustomTextField from './theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useRouter } from "next/navigation"; 

const FormSeparator = () => {
  const router = useRouter();
  return (
    <div>
      <Typography variant="h6" mb={3}>
        Form Latihan Wawancara
      </Typography>
      <Grid container spacing={3}>
        {/* Informasi Dasar */}
        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="fs-instansi">Nama Instansi</CustomFormLabel>
          <CustomTextField id="fs-instansi" placeholder="Nama instansi yang dituju" fullWidth />

          <CustomFormLabel htmlFor="fs-values">Nilai-Nilai Perusahaan</CustomFormLabel>
          <CustomTextField
            id="fs-values"
            placeholder="Contoh: Inovasi, Kolaborasi, Integritas"
            multiline
            rows={2}
            fullWidth
          />

          <CustomFormLabel htmlFor="fs-deskripsi-instansi">Deskripsi Instansi</CustomFormLabel>
          <CustomTextField
            id="fs-deskripsi-instansi"
            placeholder="Deskripsi singkat tentang instansi"
            multiline
            rows={4}
            fullWidth
          />


        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="fs-posisi">Posisi yang Dilamar</CustomFormLabel>
          <CustomTextField id="fs-posisi" placeholder="Posisi yang dilamar" fullWidth />

          <CustomFormLabel htmlFor="fs-culture">Budaya Kerja Perusahaan</CustomFormLabel>
          <CustomTextField
            id="fs-culture"
            placeholder="Contoh: Kerja Tim, Fleksibilitas, Target-Oriented"
            multiline
            rows={2}
            fullWidth
          />

          <CustomFormLabel htmlFor="fs-deskripsi-posisi">Deskripsi Posisi</CustomFormLabel>
          <CustomTextField
            id="fs-deskripsi-posisi"
            placeholder="Deskripsi singkat tentang posisi"
            multiline
            rows={4}
            fullWidth
          />


        </Grid>

        {/* Informasi Tambahan */}
        <Grid item xs={12}>
          <Divider sx={{ mx: '-24px' }} />
          <Typography variant="h6" mt={2}>
            Informasi Tambahan
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="fs-language">Bahasa yang Dikuasai</CustomFormLabel>
          <CustomTextField
            id="fs-language"
            placeholder="Masukkan bahasa yang Anda kuasai"
            fullWidth
          />

          <CustomFormLabel htmlFor="fs-education">Latar Belakang Pendidikan</CustomFormLabel>
          <CustomTextField
            id="fs-education"
            placeholder="Contoh: S1 Teknik Informatika, Universitas XYZ"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomFormLabel htmlFor="fs-skills">Keahlian Utama</CustomFormLabel>
          <CustomTextField
            id="fs-skills"
            placeholder="Contoh: Pemrograman, Desain Grafis, Manajemen"
            fullWidth
          />

          <CustomFormLabel htmlFor="fs-experience">Pengalaman Kerja</CustomFormLabel>
          <CustomTextField
            id="fs-experience"
            placeholder="Pengalaman kerja sebelumnya"
            multiline
            rows={3}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <CustomFormLabel>Jenis Pertanyaan yang Diinginkan</CustomFormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="teknikal"
              control={<Radio />}
              label="Pertanyaan Teknikal"
            />
            <FormControlLabel
              value="non-teknikal"
              control={<Radio />}
              label="Pertanyaan Non-Teknikal"
            />
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary"
            onClick={() => router.push("/wawancara/sesi")}>
              Kirim
            </Button>
            <Button variant="text" color="error"
            onClick={() => router.push("/dashboard")}>
              Kembali
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormSeparator;
