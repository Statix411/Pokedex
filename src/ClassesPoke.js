import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { computed, observable, toJS } from 'mobx'

class perems {
  @observable oneName = ''
  @observable arrNames = []
  @observable arrPokemon = []
  @observable arrTypes = []
  @observable arrParseType = []
  @observable arrTest = []
  @observable avatarPoke = ''
  @observable avPer = 1
  @observable taging = 'normal'
  @observable urltag = ''
  @observable filter = ''

  @computed get filtered () {
    var filMatch = new RegExp(this.filter, 'i')
    return toJS(this.arrNames).filter(
      todo => !this.filter || filMatch.test(todo.name)
    )
  }
}

var pokemons = new perems()

export default pokemons
