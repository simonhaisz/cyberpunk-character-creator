import React, { Fragment, FC, ChangeEvent } from "react";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import Tooltip from "@material-ui/core/Tooltip";

type Props = {
	saveData: (data: string) => void;
};
const ImportButton: FC<Props> = (props: Props) =>{
	const { saveData } = props;

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files || files.length === 0) {
			console.log(`No files selected`);
			return;
		}
		const file = files[0];
		const reader = new FileReader();
		reader.onload = e => {
			if (!e.target) {
				throw new Error(`Failed to load data from file '${file.name}'`);
			}
			const data = e.target.result;
			if (!data) {
				throw new Error(`File '${file.name}' has no data`);
			}
			saveData(data as string);
		};
		reader.readAsText(file);
	};

	return (
		<Fragment>
			<input
				accept="application/json"
				hidden
				id="import-file"
				type="file"
				onChange={handleFileChange}
			/>
			<label htmlFor="import-file">
				<Tooltip title="Import Character">
					<IconButton
						color="secondary"
						component="span"
					>
						<PublishIcon />
					</IconButton>
				</Tooltip>
			</label> 
		</Fragment>
	);
};

export default ImportButton;