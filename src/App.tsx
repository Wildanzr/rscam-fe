import { useEffect } from "react"

const App = () => {
  // Priority tailwindcss over antd
  useEffect(() => {
    const head = document.querySelector("head")
    const styleTag = head?.querySelectorAll<HTMLStyleElement>("style")
    const tailwindStyleTag = [...styleTag ?? []].find(style => style.innerHTML.includes("tailwind"))
    head?.insertAdjacentElement('afterbegin', tailwindStyleTag ?? document.createElement("style"))
  }, [])
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-4xl">Hello World</h1>
    </div>
  )
}

export default App