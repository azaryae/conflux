'use client'

import { Box, Typography, Button, Divider, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { z } from "zod";
import toast from "react-hot-toast";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { useState } from "react";
import { useForm } from "react-hook-form";  // Assuming you're using React Hook Form
import { reset } from "@/store/counter/counterSlice";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = z.object({
  name: z.string().min(4),
  email: z.string().email({message: "Invalid email format"}),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
}).refine(data => data.password === data.password_confirmation, {
  message: "Password Confirmation doesn't match",
  path: ["password_confirmation"],
});

const AuthRegister = ({ title, subtext, subtitle }: { title: string, subtext: string, subtitle: string }) => {


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormProps) => {
    try {
      let response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

  
      if (response.ok) {
        toast.success("Register berhasil, silahkan login");
        setTimeout(() => {
          window.location.assign("/authentication/login");
          reset();
        }, 1500);
      } else if (response.status === 400) {
        const data = await response.json(); // Tunggu parsing JSON
        const errormessage = data.error;
        toast.error(errormessage);
      } else {
        toast.error("Register gagal, silahkan coba lagi");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan, silahkan coba lagi nanti.");
    }
  };
  


  return (
    <Box>
      {/* Conditional Title */}
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {/* Subtext */}
      {subtext && <Typography variant="body1" mb={2}>{subtext}</Typography>}

      <AuthSocialButtons title="Sign up with" />

      {/* Divider with text */}
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign up with
          </Typography>
        </Divider>
      </Box>

      {/* Registration Form */}
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack mb={3}>
            {/* Name Field */}
            <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
            <TextField
              id="name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            {/* Email Field */}
            <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
            <TextField
              id="email"
              variant="outlined"
              fullWidth
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* Password Field */}
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <TextField
              id="password"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {/* confirmation password fiels */}
            <CustomFormLabel htmlFor="password_confirmation">Confirm Password</CustomFormLabel>
            <TextField
              id="password_confirmation"
              variant="outlined"
              fullWidth
              type="password"
              {...register("password_confirmation", { required: "Password Confirmation is required" })}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
            />
          </Stack>

          {/* Sign Up Button */}
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </Box>

      {/* Subtitle */}
      {subtitle && <Typography variant="body2" mt={2}>{subtitle}</Typography>}

      {/* Link to Login Page */}
      <Box mt={2} textAlign="center">
        <Link href="/authentication/login">
          <Typography variant="body2" color="primary">
            Already have an account? Log in here.
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default AuthRegister;
