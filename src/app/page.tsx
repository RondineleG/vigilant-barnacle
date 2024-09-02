'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EmailInput = ({ value, onChange, error }) => (
  <div className="mb-6">
    <Label htmlFor="email" className="block text-gray-700 font-bold mb-2">
      E-mail <span className="text-red-500">*</span>
    </Label>
    <Input
      className={`mt-2 mb-4 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-orange-500'}`}
      type="email"
      id="email"
      placeholder="mail.example@gmail.com"
      value={value}
      onChange={onChange}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const PasswordInput = ({ value, onChange, error, toggleVisibility, isVisible }) => (
  <div className="mb-6 relative">
    <Label htmlFor="password" className="block text-gray-700 font-bold mb-2">
      Senha <span className="text-red-500">*</span>
    </Label>
    <Input
      className="mt-2 bg-white border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
      type={isVisible ? 'text' : 'password'}
      id="password"
      placeholder="********"
      value={value}
      onChange={onChange}
    />
    <button
      type="button"
      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
      onClick={toggleVisibility}
    >
      {isVisible ? <FaEyeSlash /> : <FaEye />}
    </button>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const PasswordRecoveryModal = ({ isOpen, onClose, onSubmit, isSuccess, recoverEmail, onRecoverEmailChange, recoverError }) => (
  isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recuperar senha</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>
        {isSuccess ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Enviamos um link de recuperação para o seu e-mail cadastrado. Por favor, verifique a sua caixa de entrada e a pasta de spam, se necessário.
            </p>
            <Button onClick={onClose} className="w-full mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-600">
              Entendido
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <p className="text-sm text-gray-600 mb-4">Para recuperar sua senha, digite o e-mail cadastrado.</p>
            <EmailInput value={recoverEmail} onChange={onRecoverEmailChange} error={recoverError ? 'E-mail inválido. Este endereço de e-mail não está cadastrado no sistema, verifique e tente novamente.' : ''} />
            <Button type="submit" className="w-full mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-600">
              Enviar
            </Button>
          </form>
        )}
      </div>
    </div>
  )
);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState('');
  const [recoverError, setRecoverError] = useState(false);

  const validateEmail = (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const validatePassword = (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(value);

  const handleForgotPasswordClick = () => {
    setIsModalOpen(true);
    setIsSuccess(false);
    setRecoverError(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecoverEmail('');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : 'E-mail inválido. Insira um endereço de e-mail no formato correto.');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value) ? '' : 'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.');
  };

  const handleRecoverEmailChange = (e) => {
    setRecoverEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(isEmailValid ? '' : 'E-mail inválido. Insira um endereço de e-mail no formato correto.');
    setPasswordError(isPasswordValid ? '' : 'Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, com letras maiúsculas, minúsculas, números e caracteres especiais.');

    if (isEmailValid && isPasswordValid) {
      console.log('Formulário enviado com sucesso');
    } else {
      console.log('Erro ao enviar o formulário');
    }
  };

  const handleRecoverSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(recoverEmail);
    setRecoverError(!isEmailValid);
    setIsSuccess(isEmailValid);
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <main className="bg-[#F8F8FF] h-screen flex items-center justify-center p-4 md:p-10">
      <div className="flex flex-col w-full h-full max-w-4xl bg-white shadow-lg rounded-lg md:flex-row">
        <div className="relative flex items-center justify-center p-6 bg-[#fffaf6] md:bg-[#FDF5E6] md:w-1/2 order-1 md:order-2">
          <Image className="object-contain" fill={true} src="/Images/logo.png" alt="Logo Image" />
        </div>
        <div className="flex items-center justify-center flex-col p-6 bg-[#F8F8FF] text-gray-800 md:w-1/2 order-2 md:order-1">
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <EmailInput value={email} onChange={handleEmailChange} error={emailError} />
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              toggleVisibility={togglePasswordVisibility}
              isVisible={passwordVisible}
            />
            <div className="flex items-center justify-between mt-4">
              <a href="#" className="text-sm font-bold text-blue-500 hover:text-blue-800" onClick={handleForgotPasswordClick}>
                Esqueci minha senha
              </a>
            </div>
            <Button type="submit" className="w-full mt-6 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-600">
              Entrar
            </Button>
          </form>
        </div>
      </div>
      <PasswordRecoveryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleRecoverSubmit}
        isSuccess={isSuccess}
        recoverEmail={recoverEmail}
        onRecoverEmailChange={handleRecoverEmailChange}
        recoverError={recoverError}
      />
    </main>
  );
}
