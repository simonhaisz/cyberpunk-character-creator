import React, { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";

type Props = {
	filename: string;
	generateData: () => string;
};
const ExportButton: FC<Props> = (props: Props) => {
	const { filename, generateData } = props;

	const handleClick = () => {
		const data = generateData();
		const element = document.createElement('a');
		element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', filename);
	
		element.style.display = 'none';
		document.body.appendChild(element);
	
		element.click();
	
		document.body.removeChild(element);
	};
	return (
		<Tooltip title="Export Character">
			<IconButton
				onClick={handleClick}
				color="secondary"
			>
				<GetAppIcon />
			</IconButton>
		</Tooltip>
	);
};

export default ExportButton;