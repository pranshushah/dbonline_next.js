import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Styles from './Tooltip.module.scss';
import '../../../utils/Types';

/**
 * @param {{
 * children,
 * dataObj:foreignKeyObj,
 * mainTableDetails:mainTableDetailsType[],
 * givenTable:mainTableDetailsType
}} props
  */
function ToolTip({ dataObj, mainTableDetails, givenTable, children }) {
	if (givenTable) {
		const [showTooltip, setShowTooltip] = useState(false);
		const [xcord, setXcord] = useState(null);
		const [ycord, setYcord] = useState(null);

		let el;
		el = document.querySelector('.tooltip-rc');
		if (!el) {
			el = document.createElement('div');
			el.className = 'tooltip-rc';
			document.body.appendChild(el);
		}

		function showTooltipHandler(e) {
			setShowTooltip(true);
			setXcord(e.pageX);
			setYcord(e.pageY);
		}
		function hideTooltipHandler() {
			setShowTooltip(false);
			setXcord(null);
			setYcord(null);
		}

		const data = (
			<span key={0} onMouseMove={showTooltipHandler} onMouseLeave={hideTooltipHandler}>
				{children}
			</span>
		);

		const referencedAttIndex = givenTable.attributes.findIndex(
			(attrObj) => attrObj.id === dataObj.referencedAtt,
		);
		const referencedAttText = givenTable.attributes[referencedAttIndex].name;
		const tableIndex = mainTableDetails.findIndex(
			(table) => table.id === dataObj.ReferencingTable,
		);
		const referencingAttIndex = mainTableDetails[tableIndex].attributes.findIndex(
			(attrObj) => attrObj.id === dataObj.ReferencingAtt,
		);
		const referencingAttText =
			mainTableDetails[tableIndex].attributes[referencingAttIndex].name;
		function portalHandler() {
			if (showTooltip && el && xcord && ycord) {
				return createPortal(
					<div
						style={{
							position: 'absolute',
							left: xcord,
							top: ycord - 80,
						}}
					>
						<div className={Styles.tooltipContainer}>
							<div>
								<div className={Styles.text}>
									referenced attribute : {referencedAttText}
								</div>
								<div className={Styles.text}>
									referencing attribute : {referencingAttText}
								</div>
							</div>
							<span className={Styles.arrow} />
						</div>
					</div>,
					el,
				);
			} else {
				return <div></div>;
			}
		}
		return (
			<>
				{data}
				{portalHandler()}
			</>
		);
	} else {
		return <>{children}</>;
	}
}

export default ToolTip;
