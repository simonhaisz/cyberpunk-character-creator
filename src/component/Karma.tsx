import React, { FC, Fragment } from "react";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import styled from "styled-components";
import { useGlobalState } from "../context";

const StyledBadge = styled(Badge)`
    margin-left: 50px;
`;

const Karma: FC = () => {
    const karma = useGlobalState("karma");
    const { total, spent, available } = karma;
    return (
        <Fragment>
            <StyledBadge badgeContent={total} color="primary" max={1000} showZero>
                <ShoppingCartIcon />
            </StyledBadge>
            <StyledBadge badgeContent={spent} color="error" max={1000} showZero>
                <ShoppingCartIcon />
            </StyledBadge>
            <StyledBadge badgeContent={available} color="secondary" max={1000} showZero>
                <ShoppingCartIcon />
            </StyledBadge>
        </Fragment>
    );
};

export default Karma;