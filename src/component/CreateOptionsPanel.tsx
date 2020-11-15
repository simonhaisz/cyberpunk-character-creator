import React, { ChangeEvent, FC } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch, useGlobalState } from "../context";
import { ActionType, UpdateCreateOptionsData } from "../reducer";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
	},
});

const CreateOptionsPanel: FC = () => {
    const dispatch = useDispatch();
    const options = useGlobalState("options");

    const classes = useStyles();

    const handleApplyChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const data: UpdateCreateOptionsData = {
            applyCharacterCreationLimits: checked
        };
        dispatch({ type: ActionType.UpdateCreateOptions, data });
    };

    return (
        <div className={classes.root}>
            <FormControlLabel
                control={
                    <Switch
                        checked={options.applyCharacterCreationLimits}
                        onChange={handleApplyChange}
                        name="applyLimits"
                        color="primary"
                    />
                }
                label="Apply Character Creation Limits"
            />
        </div>
    );
}

export default CreateOptionsPanel;