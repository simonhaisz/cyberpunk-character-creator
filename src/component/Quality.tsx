import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import { Quality as QualityData } from "../model/quality";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row"
    },
    name: {
        width: "250px"
    }
});

type Props = {
    quality: QualityData;
};
const Quality: FC<Props> = (props: Props) => {
    const { quality } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className={classes.name}>{quality.Name}</Typography>
            <Typography>({quality.Cost})</Typography>
        </div>
    );
};

export default Quality;