import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
const FeaturesTitle = () => {

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={10} lg={6}>
                <Typography fontSize="16" textTransform="uppercase" color="primary.main" fontWeight={500} textAlign="center" mb={1}>Kenapa Harus Conflux.AI?</Typography>
                <Typography variant='h2' fontWeight={700} textAlign="center" sx={{
                    fontSize: {
                        lg: '36px',
                        xs: '25px'
                    },
                    lineHeight: {
                        lg: '43px',
                        xs: '30px'
                    }
                }}>Platform Latihan Wawancara dengan berbagai Keunggulan</Typography>
            </Grid>
        </Grid>
    );
};

export default FeaturesTitle;
