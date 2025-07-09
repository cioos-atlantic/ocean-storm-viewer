import FooterNav from "@/pages/parts/footer_nav";
import { Box } from "@mui/material";

export default function PageFooter({ }) {

    return (
        <>
            <footer>
                <Box sx={{
                    height: { xs: '20px', sm: '30px', md: '35px', lg: '50px', xl: '50px', xxl: '50px' }, // if changed, remember to change the station dashboard bottom in the station_dashboard.js
                }}>
                    <FooterNav></FooterNav>
                </Box>
            </footer>
        </>
    );
}
