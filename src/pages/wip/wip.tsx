import LogoIcon from '@/lib/assets/thebloglab-icon.svg?react'
import doggo from '@/lib/assets/images/doggo.png'

export function WipPage() {
  return (
    <div className="relative grid min-h-svh place-items-center overflow-hidden bg-neutral-50 py-[50px]">
      {/* contenitore stretto: una colonna su telefono */}
      <div className="w-full max-w-[360px] sm:max-w-[680px] px-4">
        {/* blocco testo */}
        <div className="w-full text-center">
          <LogoIcon className="mx-auto h-[100px] md:h-[200px] w-auto text-foreground" />
          <h1 className="mt-12 text-balance text-2xl font-bold tracking-tight md:text-2xl md:text-black md:text-opacity-75">
            Ciao, sono Margherita.
            <br className="block" />
            Questo sito non esiste ancora eheh :)
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            Arriverà, prima o poi <br className="block" />
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-pretty text-base leading-7 text-[10px] text-muted-foreground md:text-[10px] text-center">
            dico davvero <br className="block" /> giurooo
            <br className="block" /> sarà pure tanto carinooo
          </p>
        </div>

        {/* blocco immagine */}
        <div className="mt-8 w-full text-center">
          <img
            src={doggo}
            alt="Hero"
            className="mx-auto w-full h-auto rounded-md md:max-w-md"
            loading="lazy"
            decoding="async"
          />
          <p className="mt-6 max-w-2xl mx-auto text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            a presto :)
          </p>
        </div>
      </div>
    </div>
  )
}
