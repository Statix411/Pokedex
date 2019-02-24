import React from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import { computed, observable, toJS } from 'mobx'
import TypesSelect from './TypesSelect'
import pokemonClassPerems from './ClassesPoke'

const Filtering = observer(() => {
  let filt = e => {
    pokemonClassPerems.filter = e.target.value
  }
  return (
    <div>
      <TypesSelect />
      <input
        type='text'
        className='filterbox'
        placeholder='Поиск..'
        value={pokemonClassPerems.filter}
        onChange={filt.bind(this)}
      />
    </div>
  )
})

export default Filtering
