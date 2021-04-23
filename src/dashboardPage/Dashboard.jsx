import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MuiTableCell from "@material-ui/core/TableCell";
import TablePagingEnd from '../utilities/TablePagingFooter';
import TableFooter from '@material-ui/core/TableFooter';
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const TableCell = withStyles({
    root: {
        borderBottom: "none",
    },
})(MuiTableCell);


const useStyles = makeStyles({
    tableProfile: {
        maxWidth: 550
    },
    xsDash: {
        backgroundColor: 'white',
        boxShadow: '1px 1px 25px 10px #674932',
        borderRadius: '5px'
    },
    smDash: {
        marginLeft: 40, 
        marginRight: 40, 
        marginTop: 10, 
        backgroundColor: 'white', 
        boxShadow: '1px 1px 25px 10px #674932', 
        borderRadius: '5px'
    },
    dataRender :{
        marginTop: 100, 
        padding: 10
    }
});

const Dashboard = props => {
    const [data, setData] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios
                .get("https://randomuser.me/api/?inc=name,picture,dob&results=50")
                .then(data => {
                    setData(data.data);
                })
                .catch(error => {
                    console.log(error, "error");
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const renderData = (data) => {
        if (data && data.results) {
            return data.results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                    <Table key={"profile_" + index} className={classes.tableProfile}>
                        <TableBody>
                            <TableRow>
                                <TableCell width="10%">
                                    <img src={row.picture.medium} alt="profile" />
                                </TableCell>
                                <TableCell  >
                                    <p>Name: {row.name.first} {row.name.last}</p>
                                    <p>Age: {row.dob.age}</p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                );
            })
        }
    }

    return (
        <>
            {!isLoading ?
                (
                    <Grid className={isXS ? classes.xsDash : classes.smDash} >
                        <Grid className={classes.dataRender} justify="center" alignItems="center" container>
                            {renderData(data)}
                        </Grid>
                        <Table>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[]}
                                        count={data && data.results.length ? data && data.results.length : 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePagingEnd}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Grid>
                )
                :
                (
                    <Grid container justify="center" style={{ marginTop: 200 }}>
                        <CircularProgress style={{ color: "#674932" }} />
                    </Grid>
                )

            }
        </>

    );
};

export default withRouter(Dashboard);
