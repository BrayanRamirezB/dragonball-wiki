import type { Fighter } from '@/const/Fighter'

interface CharacterProps {
  character: Fighter
}

const FighterZ = ({ character }: CharacterProps) => {
  const handleMouseEnter = () => {
    const previewElement = document.getElementById(
      'fighter-preview'
    ) as HTMLImageElement | null
    const linkElement = document.getElementById(
      'fighter-preview-link'
    ) as HTMLAnchorElement | null
    const nameElement = document.getElementById(
      'fighter-name'
    ) as HTMLElement | null

    if (previewElement && nameElement && linkElement) {
      linkElement.href = `/fighters/${character.id}`
      previewElement.src = character.image
      nameElement.innerText = character.name
    }
  }

  return (
    <a
      href={`/fighters/${character.id}`}
      title={`Guerrero Z ${character.name}`}
      className='group relative flex items-center justify-center h-32 w-24 lg:w-30 xl:32 transition duration-300 hover:scale-110 backdrop-blur-sm rounded-lg bg-linear-to-b from-sky-400/20 via-sky-400/5 to-transparent'
      onMouseEnter={handleMouseEnter}
    >
      <img
        src={character.image}
        alt={`Guerrero Z ${character.name}`}
        className='h-full w-auto -mt-12 px-2 grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out'
      />
    </a>
  )
}

export default FighterZ
