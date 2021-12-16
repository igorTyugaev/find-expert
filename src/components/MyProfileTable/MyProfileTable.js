import React from 'react';
import Table from '@mui/material/Table';
import moment from "moment";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {Rating, Typography} from "@mui/material";
import {useAppContext} from "../../AppContext";

function createData(name, calories, type = null) {
    return {name, calories, type};
}

const MyProfileTable = ({small = false, isHeader = false}) => {
    const appContext = useAppContext();
    const {user, userData} = appContext;
    const {email} = user;
    const {fullName, role} = userData;

    const rows = [
        createData('Имя:', fullName),
        createData('Почта:', email),
        createData('Ваш рейтинг', 5, "rating"),
        createData('Ваш статус', role),
        createData('На платформе с', moment(user.metadata.lastSignInTime).format("llll")),
    ];

    return (
        <TableContainer>
            <Table size={small ? "small" : ""} aria-label="a dense table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <Typography variant="span" sx={{fontWeight: "bold"}}>{row.name}</Typography>
                            </TableCell>
                            <TableCell align="right">
                                {row.type ? <Rating name="read-only" value={row.calories} readOnly/>
                                    : row.calories}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyProfileTable;
