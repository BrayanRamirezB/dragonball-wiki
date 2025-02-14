import type { Fighter } from '@/const/Fighter'

interface CharacterProps {
  character: Fighter
}

const Character = ({ character }: CharacterProps) => (
  <a
    href={`/`}
    title={`Character ${character.name}`}
    className='group relative flex flex-col items-center justify-center text-center h-32 w-24 lg:w-30 xl:32 transition duration-300 hover:scale-110 backdrop-blur-sm rounded-lg bg-linear-to-b from-neutral-400/20 hover:from-red-500/30 via-neutral-400/10 hover:via-red-400/5 to-transparent'
  >
    <img
      src={character.image}
      alt={`Character ${character.name}`}
      className='h-full w-auto -mt-12 px-2 grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out'
    />
    <span className='transition duration-300 text-neutral-400 group-hover:text-red-500 text-xl font-bold -skew-5'>
      {character.name}
    </span>
  </a>
)

export default Character
