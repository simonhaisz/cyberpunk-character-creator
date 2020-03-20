import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { CharacterRef } from "../model/character";


type Props = {
    character: CharacterRef;
};

const CharacterName: FC<Props> = (props: Props) => {
    const { character } = props;
    const { name, streetName } = character;
    if (!name && !streetName) {
        return <Typography>= New Character =</Typography>;
    }
    if (!streetName) {
        return <Typography>{name}</Typography>
    }
    if (!name) {
        return <Typography>{streetName}</Typography>
    }
    return <Typography>{name} aka {streetName}</Typography>
};

export default CharacterName;