import React, {useEffect, useRef} from 'react'
import InputField from './modules/InputField/InputField'
import styles from './DynamicKeyInputs.module.scss'

export interface IInput{
  id: string
  value: string
}

interface IProps{
  inputs: IInput[]
  handleInputChange: (id: string, value: string) => void
  addInput: () => void
  deleteInput: (id: string) => void
}

const DynamicKeyInputs = ({
                            inputs,
                            handleInputChange,
                            addInput,
                            deleteInput
}: IProps) => {


  const scrollEl = useRef<HTMLDivElement>(null)

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
            showAddInput={index === inputs.length - 1 && inputs.length < 10}
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