import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context";
import { ActionType, UpdateCreateOptionsData } from "../reducer";
import { makeStyles } from "@material-ui/core";
import LevelSelect from "./LevelSelect";
import { CreateOptions } from "../model/create-options";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "row",
	},
});

const CreateOptionsPanel: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const options = character.options;
    const { karmaLevel, connectionLevel, nuyenLevel, gearLevel } = options;

    const classes = useStyles();

    const handleOnOptionsChange = (newOptions: CreateOptions) => {
        const data: UpdateCreateOptionsData = newOptions;
        dispatch({ type: ActionType.UpdateCreateOptions, data });
    }

    return (
        <div className={classes.root}>
            <LevelSelect id="karma" label="Karma" value={karmaLevel} updateValue={(newValue) => handleOnOptionsChange({...options, karmaLevel: newValue})} />
            <LevelSelect id="connection" label="Connection" value={connectionLevel} updateValue={(newValue) => handleOnOptionsChange({...options, connectionLevel: newValue})} />
            <LevelSelect id="nuyen" label="Nuyen" value={nuyenLevel} updateValue={(newValue) => handleOnOptionsChange({...options, nuyenLevel: newValue})} />
            <LevelSelect id="gear" label="Gear" value={gearLevel} updateValue={(newValue) => handleOnOptionsChange({...options, gearLevel: newValue})} />
        </div>
    );
}

export default CreateOptionsPanel;