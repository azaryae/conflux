'use client';

import { Box, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

// Zod schema for validation
const formSchema = z.object({
  nama_instansi: z.string().min(1, "Nama instansi wajib diisi"),
  deskripsi_instansi: z.string().min(1, "Deskripsi instansi wajib diisi"),
  posisi: z.string().min(1, "Posisi wajib diisi"),
  deskripsi_posisi: z.string().min(1, "Deskripsi posisi wajib diisi"),
  tipe_pekerjaan: z.enum(["full-time", "part-time", "internship"]),
  pengalaman_minimal: z.string().min(1, "Pengalaman minimal wajib diisi"),
  questionType: z.enum(["teknikal", "non-teknikal"]),
});

type FormData = z.infer<typeof formSchema>;

const FormSeparator = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/wawancara', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      router.push('/wawancara/sesi');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="grid" gap={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* Nama Instansi Field */}
            <TextField
              {...register('nama_instansi')}
              label="Nama Instansi"
              placeholder="Nama instansi yang dituju"
              error={!!errors.nama_instansi}
              helperText={errors.nama_instansi?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Posisi Field */}
            <TextField
              {...register('posisi')}
              label="Posisi yang Dilamar"
              placeholder="Posisi yang dilamar"
              error={!!errors.posisi}
              helperText={errors.posisi?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Deskripsi Instansi Field */}
            <TextField
              {...register('deskripsi_instansi')}
              label="Deskripsi Instansi"
              placeholder="Deskripsi instansi"
              error={!!errors.deskripsi_instansi}
              helperText={errors.deskripsi_instansi?.message}
              disabled={isSubmitting}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Deskripsi Posisi Field */}
            <TextField
              {...register('deskripsi_posisi')}
              label="Deskripsi Posisi"
              placeholder="Deskripsi posisi"
              error={!!errors.deskripsi_posisi}
              helperText={errors.deskripsi_posisi?.message}
              disabled={isSubmitting}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Tipe Pekerjaan Radio Group */}
            <FormControl component="fieldset" error={!!errors.tipe_pekerjaan}>
              <FormLabel>Tipe Pekerjaan</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="full-time"
                  control={<Radio {...register('tipe_pekerjaan')} disabled={isSubmitting} />}
                  label="Full-time"
                />
                <FormControlLabel
                  value="part-time"
                  control={<Radio {...register('tipe_pekerjaan')} disabled={isSubmitting} />}
                  label="Part-time"
                />
                <FormControlLabel
                  value="internship"
                  control={<Radio {...register('tipe_pekerjaan')} disabled={isSubmitting} />}
                  label="Internship"
                />
              </RadioGroup>
              {errors.tipe_pekerjaan && <span style={{ color: '#d32f2f', marginTop: '0.5rem' }}>{errors.tipe_pekerjaan.message}</span>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Pengalaman Minimal Field */}
            <TextField
              {...register('pengalaman_minimal')}
              label="Pengalaman Minimal"
              placeholder="Pengalaman minimal yang dibutuhkan"
              error={!!errors.pengalaman_minimal}
              helperText={errors.pengalaman_minimal?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            {/* Question Type Radio Group */}
            <FormControl component="fieldset" error={!!errors.questionType}>
              <FormLabel>Jenis Pertanyaan yang Diinginkan</FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  value="teknikal"
                  control={<Radio {...register('questionType')} disabled={isSubmitting} />}
                  label="Pertanyaan Teknikal"
                />
                <FormControlLabel
                  value="non-teknikal"
                  control={<Radio {...register('questionType')} disabled={isSubmitting} />}
                  label="Pertanyaan Non-Teknikal"
                />
              </RadioGroup>
              {errors.questionType && <span style={{ color: '#d32f2f', marginTop: '0.5rem' }}>{errors.questionType.message}</span>}
            </FormControl>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push('/dashboard')}
            disabled={isSubmitting}
          >
            Kembali
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default FormSeparator;