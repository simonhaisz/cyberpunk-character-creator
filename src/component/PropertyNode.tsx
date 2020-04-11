import React, { FC, Fragment } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isArray } from "util";
import { sentenceCase } from "change-case";
import { CustomItem } from "../model/custom-item";
import PropertyLeafNode from "./PropertyLeafNode";

const fontWeights = [700, 600, 500, 400, 300, 200, 100];

type Props = {
	rootCost?: number;
	parentPath: string;
	name: string;
	value: any;
	all: any;
	onValueUpdated: (updatedValue: any) => void;
};
const PropertyNode: FC<Props> = (props: Props) => {
	const { rootCost = -1, parentPath, name, value, all, onValueUpdated } = props;
	
	const label = sentenceCase(name);
	const fontWeight = fontWeights[parentPath.split(".").length - 1];

	if (isArray(value)) {
		// leaf-node
		const breadcrums = getBreadcrums(parentPath, name);
		const names = value as string[];
		const allValues = all as CustomItem[];
		const onNamesUpdated = (updatedNames: string[]) => {
			onValueUpdated(updatedNames);
		};

		return (
			<PropertyLeafNode
				fontWeight={fontWeight-100}
				breadcrums={breadcrums}
				names={names}
				allValues={allValues}
				onNamesUpdated={onNamesUpdated}
			/>
		)
	} else {
		const isRoot = parentPath.split(".").length === 1;
		// branch-node
		const children: JSX.Element[] = [];
		for (const childName of Object.keys(all)) {
			const childAll = all[childName];
			const childPath = `${parentPath}.${childName}`;
			// set the empty value early rather than passing down undefined
			const defaultValue = isArray(childAll) ? [] : {};
			// looping through all's properties, may not exist in value
			const childValue = value[childName] || defaultValue;
			
			const onChildValueUpdated = (updatedChildValue: any) => {
				const updatedValue = { ...value };
				updatedValue[childName] = updatedChildValue;
				onValueUpdated(updatedValue);
			};
			children.push(
				<PropertyNode
					key={childName}
					parentPath={childPath}
					name={childName}
					value={childValue}
					all={childAll}
					onValueUpdated={onChildValueUpdated}
				/>
			);
		}
		return (
			<Fragment>
				<ExpansionPanel defaultExpanded={true}>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
						<Typography style={{fontWeight}}>{label}{ isRoot ? (` (${rootCost})`) : null}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div>{ children }</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</Fragment>
		)
	}
};

export default PropertyNode;

function getBreadcrums(parentPath: string, name: string): string[] {
	const breadcrums: string[] = [];
	// parentPath uses camelCase (because its JSON)
	// breadcrums use sentenceCase (because its to be shown to users)
	for (const name of parentPath.split(".")) {
		breadcrums.push(sentenceCase(name));
	}
	breadcrums.push(sentenceCase(name));
	return breadcrums;
}