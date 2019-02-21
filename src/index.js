import './css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, toJS } from "mobx";


class perems {
  @observable oneName = ""
  @observable arrNames = []
  @observable arrPokemon = []
  @observable filter = ""
  @computed get filtered(){
    var filMatch = new RegExp(this.filter, "i")
    return toJS(this.arrNames).filter(todo => !this.filter || filMatch.test(todo.name))
  }
}
let offset = 0;
var obla = new perems




class MainEx extends React.Component{

  render(){

        return (

            <div>
              <Filtering />
              <PokemonsList />
              <PokedexMain />
            </div>
        );
      }
    }


  @observer class Filtering extends React.Component{

    filt(e){

      obla.filter = e.target.value
      console.log(obla.filter)
    }

    render(){
          return (
              <div>
                <input type="text" className="filterbox" placeholder="Поиск.." value={obla.filter} onChange={this.filt.bind(this)} />
              </div>
          );
        }
    }



@observer class PokemonsList extends React.Component{

      constructor(){
        super()
        fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/?offset=0&limit=20`)
         .then((response) => response.json())
         .then((responseJson) => {
           obla.arrNames = responseJson.results.slice()

           console.log(toJS(obla.arrNames))
           return responseJson.name;
         })

         .catch((error) => {
           console.error(error);
         });
      }


      parsepoke = (offset, limit) => {
        fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
         .then((response) => response.json())
         .then((responseJson) => {
           obla.arrNames = responseJson.results.slice()

           console.log(toJS(obla.arrNames))

           return responseJson.name;
         })

         .catch((error) => {
           console.error(error);
         });
      }

      filter(e){
        obla.filter = e.target.value;
        //point_1
      }


      render(){
          var list = toJS(obla.filtered).map( (num) => <li onClick={(e) => {obla.oneName = num.name} } key={num.name}>{num.name}</li> )
            return (

                <div>
                  <Buttons fetchlist={this.parsepoke} />
                  <div id="PokeList">
                    <ul className="ListP">
                      {list}
                    </ul>
                  </div>

                </div>
            );
          }
    }



  class Buttons extends React.Component{

    render(){

          return (
            <div className="buttonsall">
              <ul className="navbuttons">
              <li onClick={(e) => {if(offset > 0) offset-=20; this.props.fetchlist(offset, 20)}}>Prev</li>
              <li onClick={(e) => {offset+=20; this.props.fetchlist(offset, 20)}}>Next</li>
              </ul>
              <ul className="resultsbutt">

                <li onClick={(e) => this.props.fetchlist(0, 10)}>10</li>
                <li onClick={(e) => this.props.fetchlist(0, 20)}>20</li>
                <li onClick={(e) => this.props.fetchlist(0, 50)}>50</li>

              </ul>
              </div>
          );
        }
      }

@observer class PokedexMain extends React.Component{

      componentWillReact() {
        var sty = {
                color: '#ffae00',
                backgroundImage: 'url(src/img/PokedexBack.png)'
            };
        let data = fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/${obla.oneName}`)
           .then((response) => response.json())
           .then((responseJson) => {
              var abilitys = responseJson.abilities.map( (num) => <li key={num.ability.name}>{num.ability.name}</li>)
              var types = responseJson.types.map( (num) => <li key={num.type.name}>{num.type.name}</li>)

               ReactDOM.render(
                 <div className="PokedexBack" style={sty}>
                   <div className="Super">
                      <div className="PokeName">Name: {responseJson.name}</div>
                      <div className="PokeHeight">Height: {responseJson.height}</div>
                      <div className="PokeWeight">Weight: {responseJson.weight}</div>
                      <div className="Avapos"><img src={responseJson.sprites.front_default} alt=" " height="100" /></div>
                      <div className="TextA">Abilities: </div>
                        <ul className="abilitie">
                          {abilitys}
                        </ul>
                      <div className="Types">Types: </div>
                        <ul className="typesul">
                          {types}
                        </ul>
                  </div>
                </div>, document.getElementById("PokedexMain"));

                console.log(responseJson);


             return responseJson.name;
           })

           .catch((error) => {
             console.error(error);
           });

      }

      render(){
        obla.oneName;
            return (
              <div>
              </div>
            );
      }
    }


ReactDOM.render(<div>
                      <MainEx/>
                  </div>, document.getElementById("root"));
