import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, toJS } from "mobx";


var offset = 0;

export default function Buttons(props){

    return (
      <div className="buttonsall">
        <ul className="navbuttons">
          <li onClick={(e) => {if(offset > 0) offset-=20; props.fetchlist(offset, 20)}}>Prev</li>
          <li onClick={(e) => {offset+=20; props.fetchlist(offset, 20)}}>Next</li>
        </ul>
        <ul className="resultsbutt">
          <li onClick={(e) => props.fetchlist(0, 10)}>10</li>
          <li onClick={(e) => props.fetchlist(0, 20)}>20</li>
          <li onClick={(e) => props.fetchlist(0, 50)}>50</li>
        </ul>
        </div>
    );
}
