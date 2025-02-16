import React, { useMemo } from 'react'
import { type Fighter } from '@/const/Fighter'
import { getPreviousFighter, getNextFighter } from '@/const/SpecialClases'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import FighterLink from './FighterLink'
import Radar from './Radar'

interface FighterCardProps {
  fighter: Fighter
}

const FighterCard: React.FC<FighterCardProps> = ({ fighter }) => {
  const previousFighter = useMemo(
    () => getPreviousFighter(fighter.id),
    [fighter.id]
  )
  const nextFighter = useMemo(() => getNextFighter(fighter.id), [fighter.id])

  const gradientBackground: { [key: string]: string } = {
    Human: 'bg-gradient-to-r from-blue-300/40 to-blue-600/40',
    Saiyan: 'bg-gradient-to-r from-yellow-400/40 to-red-600/40',
    Namekian: 'bg-gradient-to-r from-green-500/40 to-green-900/40',
    Majin: 'bg-gradient-to-r from-pink-400/40 to-purple-600/40',
    'Frieza Race': 'bg-gradient-to-r from-gray-300/40 to-purple-700/40',
    Android: 'bg-gradient-to-r from-gray-600/40 to-green-500/40',
    'Jiren Race': 'bg-gradient-to-r from-red-500/40 to-gray-900/40',
    God: 'bg-gradient-to-r from-yellow-500/40 to-orange-700/40',
    Angel: 'bg-gradient-to-r from-cyan-300/40 to-blue-600/40',
    Evil: 'bg-gradient-to-r from-black/40 to-red-700/40',
    Nucleico: 'bg-gradient-to-r from-purple-700/40 to-indigo-900/40',
    'Nucleico benigno': 'bg-gradient-to-r from-indigo-300/40 to-blue-600/40',
    Unknow: 'bg-gradient-to-r from-gray-500/40 to-gray-800/40'
  }

  return (
    <section className='flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-row justify-center items-center'>
        <FighterLink
          id={previousFighter}
          className='md:translate-x-10 lg:translate-x-40 md:-rotate-8'
          hoverTranslate='md:hover:-translate-y-10 md:hover:translate-x-10 lg:hover:translate-x-25'
        />

        <article className='z-1 w-[280px] sm:w-[300px] md:w-[350px]'>
          <Card shadow='md' rounded='lg' color='default'>
            <CardContent textSize='sm'>
              <div className='pb-2 flex flex-row items-center justify-start gap-x-12 w-full'>
                <Radar />
                <h2 className='text-2xl font-bold text-center text-neutral-100'>
                  {fighter.name}
                </h2>
              </div>
              <div
                className={`flex items-center justify-center ${
                  gradientBackground[fighter.race]
                } backdrop-blur-lg p-2 rounded-lg`}
              >
                <img
                  style={
                    { viewTransitionName: 'fighter' } as React.CSSProperties
                  }
                  src={fighter.image}
                  alt={fighter.name}
                  className='h-80 object-cover'
                />
              </div>
              <div className='flex flex-row items-center justify-between gap-x-2 mt-4 text-neutral-100/80 bg-zinc-700/40 backdrop-blur-md rounded-md rounded-b-4xl  py-2 px-3 font-semibold min-h-16'>
                <div className='flex flex-col gap-y-1 justify-center'>
                  <h3 className='uppercase'>Ki:</h3>
                  <span className='text-xl text-pretty text-center'>
                    {fighter.ki}
                  </span>
                </div>
                <div className='flex flex-col gap-y-1 justify-center items-start'>
                  <span className=''>Afiliación: {fighter.affiliation}</span>
                  <span className=''>Raza: {fighter.race}</span>
                  <span className=''>Género: {fighter.gender}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        <FighterLink
          id={nextFighter}
          className='md:-translate-x-10 lg:-translate-x-40 md:rotate-8'
          hoverTranslate='md:hover:-translate-y-10 md:hover:-translate-x-10 lg:hover:-translate-x-25'
        />
      </div>

      <div className='text-neutral-100/80 text-pretty text-center max-w-md lg:max-w-2xl'>
        {fighter.description}
      </div>
    </section>
  )
}

export default FighterCard
