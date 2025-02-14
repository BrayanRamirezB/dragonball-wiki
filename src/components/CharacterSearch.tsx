import { useState, useEffect } from 'react'
import type { Fighter } from '@/const/Fighter'
import Character from '@/components/Character'
import Spinner from './Spinner'
import Input from './Input'

const CharacterSearch = () => {
  const [search, setSearch] = useState('')
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

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='pt-14 flex flex-col justify-center items-center gap-y-14'>
      <div className='flex flex-col justify-center items-center text-center gap-y-4'>
        <form onSubmit={(e) => e.preventDefault()} className='w-full max-w-md'>
          <Input
            type='text'
            placeholder='Buscar personaje...'
            value={search}
            onValueChange={(value) => setSearch(value)}
            color='danger'
            variant='default'
            size='lg'
            isClearable
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
