import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';
import App from '../App';

describe('Testa o componente About.js', () => {
  test('A página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const infoPokedex = screen.getByText(/this application simulates a Pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
  });

  test('A página contém um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeDefined();
    expect(secondParagraph).toBeDefined();
  });

  test('A página contém determinada imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imageAbout = screen.getByRole('img', { name: /Pokédex/i }); // Onde name é o alt da imagem
    expect(imageAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
