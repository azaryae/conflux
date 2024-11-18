'use client'

import { Box, Typography, Button, Divider, Stack, TextField } from "@mui/material";
import Link from "next/link";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";
import { useState } from "react";
import { useForm } from "react-hook-form";  // Assuming you're using React Hook Form

const AuthRegister = ({ title, subtext, subtitle }: { title: string, subtext: string, subtitle: string }) => {
  // Assuming React Hook Form for handling form state
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: RegisterFormProps) => {
    console.log(data); // Handle form submission
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
