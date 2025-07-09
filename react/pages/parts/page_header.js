import { basePath } from "@/next.config";

import Head from 'next/head';
import Image from 'next/image';
import Grid from '@mui/material/Grid2';
import HeaderNav from "@/components/header_nav";

export default function PageHeader({ page_subtitle, page_description }) {
    const top_nav = [
        { name: "Home", href: basePath },
        { name: "Active Storms", href: basePath + "?storms=active" },
        { name: "Active Storms (new)", href: basePath + "/active_storms" },
        { name: "Historical Storms", href: basePath + "?storms=historical" },
        { name: "Historical Storms (new)", href: basePath + "/historical_storms" },
        { name: "About Hurricanes", href: basePath + "?storms=hurricanes" },
        { name: "About Hurricanes (new)", href: basePath + "/about" },
    ];

    const logo = {
        src: `${basePath}/cioos-atlantic_EN.svg`,
        alt: "CIOOS Atlantic - Ocean Storm Viewer",
        href: "https://cioosatlantic.ca/"
    };

    const site_title = process.env.baseSiteTitle + page_subtitle;

    return (
        <>
            <Head>
                <link rel="icon" href={`${basePath}/favicon.ico`} />
                <meta
                    name="description"
                    content={page_description}
                />
                <meta name="og:title" content={site_title} />
                <title>{site_title}</title>
            </Head>
            <header>
                <Grid container alignItems="center" spacing={1}
                    sx={{
                        justifyContent: 'space-between', flexWrap: 'nowrap', maxHeight: { xs: '80px', sm: '100px', md: '120px', lg: '140px' }, // Responsive max height for the header 
                        //maxWidth: '50%'
                    }}
                >
                    {/* Logo Section */}
                    <Grid size='auto'
                        sx={{ maxWidth: '50%' }} >

                        <a href={logo.href}>
                            <Image
                                src={logo.src}
                                width={200}
                                height={100}
                                className="logo" // Preserving your existing class for the logo
                                alt="logo"

                            />
                        </a>
                    </Grid>

                    {/* Content Section */}
                    <Grid size='auto' >

                    </Grid>

                    {/* Navigation Section */}
                    <Grid size='auto'
                        sx={{
                            maxWidth: '100%', // Ensures responsiveness
                            overflow: 'visible', // 
                            //display: 'flex',
                            //justifyContent: 'flex-end',
                            //gap: 1, // Adds spacing between navigation items
                            fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px', xxl: '22px' }, // Font size changes based on breakpoints
                        }} ><HeaderNav navItems={top_nav} />
                    </Grid>
                </Grid>
            </header>
        </>
    );

}