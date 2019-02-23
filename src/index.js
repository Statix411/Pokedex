import React from 'react';
import ReactDOM from 'react-dom';
import Filtering from './Filtering';
import PokemonsList from './PokemonsList';
import PokedexMain from './PokedexMain';
import './importCss'



function MainEx(){
      return (
          <div>
            <Filtering />
            <PokemonsList />
            <PokedexMain />
          </div>
      );
}

ReactDOM.render(<div>
                      <MainEx/>
                  </div>, document.getElementById("root"));
