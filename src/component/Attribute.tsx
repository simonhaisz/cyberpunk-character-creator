import React, { FC } from "react";

import { Attribute as AttributeData, MetaType } from "../model/character";
import { getAttributeModifier, getAttributeCost } from "../model/attributes";
import Property from "./Property";

type Props = {
    attribute: AttributeData;
    metaType: MetaType;
    onUpdate: (attribute: AttributeData) => void;
};

const Attribute: FC<Props> = (props: Props) => {
    const { attribute, metaType, onUpdate } = props;
    const modifier = getAttributeModifier(metaType, attribute);

    const formatDisplayValue = (rating: number): string => (rating + modifier).toString();

    return (
        <Property property={attribute}
        onUpdate={onUpdate}
        min={1}
        max={7}
        step={1}
        formatDisplayValue={formatDisplayValue}
        computeCost={getAttributeCost}
        />
    );
};

export default Attribute;