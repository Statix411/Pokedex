import './css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import { computed, observable, toJS } from "mobx";


class perems {
  @observable oneName = ""
  @observable arrNames = []
  @observable arrPokemon = []
  @observable arrTypes = []
  @observable arrParseType = []
  @observable arrTest = []
  @observable avatarPoke = ""
  @observable avPer = 1
  @observable taging = "normal"
  @observable urltag = ""
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
    }

    render(){
          return (
              <div>
              <TypesSelect />
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
           //return responseJson.name;
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




@observer class TypesSelect extends React.Component{

      constructor(){
        super()
         /*Parse Types*/

         fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/type`)
          .then((response) => response.json())
          .then((responseJson) => {

            obla.arrTypes = responseJson.results
            return responseJson;
          })

          .catch((error) => {
            console.error(error);
          });


      }

      addtag = (e) => {

        obla.taging = e.target.value
        obla.urltag = e.target.value
        if(obla.urltag != 0){

          fetch(`${obla.urltag}`)
           .then((response) => response.json())
           .then((responseJson) => {

             obla.arrParseType = responseJson.pokemon.slice()
             obla.arrTest = []
             toJS(obla.arrParseType).map(poke => obla.arrTest.push(poke.pokemon))

             obla.arrNames = obla.arrTest;
           return responseJson;
         })

         .catch((error) => {
           console.error(error);
         });
       }
        e.preventDefault();
      }



        render() {

          if(obla.arrTypes.length != 0)
            var types = toJS(obla.arrTypes).map((option, idx) => <option value={option.url} key={idx}>{option.name}</option>)

          return (

              <select className="selectable" onChange={this.addtag}>
                <option value={0}>Type</option>
                {types}
              </select>
          )
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
        var art = 0;
        let data = fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/pokemon/${obla.oneName}`)
           .then((response) => response.json())
           .then((responseJson) => {
              var abilitys = responseJson.abilities.map( (num) => <li key={num.ability.name}>{num.ability.name}</li>)
              var types = responseJson.types.map( (num) => <li key={num.type.name}>{num.type.name}</li>)
              if(obla.avPer == 1 || obla.avPer == 0) obla.avatarPoke = responseJson.sprites.front_default
              if(obla.avPer == 2) obla.avatarPoke = responseJson.sprites.back_default

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
                  <div className="PokedexButton1" onClick={(e) =>  {<ChageImageAv num={2} />; obla.avPer = 1} }>Front</div>
                  <div className="PokedexButton2" onClick={(e) =>  {<ChageImageAv num={1} />; obla.avPer = 2} }>Back</div>
                </div>, document.getElementById("PokedexMain"));

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


  @observer class ChageImageAv extends React.Component{
      render(){
        return (
          <div className="Avapos" id="changable">
          {obla.avPer == 1 &&
            <img src={this.props.src.front_default} alt="" />
          }
          {obla.avPer == 2 &&
            <img src={this.props.src.back_default} alt="" />
          }
          </div>
        )
      }
    }


ReactDOM.render(<div>
                      <MainEx/>
                  </div>, document.getElementById("root"));
