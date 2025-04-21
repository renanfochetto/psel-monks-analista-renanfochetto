import { useState } from 'react';
import styles from './Form.module.css';
import FormValidation from './FormValidation/FormValidation.jsx';
import { toast } from 'react-toastify';

const Form = () => {
  const [valid, setValid] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    resultado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valid) {
      toast.warn('Verificação de segurança falhou!');
      return;
    }

    try {
      const response = await fetch('http://psel-monks-analista-renanfochetto.local/wp-json/custom/v1/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          cpf: formData.cpf,
          resultado: formData.resultado
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Formulário enviado com sucesso!', {
          icon: <span style={{ color: '#000', fontWeight: 'bold' }}>✔</span>,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          resultado: ''
        });
        setValid(false);
        setFormKey(prev => prev + 1); // Força re-render do componente de validação
      } else {
        toast.error(`Erro: ${result.message}`, {
          className: 'toastError',
          icon: <span style={{ color: '#dfbbfe', fontWeight: 'bold' }}>✖</span>,
          progressClassName: 'toast-progress-bar',
        });      }
    } catch (error) {
      toast.error(`Erro ao enviar o formulário: ${error.message || error.toString()}`, {
        className: 'toastError',
        icon: <span style={{ color: '#dfbbfe', fontWeight: 'bold' }}>✖</span>,
        progressClassName: 'toast-progress-bar',
      });
    }
  };

  return (
    <form className={styles.formField} onSubmit={handleSubmit}>
      <fieldset className={styles.formFieldInput}>
        <div className={styles.inputRow}>
          <label htmlFor="name" className="visually-hidden">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
            pattern="[A-Za-zÀ-ÿ\s]{3,}"
            title="O nome deve conter apenas letras e ter pelo menos 3 caracteres"
            aria-describedby="name-error"
          />
          <div id="name-error" className="error-message"></div>

          <label htmlFor="email" className="visually-hidden">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-describedby="email-error"
          />
          <div id="email-error" className="error-message"></div>
        </div>

        <div className={styles.inputRow}>
          <label htmlFor="phone" className="visually-hidden">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="(\+?[0-9\s\-()]{8,}|[0-9]{10,11})"
            title="Insira um telefone válido, como +55 12345-6789"
            aria-describedby="phone-error"
          />
          <div id="phone-error" className="error-message"></div>

          <label htmlFor="cpf" className="visually-hidden">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={handleChange}
            required
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            title="Insira o CPF no formato 000.000.000-00"
            aria-describedby="cpf-error"
          />
          <div id="cpf-error" className="error-message"></div>
        </div>
      </fieldset>

      {/* Componente de Validação de Segurança */}
      <FormValidation key={formKey} setValid={setValid} />

      {/* Botão de Envio com Desabilitação Condicional */}
      <button type="submit" disabled={!valid} aria-live="polite">
        Enviar
      </button>
    </form>
  );
};

export default Form;
