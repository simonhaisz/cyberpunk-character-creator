import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
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

export type QualityControl = {
    purchased: boolean;
} & QualityData;

type Props = {
    quality: QualityControl;
    onUpdate: (value: QualityControl) => void;
};
const Quality: FC<Props> = (props: Props) => {
    const { quality, onUpdate } = props;

    const classes = useStyles();

    const onToggle = (event: React.ChangeEvent<HTMLInputElement>, purchased: boolean) => {
        onUpdate({ ...quality, purchased });
    };

    return (
        <div className={classes.root}>
            <Switch checked={quality.purchased} onChange={onToggle} size="small" />
            <Typography className={classes.name}>{quality.name}</Typography>
            <Typography>({quality.cost})</Typography>
        </div>
    );
};

export default Quality;