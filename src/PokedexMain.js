import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, toJS } from "mobx";
import ChageImageAv from './ChangeImageAvatar';
import pokemonClassPerems from './ClassesPoke'


const PokedexMain = observer(() => {

      let sty = {
            color: '#ffae00',
            backgroundImage: 'url(src/img/PokedexBack.png)'
        };

      if(pokemonClassPerems.oneName){
      let data = fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/${pokemonClassPerems.oneName}`)
        .then((response) => response.json())
        .then((responseJson) => {

          let abilitys = responseJson.abilities.map( (num) => <li key={num.ability.name}>{num.ability.name}</li>)
          let types = responseJson.types.map( (num) => <li key={num.type.name}>{num.type.name}</li>)

          ReactDOM.render(
           <div className="PokedexBack" style={sty}>
             <div className="Super">
                <div className="PokeName">Name: {responseJson.name}</div>
                <div className="PokeHeight">Height: {responseJson.height}</div>
                <div className="PokeWeight">Weight: {responseJson.weight}</div>

                <ChageImageAv src={responseJson.sprites}/>

                <div className="TextA">Abilities: </div>
                  <ul className="abilitie">
                    {abilitys}
                  </ul>
                <div className="Types">Types: </div>
                  <ul className="typesul">
                    {types}
                  </ul>
            </div>
            <div className="PokedexButton1" onClick={(e) =>  {pokemonClassPerems.avPer = 1; <ChageImageAv src={responseJson.sprites} />; } }>Front</div>
            <div className="PokedexButton2" onClick={(e) =>  {pokemonClassPerems.avPer = 2; <ChageImageAv src={responseJson.sprites} />; } }>Back</div>
          </div>, document.getElementById("PokedexMain"));
        })
        .catch((error) => {
          console.error(error);
        });
      }


     return (<div></div>);
})


export default PokedexMain
