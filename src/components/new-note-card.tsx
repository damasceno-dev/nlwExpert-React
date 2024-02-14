import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from 'sonner'

interface NewNoteCardProps {
    createNote: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({createNote} : NewNoteCardProps) {
    const [showOnBoarding, setShowOnBoarding] = useState(true);
    const [content, setContent] = useState('');
    const [isRecording, setIsRecording] = useState(false)

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
        if (content === '') {
            return;
        }
        event.preventDefault();
        createNote(content);
        setContent('');
        setShowOnBoarding(true);
        toast.success('Nota criada com sucesso!');
    }

    function handleStartRecording() {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
        console.log(isSpeechRecognitionAPIAvailable)
        if (!isSpeechRecognitionAPIAvailable) {
            alert('Seu navegador não suporta a API de gravação!');
            return;
        }

        setIsRecording(true);
        setShowOnBoarding(false);

        const SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;

        speechRecognition = new SpeechRecognitionAPI();
        speechRecognition.lang = 'pt-BR';
        speechRecognition.continuous = true;
        speechRecognition.maxAlternatives = 1;
        speechRecognition.interimResults = true;
        console.log(speechRecognition)

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript);
            }, '')
            setContent(transcription)
        }


        speechRecognition.onerror = (event) => {
            console.log(event)
        }

        speechRecognition.start();
    }

    function handleStopRecording() {
        setIsRecording(false);
        speechRecognition?.stop()
        
    }

    return (
        <Dialog.Root>
                <Dialog.Trigger className="flex flex-col gap-3 text-left rounded-md bg-slate-700 p-5 outline-none hover:ring-2  hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 ">
                    <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                    <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
                </Dialog.Trigger>

                <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/60"></Dialog.Overlay>
                <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md overflow-hidden flex flex-col outline-none">
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400  hover:text-slate-100 transition">
                        <X className="w-5 h-5"></X>
                    </Dialog.Close>
                    <form className="flex-1 flex flex-col">    
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>
                            {showOnBoarding ? (
                                <p className='text-sm leading-6 text-slate-400'>Comece <button type="button" onClick={handleStartRecording} className="font-md text-lime-400 hover:underline transition">gravando uma nota</button> em áudio ou, se preferir, <button type="button" className="font-md text-lime-400 hover:underline transition" onClick={handleStartEditor}>utilize apenas texto</button>.</p>
                            ) : (
                                <textarea autoFocus className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none" 
                                    onChange={handleContentChanged}
                                    value={content}
                                />
                            )}
                        </div>
                        {isRecording ? 
                        (
                            <button type='button' onClick={handleStopRecording} className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100 transition">
                                <div className="size-3 rounded-full bg-red-500 animate-pulse"></div>
                                Gravando... (clique p/ interromper)
                            </button>
                        ) : 
                        (
                            <button type='button' onClick={handleSaveNote} className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 transition">
                                Salvar nota
                            </button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}