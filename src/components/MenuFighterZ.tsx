import { useState, useEffect } from 'react'
import type { Fighter } from '@/const/Fighter'
import FighterZ from './FighterZ'
import Spinner from './Spinner'

const MenuFighterZ = () => {
  const [fighters, setFighters] = useState<Fighter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dragonball-api.com/api/characters?affiliation=Z Fighter')
      .then((response) => response.json())
      .then((data) => {
        setFighters(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [])

  const leftFighters = fighters.slice(0, Math.ceil(fighters.length / 2))
  const rightFighters = fighters.slice(Math.ceil(fighters.length / 2))

  if (loading) {
    return (
      <Spinner
        label='Cargando personajes...'
        textColor='warning'
        color='danger'
        size='xl'
      />
    )
  }

  return (
    <div className='mt-10 flex flex-col lg:flex-row justify-center items-center gap-8'>
      <div className='mt-12 flex flex-row flex-wrap justify-center items-center lg:grid lg:grid-cols-2 gap-4'>
        {leftFighters.map((fighter) => (
          <FighterZ key={fighter.id} character={fighter} />
        ))}
      </div>

      <div className='flex flex-col items-center justify-center gap-y-4'>
        <a
          id='fighter-preview-link'
          href={`/fighters/${fighters[0]?.id}`}
          className='w-96 h-0 md:h-96 lg:h-[600px] flex flex-col justify-center items-center gap-2 transition-transform duration-300 hover:scale-110'
        >
          <img
            id='fighter-preview'
            style={{ viewTransitionName: 'fighter' } as React.CSSProperties}
            src={fighters[0]?.image}
            alt='Peleador seleccionado'
            className='h-full w-auto object-cover transition-all duration-300'
          />
          <span
            id='fighter-name'
            className='flex text-center text-5xl -skew-6 font-bold text-orange-500 transition-all duration-300 uppercase'
          >
            {fighters[0]?.name}
          </span>
        </a>
      </div>

      <div className='mt-12 flex flex-row flex-wrap justify-center items-center lg:grid lg:grid-cols-2 gap-4'>
        {rightFighters.map((fighter) => (
          <FighterZ key={fighter.id} character={fighter} />
        ))}
      </div>
    </div>
  )
}

export default MenuFighterZ
