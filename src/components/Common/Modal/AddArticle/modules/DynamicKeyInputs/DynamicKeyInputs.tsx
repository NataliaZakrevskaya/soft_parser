import React, {useEffect, useRef, useState} from 'react'
import InputField from './modules/InputField/InputField'
import {nanoid} from 'nanoid'
import styles from './DynamicKeyInputs.module.scss'

interface IInput{
  id: string
  value: string
}

const DynamicKeyInputs = () => {

  const [inputs, setInputs] = useState<IInput[]>([{id: nanoid(), value: ''}])

  const scrollEl = useRef<HTMLDivElement>(null)

  const handleInputChange = (id: string, value: string) => {
    const newInputs = [...inputs]
    const inputIndex = newInputs.findIndex(input => input.id === id)
    newInputs[inputIndex].value = value
    setInputs(newInputs)
  }
  const addInput = () => {
    setInputs([...inputs, {id: nanoid(), value: ''}])
  }
  const deleteInput = (id: string) => {
    setInputs(inputs.filter((input: IInput) => input.id !== id))
  }

  useEffect(() => {
    scrollEl.current?.scrollIntoView( { behavior: 'smooth' } );
  }, [inputs])

  return (
    <div className={styles.scroll} >
      <div className={styles.keysWrapper} ref={scrollEl}>
        {inputs.map((input, index) => (
          <InputField
            key={input.id}
            value={input.value}
            showDelete={index >= 1}
            lastInput={index === inputs.length - 1}
            addInput={addInput}
            deleteInput={() => deleteInput(input.id)}
            onChange={(value) => handleInputChange(input.id, value)}
          />
        ))}
      </div>
      <div ref={ scrollEl }/>
    </div>
  )
}

export default DynamicKeyInputs