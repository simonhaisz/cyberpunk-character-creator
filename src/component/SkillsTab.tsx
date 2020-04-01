import React, { FC, Fragment } from "react";
import ActiveSkillList from "./ActiveSkillList";
import KnowledgeSkillList from "./KnowledgeSkillList";
import LanguageSkillList from "./LanguageSkillList";

const SkillsTab: FC = () => {
    return (
        <Fragment>
            <ActiveSkillList />
            <KnowledgeSkillList />
            <LanguageSkillList />
        </Fragment>
    )
};

export default SkillsTab;