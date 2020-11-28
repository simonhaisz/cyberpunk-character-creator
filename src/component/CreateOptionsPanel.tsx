import React, { ChangeEvent, FC, Fragment, useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useDispatch, useGlobalState } from "../context";
import { ActionType, UpdateCharacterData } from "../reducer";
import { makeStyles } from "@material-ui/core";
import ConfirmationDialog from "./ConfirmationDialog";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
	},
});

const CreateOptionsPanel: FC = () => {
    const dispatch = useDispatch();
    const selectedCharacter = useGlobalState("selectedCharacter");
    const options = selectedCharacter.options;

    const classes = useStyles();

    const [showToggleConfirmation, setShowToggleConfirmation] = useState(false);

    const handleApplyChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        if (!checked) {
            setShowToggleConfirmation(true);
        } else {
            console.warn("Apply character creaiton limits toggle can never be turned on after being turned off");
        }
    };

    const handleToggleChoice = (accept: boolean) => {
        if (accept) {
            const data: UpdateCharacterData = {
                ...selectedCharacter,
                options: {
                    applyCharacterCreationLimits: false
                }
            };
            dispatch({ type: ActionType.UpdateCharacter, data });
        }
        setShowToggleConfirmation(false);
    }

    return (
        <Fragment>
            <div className={classes.root}>
                <FormControlLabel
                    control={
                        <Switch
                            disabled={!options.applyCharacterCreationLimits}
                            checked={options.applyCharacterCreationLimits}
                            onChange={handleApplyChange}
                            name="applyLimits"
                            color="primary"
                        />
                    }
                    label="Apply Character Creation Limits"
                />
            </div>
            <ConfirmationDialog
                open={showToggleConfirmation}
                onChoice={handleToggleChoice}
                content="Are you sure you want to turn off character creation limits? Once turned off it cannot be turned on again."
                />
        </Fragment>
    );
}

export default CreateOptionsPanel;