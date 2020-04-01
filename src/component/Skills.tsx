import React, { FC, Fragment } from "react";
import ActiveSkills from "./ActiveSkills";
import KnowledgeSkills from "./KnowledgeSkills";

const Skills: FC = () => {
    return (
        <Fragment>
            <ActiveSkills />
            <KnowledgeSkills />
        </Fragment>
    )
};

export default Skills;