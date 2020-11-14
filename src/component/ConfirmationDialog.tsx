import React, { FC } from "react";
import { Dialog, DialogContent, DialogActions, DialogContentText, Button } from "@material-ui/core";

type Props = {
	open: boolean;
	onChoice: (accept: boolean) => void;
	content: string;
};
const ConfirmationDialog: FC<Props> = (props: Props) => {
	const { open, onChoice, content } = props;

	const handleYes = () => {
		onChoice(true);
	};

	const handleNo = () => {
		onChoice(false);
	};
	return (
		<Dialog
			open={open}
			onClose={handleNo}
		>
			<DialogContent>
				<DialogContentText>
					{content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleYes}
					color="secondary"
					variant="outlined"
				>
					Yes
				</Button>
				<Button
					onClick={handleNo}
					color="secondary"
					variant="outlined"
					autoFocus
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;