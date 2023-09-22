import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const [numeros, setNumeros] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [numeroTabelas, setNumeroTabelas] = useState(30);
  const inputRef = useRef();
  const inputTabelaRef = useRef();

  function salvaNumeros() {

    if (numeros.length >= 5) {
      return;
    }

    const valor = inputRef.current.value;

    if (valor > 25 || valor < 1) {
      return;
    }

    if (!valor) {
      return;
    }

    if (numeros.includes(valor)) {
      return;
    }

    const novoArray = [...numeros, valor];

    const arrayOrdenado = novoArray.sort((a, b) => a - b);

    setNumeros(arrayOrdenado);

    inputRef.current.value = '';

  }

  function random10Numbers() {
    const matrix = [];

    const numerosInt = numeros.map((item) => {
      return parseInt(item);
    }
    );

    for (let i = 0; i < numeroTabelas; i++) {

      var array = [];

      for (let j = 0; array.length < 10; j++) {
        var valor = Math.floor(Math.random() * 25 + 1);

        if (valor < 1 || valor > 25) {
          j--;
          continue;
        }

        if (!array.includes(valor) && !numerosInt.includes(valor)) {
          array.push(valor);
        } else {
          j--;
          continue;
        }
      }

      const arrayOrdenado = array.sort((a, b) => a - b);

      if (matrix.includes(arrayOrdenado)) {
        console.log("entrou repetiu")
        i--;
        continue;
      }

      matrix.push(arrayOrdenado);
    }

    setRandomNumbers(matrix);
  }


  return (
    <div className="App">
      <div className="container">

        <div className="inputValoresFixos">
          <input ref={inputRef}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                salvaNumeros();
              }
            }}
            placeholder='Informe cinco números fixos'
          />

          <button
            onClick={salvaNumeros}
          >Salvar</button>

        </div>

        <div className='inputNumeroTabelas'>
          <input ref={inputTabelaRef}
            placeholder='Informe o número de jogos'
          />
          <button onClick={() => {
            if (inputTabelaRef.current.value < 1 || inputTabelaRef.current.value === '') {
              return;
            }
            setNumeroTabelas(parseInt(inputTabelaRef.current.value));
            inputTabelaRef.current.value = '';
          }
          }>Salvar</button>


        </div>

        <div className="numerosFixos">
          <h1>Números fixos</h1>
          <div className='numeros'>
            {numeros.map((item) => {
              return <div
                key={item}> {item} </div>
            })}
          </div>
          <h1>Quantidade de jogos: {numeroTabelas}</h1>
        </div>

        {numeros.length === 5 && <button
          onClick={() => random10Numbers()}
        >Gerar números</button>}

        <div className="numerosAleatorios">
          <h1>Números aleatorios</h1>

          <div className='matrixContainer'>
            <div className='matrix'>
              {randomNumbers.map((row, index) => {
                return <div
                  key={index}
                  className='row'>
                  <h4>{index}</h4>
                  {row.map((item) => {
                    return <div
                      key={item}
                      className='item'>
                      {item}
                    </div>
                  })}
                </div>
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;