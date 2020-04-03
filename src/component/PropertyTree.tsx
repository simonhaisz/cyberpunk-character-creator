import React, { FC, Fragment } from "react";
import PropertyNode from "./PropertyNode";

type Props = {
	rootCost: number;
	rootName: string;
	rootValue: any;
	rootAll: any;
	onRootUpdated: (updatedRootValue: any) => void;
};
const PropertyTree: FC<Props> = (props: Props) => {
	const { rootCost, rootName, rootValue, rootAll, onRootUpdated } = props;
	return (
		<Fragment>
			<PropertyNode
				rootCost={rootCost}
				parentPath={rootName}
				name={rootName}
				value={rootValue}
				all={rootAll}
				onValueUpdated={onRootUpdated}
			/>
		</Fragment>
	);
};

export default PropertyTree;