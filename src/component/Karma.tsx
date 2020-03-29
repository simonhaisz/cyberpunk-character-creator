import React, { FC, Fragment } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from "../context";

const useStyles = makeStyles({
    badge: {
        marginLeft: 50,
    },
});

const Karma: FC = () => {
    const classes = useStyles();
    const karma = useGlobalState("karma");
    const { total, spent, available } = karma;
    return (
        <Fragment>
            <Badge className={classes.badge} badgeContent={total} color="primary" max={1000} showZero>
                <ShoppingCartIcon />
            </Badge>
            <Badge className={classes.badge} badgeContent={spent} color="error" max={1000} showZero>
                <ShoppingCartIcon />
            </Badge>
            <Badge className={classes.badge} badgeContent={available} color="secondary" max={1000} showZero>
                <ShoppingCartIcon />
            </Badge>
        </Fragment>
    );
};

export default Karma;