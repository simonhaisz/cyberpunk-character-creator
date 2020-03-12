import React, { FC } from "react";

import { Attribute, MetaType } from "../model/character";
import { getAttributeModifier, getAttributeCost } from "../model/attributes";
import { PropertyComponent } from "./PropertyComponent";

type Props = {
    attribute: Attribute;
    metaType: MetaType;
    onUpdate: (attribute: Attribute) => void;
};

export const AttributeComponent: FC<Props> = (props: Props) => {
    const { attribute, metaType, onUpdate } = props;
    const modifier = getAttributeModifier(metaType, attribute);

    const formatDisplayValue = (rating: number): string => (rating + modifier).toString();

    return (
        <PropertyComponent property={attribute} onUpdate={onUpdate} min={1} max={7} step={1} formatDisplayValue={formatDisplayValue} computeCost={getAttributeCost} />
    );
};