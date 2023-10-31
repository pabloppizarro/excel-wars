export interface ExcelFile {
  range: number;
  file: File;
  collecionName: string;
  parsedData: [
    {
      [k: string]: any;
    }
  ];
}
