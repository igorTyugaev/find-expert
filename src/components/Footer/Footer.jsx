import React from 'react';
import {Container, Grid, Typography, styled, Stack} from "@mui/material";

const FooterContainer = styled("div")(({theme}) => ({
    width: "100%",
    marginTop: theme.spacing(6),
}));

const FooterInner = styled(Grid)(({theme}) => ({
    width: "100%",
    alignItems: "center",
}));

const Footer = () => {
    return (
        <FooterContainer>
            <Typography variant="h5" component="h3" sx={{fontWeight: "bold"}}>
                О нас
            </Typography>
            <FooterInner container spacing={4}>
                <Grid item xs={4}>
                    <img height="100%" width="100%"
                         src="https://worldscipubl.com/landing/images/content/logo/logo_black.svg"
                         alt=""/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="subtitle1" component="p">
                        Наша платформа обеспечивает безопасную С2С среду, в которой ученые могут связываются с
                        экспертами
                        по академическому редактированию со всего мира.
                        Свяжитесь с международными академическими экспертами, чтобы улучшить качество вашей
                        работы,
                        ускорить процесс публикации ваших статей и повысить ваши шансы на публикации в
                        влиятельных журналах.
                    </Typography>
                </Grid>
            </FooterInner>
        </FooterContainer>
    );
};

export default Footer;
