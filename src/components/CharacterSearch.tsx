import { useState, useEffect } from 'react'
import type { Fighter } from '@/const/Fighter'
import Character from '@/components/Character'
import Spinner from './Spinner'
import Input from './Input'
import Select from '@/components/Select'

const CharacterSearch = () => {
  const [search, setSearch] = useState('')
  const [raceFilter, setRaceFilter] = useState('')
  const [affiliationFilter, setAffiliationFilter] = useState('')
  const [characters, setCharacters] = useState<Fighter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?limit=58')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.items)
        setLoading(false)
      })
  }, [])

  const uniqueRaces = Array.from(
    new Set(characters.map((char) => char.race).filter(Boolean))
  )
  const uniqueAffiliations = Array.from(
    new Set(characters.map((char) => char.affiliation).filter(Boolean))
  )

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(search.toLowerCase()) &&
      (raceFilter ? character.race === raceFilter : true) &&
      (affiliationFilter ? character.affiliation === affiliationFilter : true)
  )

  return (
    <div className='pt-14 flex flex-col justify-center items-center gap-y-14'>
      <div className='flex flex-col justify-center items-center text-center gap-y-4'>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='flex flex-col md:flex-row items-center justify-between w-full gap-4'
        >
          <Select
            options={uniqueRaces}
            value={raceFilter}
            onChange={setRaceFilter}
            placeholder='Todas las razas'
          />

          <Input
            type='text'
            placeholder='Buscar personaje...'
            value={search}
            onValueChange={(value) => setSearch(value)}
            color='default'
            variant='default'
            size='lg'
            isClearable
          />

          <Select
            options={uniqueAffiliations}
            value={affiliationFilter}
            onChange={setAffiliationFilter}
            placeholder='Todas las afiliaciones'
          />
        </form>
      </div>

      {loading ? (
        <Spinner
          label='Cargando personajes...'
          textColor='warning'
          color='danger'
          size='xl'
        />
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-8 gap-y-14 px-4 md:px-16'>
          {filteredCharacters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CharacterSearch
