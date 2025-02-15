const FighterLink: React.FC<{
  id: number
  className: string
  hoverTranslate: string
}> = ({ id, className, hoverTranslate }) => (
  <a
    href={`/fighters/${id}`}
    className={`group rounded-md w-0 md:w-[150px] lg:w-[300px] h-0 md:h-[400px] transition-transform duration-300 ${className} ${hoverTranslate}`}
  >
    <img
      src='/Hero-img.webp'
      alt='Card Background'
      className='h-full object-cover rounded-md blur-xs group-hover:blur-none transition duration-300 ease-in-out'
    />
  </a>
)

export default FighterLink
