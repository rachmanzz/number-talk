import AuthLayout from "./components/providers/AuthLayout"
import Header from "./components/extends/Header"
import NodesTreeLayout from "./components/extends/NodesTreeLayout"

function App() {
  return (
    <>
      <AuthLayout>
        <div className="flex min-h-screen items-center relative justify-center font-sans py-2">
          <div className="flex bg-white rounded-t-sm min-h-screen w-full max-w-3xl flex-col items-center p-4 sm:items-start">
            <Header />
            <NodesTreeLayout />
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default App
