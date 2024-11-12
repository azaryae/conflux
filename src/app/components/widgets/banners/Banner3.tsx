"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Banner3 = () => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        color: "white",
        fontSize: "25px",
        padding: "10px 0px",
        textTransform: "none",
      }}
      onClick={() => router.push("/wawancara")}
    >
      Mulai Wawancara
    </Button>
  );
};

export default Banner3;
