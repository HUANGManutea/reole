export const dynamic = 'auto';

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { DictEntry } from '@/app/model/dict-entry';
import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays, parse } from 'date-fns';
import AES from 'crypto-js/aes';
import { format, toDate, utcToZonedTime } from 'date-fns-tz';
import { mod } from '@/app/utils/utils';

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

export async function GET(request: NextRequest) {
  try {
    // get date search param
    const searchParams = request.nextUrl.searchParams;

    const dateString = searchParams.get('date');

    if (!dateString) {
      return NextResponse.json({error: 'Aucune date spécifiée'});
    }

    const date = toDate(dateString, { timeZone: 'Pacific/Tahiti' });

    // Construct the path to the CSV file
    const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'dict_shuffle.csv');
    
    // Parse the CSV file
    const dictEntries: DictEntry[] = await parseCSV(filePath);

    if (dictEntries.length === 0) {
      return NextResponse.json({error: 'Aucun mot trouvé'});
    }

    const index = mod(differenceInDays(date, initialDate), dictEntries.length);

    const key = format(date, 'yyyy-MM-dd', { timeZone: 'Pacific/Tahiti' });

    const encryptedWord = AES.encrypt(JSON.stringify(dictEntries[index]), key).toString();
    
    // Send the parsed data in the response
      return NextResponse.json({encryptedWord: encryptedWord});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: 'erreur lors de la récupération du mot'});
    // If there's an error parsing the CSV, send a 500 response
  }
}