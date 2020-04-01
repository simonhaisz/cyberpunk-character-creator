import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Attribute from "./Attribute";
import { Attribute as AttributeData } from "../model/character";
import { ActionType } from "../reducer";
import { getAttributesCost } from "../model/attributes";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    header: {
        marginBottom: 20,
    }
});

const Attributes: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const { attributes, metaType } = character;

    const classes = useStyles();

    const attributesCost = getAttributesCost(character);

    const onUpdate = (attribute: AttributeData) => {
        const newAttributes = [ ...attributes ];
        const attributeIndex = newAttributes.findIndex(a => a.name === attribute.name);
        newAttributes[attributeIndex] = attribute;
        dispatch({
            type: ActionType.UpdateCharacter,
            data: { ...character, attributes: newAttributes }
        });
    };
    return (
        <List subheader={<ListSubheader className={classes.header}>Attributes ({attributesCost})</ListSubheader>}>
            {
                attributes.map(a => (
                    <ListItem key={a.name}>
                        <Attribute attribute={a} metaType={metaType} onUpdate={onUpdate} />
                    </ListItem>
                ))
            }
        </List>
    );
};

export default Attributes;