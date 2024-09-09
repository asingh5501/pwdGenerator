import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numCheckBox, setNumCheckBox] = useState(false)
  const [charCheckBox, setCharCheckBox] = useState(false)
  const [password, setPassword] = useState('')

  const passworfRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz'
    if (numCheckBox) {
      str += '0123456789'
    }
    if (charCheckBox) {
      str += '!@#$%^&*-_+=[]{}~`'
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  },[length, numCheckBox, charCheckBox, setPassword])

  const copyPasswordToClick = useCallback(() => {
    passworfRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()    
  }, [length, charCheckBox, numCheckBox, passwordGenerator])
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex rounded-lg shadow overflow-hidden my-5'>
          <input
            type="text"
            value={password}
            className='w-full outline-none py-1 px-3'
            placeholder='password'
            readOnly
            ref={passworfRef}
          />
          <button
            onClick={copyPasswordToClick}
            className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Label: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numCheckBox}
              id='numberInput'
              onChange={() => setNumCheckBox((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charCheckBox}
              id='numberInput'
              onChange={() => setCharCheckBox((prev) => !prev)}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
