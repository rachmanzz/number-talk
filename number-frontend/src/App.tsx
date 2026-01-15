
function App() {
  return (
    <>
      <div className="flex min-h-screen items-center relative justify-center font-sans py-2">
        <div className="flex bg-white rounded-t-sm min-h-screen w-full max-w-3xl flex-col items-center p-4 sm:items-start">
          <h1 className="text-2xl font-bold">NUMBER TALK</h1>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col">
              <div className="flex flex-row border p-4 gap-3 border-gray-50">
                <div className="flex items-center">
                  <div className=" w-16 h-16 rounded-lg bg-gray-100" />
                </div>
                <div className="flex-1 flex flex-col px-4 gap-1.5">
                  <span className="text-neutral-400 text-sm">update at 10 day ago</span>
                  <div className="text-lg">5</div>
                  <div>
                    <button className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">Reply</button>
                  </div>
                </div>
              </div>
              <div className="ml-10 flex flex-col gap-3 mt-2">
                <div className="flex w-full flex-row border-l border-b p-2 gap-2 border-gray-50">
                  <div className="flex items-center">
                    <div className=" w-16 h-16 rounded-lg bg-gray-100" />
                  </div>
                  <div className="flex-1 flex flex-col px-4 gap-0.5">
                    <span className="text-neutral-400 text-sm">update at 10 day ago</span>
                    <div className="text-lg">5</div>
                    <div>
                      <button className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">Reply</button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-row border-l border-b p-2 gap-2 border-gray-50">
                  <div className="flex items-center">
                    <div className=" w-16 h-16 rounded-lg bg-gray-100" />
                  </div>
                  <div className="flex-1 flex flex-col px-4 gap-1">
                    <span className="text-neutral-400 text-sm">update at 11 day ago</span>
                    <div className="text-lg">5</div>
                    <div>
                      <button className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">Reply</button>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-row border-l border-b p-2 gap-2 border-gray-50">
                  <div className="flex items-center">
                    <div className=" w-16 h-16 rounded-lg bg-gray-100" />
                  </div>
                  <div className="relative flex w-full items-center">
                    <textarea placeholder="type your number here"  className="w-full h-10 resize-none [&::-webkit-scrollbar]:hidden py-2 pl-2 pr-24 rounded-lg bg-gray-50"></textarea>
                    <div className="z-20 absolute flex right-2">
                      <button className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row border p-4 gap-3 border-gray-50">
              <div className="flex items-center">
                <div className=" w-16 h-16 rounded-lg bg-gray-100" />
              </div>
              <div className="flex-1 flex flex-col px-4 gap-1.5">
                <span className="text-neutral-400 text-sm">update at 10 day ago</span>
                <div className="text-lg">5</div>
                <div>
                  <button className="bg-indigo-800 text-white text-sm py-1 px-5 rounded">Reply</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
