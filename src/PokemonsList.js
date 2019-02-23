import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, toJS } from "mobx";
import Buttons from './Buttons';
import pokemonClassPerems from './ClassesPoke'

let initial = 1

const PokemonList = observer(() => {

  if(initial == 1){
    fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/?offset=0&limit=20`)
     .then((response) => response.json())
     .then((responseJson) => {
       pokemonClassPerems.arrNames = responseJson.results.slice()

       //return responseJson;
     })
     .catch((error) => {
       console.error(error);
     });
     initial = 0;
   }

    var parsepoke = (offset, limit) =>{
      fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
       .then((response) => response.json())
       .then((responseJson) => {
         pokemonClassPerems.arrNames = responseJson.results.slice()

         return responseJson.name;
       })
       .catch((error) => {
         console.error(error);
       });
    }

    var filter = (e) => {
      pokemonClassPerems.filter = e.target.value;
    }

    var list = toJS(pokemonClassPerems.filtered).map( (num) => <li onClick={(e) => {pokemonClassPerems.oneName = num.name} } key={num.name}>{num.name}</li> )
    return (

        <div>
          <Buttons fetchlist={parsepoke} />
          <div id="PokeList">
            <ul className="ListP">
              {list}
            </ul>
          </div>

        </div>
    );
})

export default PokemonList
