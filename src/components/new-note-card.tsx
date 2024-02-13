import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from 'sonner'

export function NewNoteCard() {
    const [showOnBoarding, setShowOnBoarding] = useState(true);
    const [content, setContent] = useState('');
    function handleStartEditor() {
        setShowOnBoarding(false);
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value);
        if (event.target.value === '') {
            setShowOnBoarding(true);
        }
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault();
        console.log(content)
        toast.success('Nota criada com sucesso!')
    }

    return (
        <Dialog.Root>
                <Dialog.Trigger className="flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 outline-none hover:ring-2  hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 ">
                    <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                    <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
                </Dialog.Trigger>

                <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60"></Dialog.Overlay>
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md overflow-hidden flex flex-col outline-none">
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400  hover:text-slate-100 transition">
                        <X className="w-5 h-5"></X>
                    </Dialog.Close>
                    <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">    
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>
                            {showOnBoarding ? (
                                <p className='text-sm leading-6 text-slate-400'>Comece <button className="font-md text-lime-400 hover:underline transition">gravando uma nota</button> em áudio ou, se preferir, <button className="font-md text-lime-400 hover:underline transition" onClick={handleStartEditor}>utilize apenas texto</button>.</p>
                            ) : (
                                <textarea autoFocus className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                                    onChange={handleContentChanged}
                                />
                            )}
                        </div>
                        <button type='submit' className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 transition">
                            Salvar nota
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}