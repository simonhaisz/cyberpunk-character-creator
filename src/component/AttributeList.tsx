import React, { FC, Fragment } from "react";
import { useDispatch, useGlobalState } from "../context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Attribute from "./Attribute";
import { Attribute as AttributeData, isAwakened } from "../model/character";
import { ActionType } from "../reducer";
import { getAttributesCost } from "../model/attributes";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    header: {
        marginBottom: 20,
        paddingLeft: 16,
        paddingTop: 12,
        fontWeight: 700,
    }
});

const AttributeList: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("selectedCharacter");
    const classes = useStyles();

    const { attributes, metaType } = character;

    const filteredAttributes = attributes.filter(a => isAwakened(character) || a.name !== "Magic");

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
        <Fragment>
            <Typography className={classes.header}>Attributes ({attributesCost})</Typography>
            <List>
                {
                    filteredAttributes.map(a => (
                        <ListItem key={a.name}>
                            <Attribute attribute={a} metaType={metaType} onUpdate={onUpdate} />
                        </ListItem>
                    ))
                }
            </List>
        </Fragment>
    );
};

export default AttributeList;