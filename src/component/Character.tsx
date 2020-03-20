import React, { FC } from "react";
import Core from "./Core";
import styled from "styled-components";
import Attributes from "./Attributes";
import ActiveSkills from "./ActiveSkills";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
`;

const Character: FC = () => {
    return (
        <Root>
            <Core />
            <Attributes />
            <ActiveSkills />
        </Root>
    );
};

export default Character;