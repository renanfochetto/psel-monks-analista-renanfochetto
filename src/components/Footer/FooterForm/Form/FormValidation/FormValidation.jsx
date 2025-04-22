import { useState, useEffect, useRef } from 'react';
import styles from './FormValidation.module.css';

const FormValidation = ({ setValid }) => {
  // Usando useRef para manter os números constantes entre os renders
  const firstNumber = useRef(Math.floor(Math.random() * 100)).current;
  const secondNumber = useRef(Math.floor(Math.random() * 100)).current;

  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  const correctSum = firstNumber + secondNumber;

  useEffect(() => {
    // Verifica se a soma fornecida é correta
    const parsedInput = parseInt(userInput, 10);

    if (!isNaN(parsedInput) && parsedInput === correctSum) {
      setValid(true); // Habilita o botão
      setError('');
    } else {
      setValid(false); // Desabilita o botão
    }
  }, [userInput, correctSum, setValid]);

  return (
    <fieldset className={styles.formFieldSecurity}>
      <div className={styles.securityText}>
        <span>Verificação de Segurança</span>
      </div>
      <div className={styles.securityValidation}>
        <span className={styles.generatedNumber}>{firstNumber}</span>
        <span className={styles.validationOperation}>+</span>
        <span className={styles.generatedNumber}>{secondNumber}</span>
      </div>
      <div>
        <span className={styles.validationOperation}>=</span>
      </div>
      <div className={styles.securityResult}>
        <label htmlFor="resultado" className="visually-hidden">Digite a soma dos números acima</label>
        <input
          type="number"
          id="resultado"
          placeholder="Resultado"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
          aria-label="Resultado da soma"
        />
        {error && <div role="alert">{error}</div>}
      </div>
    </fieldset>
  );
};

export default FormValidation;
