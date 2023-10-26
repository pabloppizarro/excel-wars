'use client'
import { useState } from 'react'
import { read, utils, readFile } from 'xlsx'

export default function Hero() {
  const [data, setData] = useState<any>()
  const [range, setRange] = useState<number>()
  const [headers, setHeaders] = useState<[string]>()
  const [length, setLength] = useState<number>(0)
  const [lastFile, setlastFile] = useState<any>()

  async function processXlxs(formData: FormData) {
    // mutate data
    // revalidate cache
    // const wd = read(formData.get('file'), { type: 'binary' })
    // if (wd) {
    //   var data = utils.sheet_to_json(wd, { range: 1 })
    //   setData(data)
    // }

    console.log(formData.get('file'))
  }

  const handleFileInput = async (e: any) => {
    // handle validations

    const file = e.target.files[0]
    setlastFile(file)
    renderTable(file)
  }

  async function renderTable(file: File) {
    const data = await file.arrayBuffer()
    const wb = read(data)
    const ws = wb.SheetNames[0]
    var jsonData = utils.sheet_to_json(wb.Sheets[ws], { range })
    // console.log(jsonData)
    setLength(jsonData.length)
    setHeaders(Object.keys(jsonData[0]))

    setData(jsonData)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className=" grid container w-full px-4 md:px-6 justify-items-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Excels Wars
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Upload your file to get started
            </p>
          </div>
          <form
            action={processXlxs}
            className="grid w-full max-w-sm justify-center justify-items-center items-center gap-4"
          >
            <label htmlFor="range">Table headers row n°</label>

            <input
              onChange={($event: any) => {
                setRange(Number($event.target.value))
                renderTable(lastFile)
              }}
              name="range"
              id="range"
              type="number"
              placeholder="3"
            />
            <div className="border  p-2 rounded-full shadow-sm flex w-full max-w-sm items-center gap-1.5 hover:shadow-lg">
              <label htmlFor="file" className=" w-full cursor-pointer">
                Upload a file. {lastFile?.name}
                <input
                  onChange={handleFileInput}
                  name="file"
                  className="w-full hidden"
                  id="file"
                  type="file"
                  accept=".xls,.xlsx"
                />
              </label>
            </div>
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              .XLSX, .XLX, .XLXS or PDF.
            </p>
            <button
              className=" rounded-full p-2 bg-gray-950 text-white"
              type="submit"
            >
              Add more files
            </button>
          </form>
        </div>
        <section>
          {/* <p>Length: {length}</p> */}
          {data ? (
            <pre>
              {data.map((e, i) => (
                <p key={i}>{JSON.stringify(e)}</p>
              ))}
            </pre>
          ) : (
            ''
          )}
        </section>
      </div>
    </section>
  )
}
