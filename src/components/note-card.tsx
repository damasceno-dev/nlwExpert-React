export function NoteCard() {
    return (

        <button className="text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className='text-sm font-medium text-slate-300'>há 2 dias</span>
          <p className='text-sm leading-6 text-slate-400'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ut est soluta eum officia aperiam voluptatem in esse illum cumque fuga vitae, harum aliquam laudantium, repellendus ea? Eum, alias excepturi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor ut est soluta eum officia aperiam voluptatem in esse illum cumque fuga vitae, harum aliquam laudantium, repellendus ea? Eum, alias excepturi.</p>
          <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-black/0 pointer-events-none'></div>
        </button>
    )
    
}