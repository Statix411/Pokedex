import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { computed, observable, toJS } from 'mobx'
import pokemonClassPerems from './ClassesPoke'

let initial = 1

const TypeSelect = observer(() => {
  if (initial == 1) {
    fetch(`https://pokeapi-215911.firebaseapp.com/api/v2/type`)
      .then(response => response.json())
      .then(responseJson => {
        pokemonClassPerems.arrTypes = responseJson.results
        return responseJson
      })
      .catch(error => {
        console.error(error)
      })
    initial = 0
  }

  var addtag = e => {
    pokemonClassPerems.taging = e.target.value
    pokemonClassPerems.urltag = e.target.value
    if (pokemonClassPerems.urltag != 0) {
      fetch(`${pokemonClassPerems.urltag}`)
        .then(response => response.json())
        .then(responseJson => {
          pokemonClassPerems.arrParseType = responseJson.pokemon.slice()
          pokemonClassPerems.arrTest = []
          toJS(pokemonClassPerems.arrParseType).map(poke =>
            pokemonClassPerems.arrTest.push(poke.pokemon)
          )

          pokemonClassPerems.arrNames = pokemonClassPerems.arrTest
          return responseJson
        })
        .catch(error => {
          console.error(error)
        })
    }
    e.preventDefault()
  }

  if (pokemonClassPerems.arrTypes.length != 0)
    var types = toJS(pokemonClassPerems.arrTypes).map((option, idx) => (
      <option value={option.url} key={idx}>
        {option.name}
      </option>
    ))

  return (
    <select className='selectable' onChange={addtag}>
      <option value={0}>Type</option>
      {types}
    </select>
  )
})

export default TypeSelect
