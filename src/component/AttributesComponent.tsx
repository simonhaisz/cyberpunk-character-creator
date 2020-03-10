import React, { FC } from "react";
import { useDispatch, useGlobalState } from "../context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import { AttributeComponent } from "./AttributeComponent";
import { Attribute } from "../model/character";
import { ActionType } from "../reducer";

export const AttributesComponent: FC = () => {
    const dispatch = useDispatch();
    const character = useGlobalState("character");
    const { attributes } = character;

    const onUpdate = (attribute: Attribute) => {
        const newAttributes = [ ...attributes ];
        const attributeIndex = newAttributes.findIndex(a => a.name === attribute.name);
        newAttributes[attributeIndex] = attribute;
        dispatch({
            type: ActionType.UpdateCharacter,
            data: { ...character, attributes: newAttributes }
        });
    };
    return (
        <List subheader={<ListSubheader>Attributes</ListSubheader>}>
            {
                attributes.map(a => (
                    <ListItem>
                        <AttributeComponent attribute={a} onUpdate={onUpdate} />
                    </ListItem>
                ))
            }
        </List>
    );
};