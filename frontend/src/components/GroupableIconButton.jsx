// @ts-check

import { Button, styled } from "@mui/material";

const GroupableIconButton = styled(Button)({
    p: 0,
    minWidth: 0,
    maxWidth: 0,
    '& > span': {
        margin: 0,
    }
});

export default GroupableIconButton;
