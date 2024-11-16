import React from "react";
import FeaturesTitle from "./FeaturesTitle";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  IconAdjustments,
  IconArchive,
  IconArrowsShuffle,
  IconBook,
  IconBuildingCarousel,
  IconCalendar,
  IconChartPie,
  IconDatabase,
  IconDiamond,
  IconLanguageKatakana,
  IconLayersIntersect,
  IconMessages,
  IconRefresh,
  IconTag,
  IconWand,
  IconLockAccess,
  IconSquareKey,
  IconTable,
  IconPresentation,
  IconPackage
} from "@tabler/icons-react";
import AnimationFadeIn from "../animation/Animation";

interface FeaturesType {
  icon: React.ReactElement;
  title: string;
  subtext: string;
}

const featuresData: FeaturesType[] = [
  {
    icon: <IconWand width={40} height={40} strokeWidth={1.5} />,
    title: "Generative Artificial Intelligence",
    subtext: "Terintegrasi dengan Generative AI untuk membantu kamu berlatih wawancara kerja.",
  },
  {
    icon: <IconMessages width={40} height={40} strokeWidth={1.5} />,
    title: "Speech Recognition & Synthesis",
    subtext: "Dilengkapi dengan Speech Recognition & Synthesis untuk berlatih wawancara secara dua arah.",
  },
  {
    icon: <IconBuildingCarousel width={40} height={40} strokeWidth={1.5} />,
    title: "Analisis Gestur & Ekspresi Wajah",
    subtext: "Dapat menganalisis gestur tubuh dan ekspresi wajah kamu saat berlatih wawancara.",
  },
  {
    icon: <IconAdjustments width={40} height={40} strokeWidth={1.5} />,
    title: "Pertanyaan yang Dipersonalisasi & Dinamis",
    subtext: "Wawancara yang dipersonalisasi dan dinamis sesuai dengan kebutuhan kamu.",
  },
  {
    icon: <IconTag width={40} height={40} strokeWidth={1.5} />,
    title: "Harga yang Terjangkau",
    subtext: "Harga yang kompetitive dan terjangkau untuk semua kalangan.",
  },
  {
    icon: <IconPresentation width={40} height={40} strokeWidth={1.5} />,
    title: "Fleksibel & Mudah Digunakan",
    subtext: "Latihan wawancara kapan & dimana saja dengan platform yang mudah digunakan.",
  },
  {
    icon: <IconLockAccess width={40} height={40} strokeWidth={1.5} />,
    title: "Keamanan",
    subtext:"Keamanan data pengguna terjamin dan terjaga dengan baik.",
  },
  {
    icon: <IconRefresh width={40} height={40} strokeWidth={1.5} />,
    title: 'Feedback kepada Pengguna',
    subtext: 'Mendapatkan feedbak langsung setelah berlatih wawancara.',
  },
  // {
  //   icon: <IconArchive width={40} height={40} strokeWidth={1.5} />,
  //   title: "75+ Page Templates",
  //   subtext: "Yes, we have 4 demos & 75+ Pages per demo to make it easier.",
  // },

  // {
  //   icon: <IconPackage width={40} height={40} strokeWidth={1.5} />,
  //   title: 'Blogs with MDX',
  //   subtext: 'It provides a comprehensive blogging solution using MDX, which uniquely blends Markdown and JSX.',
  // },
  // {
  //   icon: <IconSquareKey width={40} height={40} strokeWidth={1.5} />,
  //   title: "Firebase",
  //   subtext: "This template comes with Firebase implementation.",
  // },
  // {
  //   icon: <IconTable width={40} height={40} strokeWidth={1.5} />,
  //   title: "React Table",
  //   subtext:
  //     "Supercharge your tables or build a datagrid from scratch for TS/JS React.",
  // },
  // {
  //   icon: <IconDiamond width={40} height={40} strokeWidth={1.5} />,
  //   title: "3400+ Font Icons",
  //   subtext:
  //     "Lots of Icon Fonts are included here in the package of Elegant Admin.",
  // },
  // {
  //   icon: <IconDatabase width={40} height={40} strokeWidth={1.5} />,
  //   title: "Axios",
  //   subtext:
  //     "Axios is a promise-based HTTP Client for node.js and the browser.",
  // },
  // {
  //   icon: <IconLanguageKatakana width={40} height={40} strokeWidth={1.5} />,
  //   title: "i18 React",
  //   subtext:
  //     "react-i18 is a powerful internationalization framework for React.",
  // },

  // {
  //   icon: <IconArrowsShuffle width={40} height={40} strokeWidth={1.5} />,
  //   title: "Easy to Customize",
  //   subtext: "Customization will be easy as we understand your pain.",
  // },
  // {
  //   icon: <IconChartPie width={40} height={40} strokeWidth={1.5} />,
  //   title: "Lots of Chart Options",
  //   subtext: "You name it and we have it, Yes lots of variations for Charts.",
  // },
  // {
  //   icon: <IconLayersIntersect width={40} height={40} strokeWidth={1.5} />,
  //   title: "Lots of Table Examples",
  //   subtext: "Data Tables are initial requirement and we added them.",
  // },
  // {
  //   icon: <IconBook width={40} height={40} strokeWidth={1.5} />,
  //   title: "Detailed Documentation",
  //   subtext: "We have made detailed documentation, so it will easy to use.",
  // },
  // {
  //   icon: <IconCalendar width={40} height={40} strokeWidth={1.5} />,
  //   title: "Calendar Design",
  //   subtext: "Calendar is available with our package & in nice design.",
  // },

];

const Features = () => {
  return (
    <Box py={6}>
      <Container maxWidth="lg">
        <FeaturesTitle />
        <AnimationFadeIn>
          <Box mt={6}>
            <Grid container spacing={3}>
              {featuresData.map((feature, index) => (
                <Grid item xs={12} sm={4} lg={3} textAlign="center" key={index}>
                  <Box color="primary.main">{feature.icon}</Box>
                  <Typography variant="h5" mt={3}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    mt={1}
                    mb={3}
                  >
                    {feature.subtext}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AnimationFadeIn>
      </Container>
    </Box>
  );
};

export default Features;
