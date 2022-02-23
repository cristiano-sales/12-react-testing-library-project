import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente NotFound.js', () => {
  test('A página contém um h2 com o texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfoundpage');

    const pageNotFound = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2 });
    expect(pageNotFound).toBeInTheDocument();

    const emoji = screen.getByRole('img', { name: /Crying emoji/i });
    expect(emoji).toBeInTheDocument();
  });

  test('Teste se página mostra determinada imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfoudpage');

    const imageNotFound = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i }); // Onde name é o alt da imagem
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
