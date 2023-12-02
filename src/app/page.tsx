import { format, toDate, utcToZonedTime } from "date-fns-tz";
import GameComponent from "./components/game-component";
import { WordDto } from "./model/word-dto";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { DictEntry } from "./model/dict-entry";
import { GameWord } from "./model/game-word";
import { differenceInDays } from "date-fns";
import Papa from "papaparse";
import path from "path";
import { mod } from "./utils/utils";
import fs from 'fs';

const initialDate = utcToZonedTime(toDate('2023-11-28T08:00:00-10:00'), 'Pacific/Tahiti');

// Function to parse the CSV
const parseCSV = (filePath: string): Promise<DictEntry[]> => {
  return new Promise((resolve, reject) => {
    const csvFile = fs.createReadStream(filePath);
    const data: DictEntry[] = [];

    Papa.parse<DictEntry>(csvFile, {
      header: true,
      step: (result) => {
        // Push each row into the data array after casting it to DictEntry
        data.push(result.data as DictEntry);
      },
      complete: () => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export async function getWord(dateString: string): Promise<WordDto> {
  try {
    const date = toDate(dateString, { timeZone: 'Pacific/Tahiti' });

    // Construct the path to the CSV file
    const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'dict_shuffle.csv');

    // Parse the CSV file
    const dictEntries: DictEntry[] = await parseCSV(filePath);

    if (dictEntries.length === 0) {
      return { error: 'Aucun mot trouvé' };
    }

    const index = mod(differenceInDays(date, initialDate), dictEntries.length);

    const key = format(date, 'yyyy-MM-dd', { timeZone: 'Pacific/Tahiti' });

    const encryptedWord = AES.encrypt(JSON.stringify(dictEntries[index]), key).toString();

    // Send the parsed data in the response
    return { encryptedWord: encryptedWord };
  } catch (error) {
    console.log(error);
    return { error: 'erreur lors de la récupération du mot' };
    // If there's an error parsing the CSV, send a 500 response
  }
}

export default async function Home() {
  const now = Date.now();
  const nowParam = format(now, 'yyyy-MM-dd', { timeZone: 'Pacific/Tahiti' });

  const wordDto: WordDto = await getWord(nowParam);
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
  let gameWord: GameWord | null = null;
  try {
    const wordString = AES.decrypt(encryptedWord, key).toString(Utf8);
    const word: DictEntry = JSON.parse(wordString);
    gameWord = {
      lexeme: word.lexeme,
      definition: word.definition,
      chars: word.lexeme.toUpperCase().split('')
    }
  } catch (error) {
    console.error(error);
  }

  if (gameWord) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-5 sm:p-10">
        <div className="flex flex-col max-w-[375px] sm:max-w-[500px] h-full items-center gap-10">
          <GameComponent word={gameWord}></GameComponent>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 sm:p-10">
      Erreur, veuillez recharger la page
    </main>
  )
}
