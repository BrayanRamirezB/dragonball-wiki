import React, { useMemo } from 'react'
import { type Fighter } from '@/const/Fighter'
import { getPreviousFighter, getNextFighter } from '@/const/SpecialClases'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import FighterLink from './FighterLink'

interface FighterCardProps {
  fighter: Fighter
}

const FighterCard: React.FC<FighterCardProps> = ({ fighter }) => {
  const previousFighter = useMemo(
    () => getPreviousFighter(fighter.id),
    [fighter.id]
  )
  const nextFighter = useMemo(() => getNextFighter(fighter.id), [fighter.id])

  return (
    <section className='flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-row justify-center items-center'>
        <FighterLink
          id={previousFighter}
          className='md:translate-x-10 lg:translate-x-40 md:-rotate-8'
          hoverTranslate='md:hover:-translate-y-10 md:hover:translate-x-10 lg:hover:translate-x-25'
        />

        <article className='z-1 w-full sm:w-[300px] md:w-[350px]'>
          <Card shadow='md' rounded='lg' color='default'>
            <CardContent textSize='sm'>
              <h3 className='text-xl font-bold text-center pb-2'>
                {fighter.name}
              </h3>
              <div className='flex items-center justify-center bg-neutral-700/40 p-2'>
                <img
                  style={
                    { viewTransitionName: 'fighter' } as React.CSSProperties
                  }
                  src={fighter.image}
                  alt={fighter.name}
                  className='h-80 object-cover'
                />
              </div>
              <div className='flex flex-col items-center justify-center gap-y-2 text-center'>
                <span className='text-center text-neutral-100/80 font-bold'>
                  {fighter.ki}
                </span>
                <span className='text-center text-neutral-100/80 font-bold'>
                  {fighter.affiliation}
                </span>
                <span className='text-center text-neutral-100/80 font-bold'>
                  {fighter.race}
                </span>
                <span className='text-center text-neutral-100/80 font-bold'>
                  {fighter.gender}
                </span>
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

      <div className='text-gray-300 text-pretty text-center max-w-md lg:max-w-2xl'>
        {fighter.description}
      </div>
    </section>
  )
}

export default FighterCard
