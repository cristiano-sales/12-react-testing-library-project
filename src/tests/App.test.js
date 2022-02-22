import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App.js', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeDefined();

    history.push('/about');
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    history.push('/favorites');
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeDefined();
  });

  test('A aplicação é redirecionada para a página inicial ao clicar no link Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const titleHome = screen.getByRole('heading', {
      level: 2, name: /Encountered pokémons/i });
    expect(titleHome).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página About ao clicar no link About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const titleAbout = screen.getByRole('heading', {
      level: 2, name: /About Pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });

  test('É redirecionada para Pokémons Favoritados ao clicar em Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(linkFavorites);
    const titleFavorites = screen.getByRole('heading', {
      level: 2, name: /Favorite pokémons/i });
    expect(titleFavorites).toBeInTheDocument();
  });

  test('É redirecionada para Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const titleNotFound = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i });
    expect(titleNotFound).toBeDefined();
  });
});
