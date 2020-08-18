import React from 'react';
import styled from 'styled-components';
/**
 * @typedef{ import('react').HTMLProps<HTMLAnchorElement>} anchorProps */

const TableCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s;
  margin: 10px;
  position: absolute;
  &:hover {
    box-shadow: 0 0px 24px 8px rgba(0, 0, 0, 0.2);
  }
  z-index: 11;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const TableHeader = styled.h3`
  color: rgb(230, 230, 230);
  width: 100%;
  background: ${(props) => props.bgColor};
  text-align: left;
  padding: 2px;
  padding-left: 8px;
  letter-spacing: 0.5px;
  height: 15%;
  font-size: 1rem;
  &:hover {
    cursor: grab;
  }
`;

const TableContentContainer = styled.div`
  background-color: rgb(42, 47, 50);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 0 3px 0;
`;

const AttributeLink = styled.a`
  text-decoration: none;
  text-align: center;
  padding-bottom: 5px;
  /* color: ${(props) => props.fontColor}; */
  color:rgb(220, 220, 220);
  font-weight:600;
  cursor: pointer;
  transition:0.1s all ease;
  &:hover{
    opacity:0.8;  
  }
`;

/**
 * @param {{tableDndDetail:Object} & anchorProps} props*/

function AddAttributeLink({ onClick, tableDndDetail, children, ...props }) {
  function linkClickHandler() {
    onClick(tableDndDetail);
  }
  return (
    <AttributeLink {...props} onClick={linkClickHandler}>
      {children}
    </AttributeLink>
  );
}

export { TableCard, TableHeader, TableContentContainer, AddAttributeLink };
