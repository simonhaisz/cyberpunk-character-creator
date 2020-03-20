import React, { FC } from "react";
import { CoreCharacterComponent } from "./CoreCharacterComponent";
import styled from "styled-components";
import { AttributesComponent } from "./AttributesComponent";
import { SkillsComponents } from "./SkillsComponents";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`;

export const CharacterComponent: FC = () => {
    return (
        <Root>
            <CoreCharacterComponent />
            <AttributesComponent />
            <SkillsComponents />
        </Root>
    );
};