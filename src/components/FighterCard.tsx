import React, { useMemo } from 'react'
import { type Fighter, type Transformation } from '@/const/Fighter'
import { getPreviousFighter, getNextFighter } from '@/const/SpecialClases'
import Card from '@/components/Card'
import CardContent from '@/components/CardContent'
import FighterLink from '@/components/FighterLink'
import Radar from '@/components/Radar'
import ButtonGroup from '@/components/ButtonGroup'
import SwipeEffect from '@/components/SwipeEffect'
import Alert from '@/components/Alert'

interface FighterCardProps {
  fighter: Fighter
}

const FighterCard: React.FC<FighterCardProps> = ({ fighter }) => {
  const previousFighter = useMemo(
    () => getPreviousFighter(fighter.id),
    [fighter.id]
  )
  const nextFighter = useMemo(() => getNextFighter(fighter.id), [fighter.id])

  // Función para manejar la transformación
  const handleTransformation = (transformation: Transformation) => {
    const cardFighterImage = document.getElementById(
      'card-fighter-image'
    ) as HTMLImageElement | null
    const cardNameElement = document.getElementById(
      'card-fighter-name'
    ) as HTMLElement | null
    const cardKiElement = document.getElementById(
      'card-fighter-ki'
    ) as HTMLElement | null

    if (cardFighterImage && cardNameElement && cardKiElement) {
      cardFighterImage.src = transformation.image
      cardNameElement.innerText = transformation.name
      cardKiElement.innerText = transformation.ki
    }
  }

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

  const baseTransformation = {
    id: fighter.id,
    name: fighter.name,
    image: fighter.image,
    ki: fighter.ki,
    deletedAt: null
  }

  const buttons = [
    {
      label: fighter.name,
      onClick: () => handleTransformation(baseTransformation)
    }
  ].concat(
    fighter.transformations.map((transformation) => ({
      label: transformation.name,
      onClick: () => handleTransformation(transformation) // Pasar una función anónima
    }))
  )

  return (
    <section className='flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-row justify-center items-center'>
        <FighterLink
          id={previousFighter}
          className='md:translate-x-10 lg:translate-x-40 md:-rotate-8'
          hoverTranslate='md:hover:-translate-y-10 md:hover:translate-x-10 lg:hover:translate-x-25'
        />

        <article className='z-1 w-[280px] sm:w-[300px] md:w-[350px] select-none'>
          <SwipeEffect
            leftPageUrl={`/fighters/${nextFighter}`}
            rightPageUrl={`/fighters/${previousFighter}`}
          >
            <Card shadow='md' rounded='lg' color='default'>
              <CardContent textSize='sm'>
                <div className='pb-2 flex flex-row items-center justify-start gap-x-12 w-full'>
                  <Radar />
                  <h2
                    id='card-fighter-name'
                    className='text-2xl font-bold text-center text-neutral-100'
                  >
                    {fighter.name}
                  </h2>
                </div>
                <div
                  className={`flex items-center justify-center ${
                    gradientBackground[fighter.race]
                  } backdrop-blur-lg p-2 rounded-lg`}
                >
                  <img
                    id='card-fighter-image'
                    style={
                      { viewTransitionName: 'fighter' } as React.CSSProperties
                    }
                    src={fighter.image}
                    alt={fighter.name}
                    className='h-80 object-cover transition-all duration-300 ease-in-out pointer-events-none'
                  />
                </div>
                <div className='flex flex-row items-center justify-between gap-x-2 mt-4 text-neutral-100/80 bg-zinc-700/40 backdrop-blur-md rounded-md rounded-b-4xl  py-2 px-3 font-semibold min-h-16'>
                  <div className='flex flex-col gap-y-1 justify-center'>
                    <h3 className='uppercase'>Ki:</h3>
                    <span
                      id='card-fighter-ki'
                      className='text-xl text-pretty text-center'
                    >
                      {fighter.ki}
                    </span>
                  </div>
                  <div className='flex flex-col gap-y-1 justify-center items-start'>
                    <span>Afiliación: {fighter.affiliation}</span>
                    <span>Raza: {fighter.race}</span>
                    <span>Género: {fighter.gender}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SwipeEffect>
        </article>

        <FighterLink
          id={nextFighter}
          className='md:-translate-x-10 lg:-translate-x-40 md:rotate-8'
          hoverTranslate='md:hover:-translate-y-10 md:hover:-translate-x-10 lg:hover:-translate-x-25'
        />
      </div>

      <div>
        {fighter.transformations.length > 0 && (
          <ButtonGroup
            buttons={buttons}
            color='default'
            size='md'
            rounded='md'
          />
        )}
      </div>

      <div className='flex flex-col items-center justify-center gap-y-2 text-neutral-100/80 max-w-md sm:max-w-xl lg:max-w-3xl cursor-default'>
        <div className='flex w-full flex-col gap-y-2 text-pretty text-base bg-linear-to-b from-neutral-400/20 via-neutral-400/5 to-transparent backdrop-blur-sm shadow-md shadow-neutral-600/20 border border-neutral-500/20 rounded-xl py-2 px-4 transition-colors duration-300 ease-in-out hover:from-neutral-500/50 hover:via-neutral-500/20'>
          <h1 className='font-bold text-xl text-center'>Descripción</h1>
          <p className='text-neutral-100/70'>{fighter.description}</p>
        </div>
        <div className='grid grid-rows-1 md:grid-cols-[1fr_1fr] gap-2'>
          <div className='order-2 md:order-none flex items-center justify-center backdrop-blur-sm bg-linear-to-b from-neutral-400/20 via-neutral-400/5 to-transparent shadow-md shadow-neutral-600/20 border border-neutral-500/20 rounded-xl py-2 px-4 transition-colors duration-300 ease-in-out hover:from-neutral-500/50 hover:via-neutral-500/20'>
            <img
              src={fighter.originPlanet.image}
              alt={fighter.originPlanet.name}
              className='h-60 object-cover rounded-full overflow-hidden'
            />
          </div>
          <div className='order-1 md:order-none grid grid-rows-[1fr_4fr] gap-y-2'>
            <div className='flex items-center justify-center backdrop-blur-sm bg-linear-to-b from-neutral-400/20 via-neutral-400/5 to-transparent shadow-md shadow-neutral-600/20 border border-neutral-500/20 rounded-xl py-2 px-4 transition-colors duration-300 ease-in-out hover:from-neutral-500/50 hover:via-neutral-500/20'>
              <h1 className='font-bold text-xl'>
                Planeta {fighter.originPlanet.name}
              </h1>
            </div>
            <div className='flex flex-col gap-y-2 backdrop-blur-sm bg-linear-to-b from-neutral-400/20 via-neutral-400/5 to-transparent shadow-md shadow-neutral-600/20 border border-neutral-500/20 rounded-xl py-2 px-4 transition-colors duration-300 ease-in-out hover:from-neutral-500/50 hover:via-neutral-500/20'>
              <h1 className='font-bold text-lg text-center'>
                Descripción del planeta
              </h1>
              <p className='text-neutral-100/70'>
                {fighter.originPlanet.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-3xl'>
        <Alert
          title='Navegación entre personajes'
          content='Para navegar entre personajes, haz click en alguna de las cartas a la izquierda o derecha del personaje actual o arrastra la carta a la izquierda o derecha.'
          alertId='fighter-alert'
        />
      </div>
    </section>
  )
}

export default FighterCard
