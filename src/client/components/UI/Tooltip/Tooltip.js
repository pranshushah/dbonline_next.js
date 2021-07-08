import React from 'react';
import Styles from './Tooltip.module.scss';
import '../../../utils/Types';

/**
 * @param {{
 * x:number,
 * y:number,
 * dataObj:foreignKeyObj,
 * mainTableDetails:mainTableDetailsType[],
 * givenTable:mainTableDetailsType
}} props
  */
function ToolTip({ x, y, dataObj, mainTableDetails, givenTable }) {
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
  return (
    <div className={Styles.Tooltip} style={{ left: x - 75, top: y - 90 }}>
      <div className={Styles.rel}>
        <div className={Styles.text}>
          referenced attribute : {referencedAttText}
        </div>
        <div className={Styles.text}>
          referencing attribute : {referencingAttText}
        </div>
      </div>
    </div>
  );
}

export default ToolTip;
