import React from 'react';
import {styled} from "@mui/material/styles";
import {CardMedia, Card, Typography, Grid, Box, Button} from "@mui/material";

const ScienceItem = styled(Card)(({theme}) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
}));

const ScienceItemIcon = styled(CardMedia)(({theme}) => ({
    display: 'block',
    height: theme.spacing(6),
    width: theme.spacing(6),
}));

const ScienceItemLabel = styled(Typography)(({theme}) => ({
    display: 'flex',
    marginLeft: '1em',
}));

const GridItemScience = styled(Grid)(({theme}) => ({
    [theme.breakpoints.up('xs')]: {
        width: '100%',
        '&:nth-of-type(n+5)': {
            display: 'none',
        }
    },

    [theme.breakpoints.up('sm')]: {
        width: '50%',
        '&:nth-of-type(n+5)': {
            display: 'none',
        }
    },

    [theme.breakpoints.up('md')]: {
        width: '25%',
        '&:nth-of-type(n+5)': {
            display: 'block',
        },
    },
}));

const ChoiceScience = () => {
    return (
        <Box sx={{width: '85%', margin: '0 auto'}}>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 2}}>
                <Typography variant='h5'>Область наук</Typography>
                <Button variant="outlined" size="small">Покаать все</Button>
            </Box>
            <Grid container spacing={1}>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>

                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
                <GridItemScience item>
                    <ScienceItem>
                        <ScienceItemIcon
                            component="img"
                            image="https://mui.com/static/images/cards/live-from-space.jpg"
                            alt="Live from space album cover"
                        />
                        <ScienceItemLabel>
                            Техника и те...
                        </ScienceItemLabel>
                    </ScienceItem>
                </GridItemScience>
            </Grid>
        </Box>
    );
};

export default ChoiceScience;
