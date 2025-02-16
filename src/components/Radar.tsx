const Radar = () => {
  return (
    <div className='flex items-center'>
      <div className='absolute animate-[ping_1s_ease-in-out_infinite] size-8 bg-green-900 rounded-full border-2 border-green-500 shadow-lg'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center rotate-90'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center rotate-45'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center -rotate-45'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>

        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='size-2/3 border border-green-400 rounded-full'></div>
        </div>
      </div>

      <div className='absolute size-8 bg-green-900 rounded-full border-2 border-green-500 shadow-lg'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center rotate-90'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center rotate-45'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>
        <div className='absolute inset-0 flex items-center justify-center -rotate-45'>
          <div className='w-full h-0.5 bg-green-400'></div>
        </div>

        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='size-2/3 border border-green-400 rounded-full'></div>
        </div>
      </div>
    </div>
  )
}

export default Radar
