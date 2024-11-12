'use client';
import React from 'react';
import { Box, Grid, Typography, Chip, CardContent, Divider, Button } from '@mui/material';
import Image from 'next/image';
import BlankCard from '../../../shared/BlankCard';

const Licenses = [
    {
        id: 1,
        type: 'Paket 1',
        isPopular: false,
        typeText: '1 token untuk 1 sesi wawancara.',
        price: '15.000',
        fullSourceCode: false,
        isDoc: true,
        isSass: false,
        isSingleProject: true,
        isSupport: true,
        isUpdate: false
    },
    {
        id: 2,
        type: 'Paket 2',
        isPopular: false,
        typeText: '5 token untuk 5 sesi wawancara.',
        price: '75.000',
        fullSourceCode: false,
        isDoc: true,
        isSass: false,
        isSingleProject: true,
        isSupport: true,
        isUpdate: false
    },
    {
        id: 3,
        type: 'Paket 3',
        isPopular: true,
        typeText: '10 token untuk 10 sesi wawancara.',
        price: '150.000',
        fullSourceCode: false,
        isDoc: true,
        isSass: false,
        isSingleProject: true,
        isSupport: true,
        isUpdate: false
    },
    {
        id: 4,
        type: 'Paket 4',
        isPopular: false,
        typeText: '20 token untuk 20 sesi wawancara.',
        price: '300.000',
        fullSourceCode: false,
        isDoc: true,
        isSass: false,
        isSingleProject: true,
        isSupport: true,
        isUpdate: false
    },
];

const PricingCard = () => {
    return (
        <>
            <Grid container spacing={2}>
                {Licenses.map((license, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <BlankCard>
                            <CardContent sx={{ p: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <Typography variant="h6" fontSize="16px" fontWeight={600} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {license.type}
                                    </Typography>
                                    {license.isPopular ?
                                        <Chip label="Popular" size="small" sx={{
                                            ml: '6px',
                                            borderRadius: '8px',
                                            color: 'primary.main',
                                            backgroundColor: 'rgba(93, 135, 255, 0.15)'
                                        }} />
                                        : null}
                                </Box>

                                <Typography fontSize="12px" mb={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {license.typeText}
                                </Typography>
                                <Divider />
                                <Box mt={2} mb={2} display="flex" direction="row" gap="8px" alignItems="baseline">
                                    <Typography variant='h5' fontSize="24px" fontWeight={700}>Rp{license.price}</Typography>
                                    <Typography variant='body2' fontSize="12px">/ sekali pembayaran</Typography>
                                </Box>
  
                                <Button fullWidth variant="contained" size="small">Purchase Now</Button>
                            </CardContent>
                        </BlankCard>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PricingCard;
