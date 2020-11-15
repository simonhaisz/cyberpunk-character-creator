import React, { FC } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalState } from "../context";

const useStyles = makeStyles({
    root: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    badge: {
        marginLeft: 50,
    },
});

const Karma: FC = () => {
    const classes = useStyles();
    const karma = useGlobalState("karma");
    const { total, spent, available } = karma;
    return (
        <div className={classes.root}>
            <Badge className={classes.badge} badgeContent={total} color="primary" max={999} showZero>
                <ShoppingCartIcon />
            </Badge>
            <Badge className={classes.badge} badgeContent={spent} color="secondary" max={999} showZero>
                <ShoppingCartIcon />
            </Badge>
            <Badge className={classes.badge} badgeContent={available} color="primary" max={999} showZero>
                <ShoppingCartIcon />
            </Badge>
        </div>
    );
};

export default Karma;