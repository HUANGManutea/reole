import { format } from "date-fns-tz";
import GameComponent from "./components/game-component";
import { WordDto } from "./model/word-dto";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { DictEntry } from "./model/dict-entry";
import { GameWord } from "./model/game-word";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const now = Date.now();

  const wordDtoResult = await fetch(`${baseUrl}/api/word`, {cache: "no-cache"});
  const wordDto: WordDto = await wordDtoResult.json();
  if (wordDto.error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-5 sm:p-10">
        <div className="flex flex-col max-w-[375px] sm:max-w-[500px] h-full items-center gap-10">
          <div>Erreur lors de la récupération du mot</div>
        </div>
      </main>
    );
  }

  const encryptedWord: string = wordDto.encryptedWord!;
  const key = format(now, 'yyyy-MM-dd', { timeZone: 'Pacific/Tahiti' });
  const wordString = AES.decrypt(encryptedWord, key).toString(Utf8);
  const word: DictEntry = JSON.parse(wordString);
  const gameWord: GameWord = {
    lexeme: word.lexeme,
    definition: word.definition,
    chars: word.lexeme.toUpperCase().split('')
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 sm:p-10">
      <div className="flex flex-col max-w-[375px] sm:max-w-[500px] h-full items-center gap-10">
        <GameComponent word={gameWord}></GameComponent>
      </div>
    </main>
  )
}
