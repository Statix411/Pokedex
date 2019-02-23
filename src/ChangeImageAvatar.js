import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, toJS } from "mobx";
import pokemonClassPerems from './ClassesPoke'




const ChangeImage = observer((props) => {
  return (
    <div className="Avapos" id="changable">
    {pokemonClassPerems.avPer == 1 &&
      <img src={props.src.front_default} alt="" />
    }
      {pokemonClassPerems.avPer == 2 &&
        <img src={props.src.back_default} alt="" />
      }
    </div>
  )
})


export default ChangeImage
