import React from 'react';
import {Container, Grid, Typography, styled} from "@mui/material";

const FooterContainer = styled("div")(({theme}) => ({
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(6),
    padding: theme.spacing(6),
}));

const FooterInner = styled(Grid)(({theme}) => ({
    width: "100%",
}));

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <FooterInner container spacing={2}>
                    <Grid item xs={4}>
                        <img height="100%" width="100%"
                             src="https://worldscipubl.com/landing/images/content/logo/logo_white.svg"
                             alt=""/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1" component="p" sx={{color: "#FFF"}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi aut corporis,
                            deserunt,
                            dolore enim est eveniet exercitationem ipsum maxime modi necessitatibus neque non quisquam
                            recusandae reiciendis reprehenderit rerum veritatis?
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1" component="p" sx={{color: "#FFF"}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi aut corporis,
                            deserunt,
                            dolore enim est eveniet exercitationem ipsum maxime modi necessitatibus neque non quisquam
                            recusandae reiciendis reprehenderit rerum veritatis?
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1" component="p" sx={{color: "#FFF"}}>
                            Сервис подготовки и продвижения научных статей в проверенные журналы из баз данных Scopus и
                            Web of Science
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1" component="p" sx={{color: "#FFF"}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi aut corporis,
                            deserunt,
                            dolore enim est eveniet exercitationem ipsum maxime modi necessitatibus neque non quisquam
                            recusandae reiciendis reprehenderit rerum veritatis?
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1" component="p" sx={{color: "#FFF"}}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi aut corporis,
                            deserunt,
                            dolore enim est eveniet exercitationem ipsum maxime modi necessitatibus neque non quisquam
                            recusandae reiciendis reprehenderit rerum veritatis?
                        </Typography>
                    </Grid>
                </FooterInner>
            </Container>
        </FooterContainer>
    );
};

export default Footer;
