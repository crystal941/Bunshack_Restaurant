import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Box, Button, ButtonGroup, Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import WelcomeImage from '../assets/WelcomeImage.jpg';


const WelcomePage: React.FC = () => {
    const { user } = useAuth();
    const isMobile = useMediaQuery('(max-width:600px)');
    const buttons = [
        <Button key="viewmenus" component={Link}
            to={'/menu'}>View Menus</Button>,
        <Button key="makeorder" component={Link}
            to={'/neworder'}>Make Order</Button>,
        <Button key="vieworders" component={Link}
            to={'/orders'}>View Orders</Button>,
    ];

    return (
        <Layout>
            <div className="content">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4"> Welcome Back! <br /> {user?.name}</Typography>
                    <Box sx={{
                        display: 'flex',
                        '& > *': {
                            m: 1,
                        },
                    }}
                    >
                        <ButtonGroup orientation={isMobile ? 'vertical' : 'horizontal'} variant="contained" size="large" aria-label="button group">
                            {buttons}
                        </ButtonGroup>
                    </Box>
                    <img src={WelcomeImage} alt="WelcomeImage with hot steamed buns" style={{ marginTop: "50px" }} />
                </Box>
            </div>
        </Layout>
    );
};

export default WelcomePage;