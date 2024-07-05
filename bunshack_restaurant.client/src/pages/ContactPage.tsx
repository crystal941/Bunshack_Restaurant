import React from "react";
import Layout from "../components/Layout";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";

const contact: React.FC = () => {
  return (
    <Layout>
      <div className="content-wrapper">
        <div className="content">
          <Box>
            <Typography variant="h4">Contact Us</Typography>
            <Typography component="p">We'd love to hear from you! </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: { xs: 3, sm: 5 },
                width: "600px",
                "@media (max-width:600px)": {
                  width: "300px",
                },
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="contact table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          bgcolor: "goldenrod",
                          color: "white",
                        }}
                        align="center"
                      >
                        Contact Details
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <BusinessIcon sx={{ color: "red", pt: 1 }} /> 3097 Great
                        North Road, New Lynn, Auckland 0600
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <MailIcon sx={{ color: "skyblue", pt: 1 }} />{" "}
                        bunshack_breakfast@hotmail.com
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <CallIcon sx={{ color: "green", pt: 1 }} /> (09) 218
                        9712
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </div>
      </div>
    </Layout>
  );
};
export default contact;
