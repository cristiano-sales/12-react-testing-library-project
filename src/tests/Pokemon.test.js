import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeDefined();

    const pikachuImageURL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(screen.getByRole('img').src).toBe(pikachuImageURL);
    expect(screen.getByRole('img').alt).toBe('Pikachu sprite');
  });

  test('Clicar no link de navegação do Pokémon é redirecionado à página detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink.href).toContain('/pokemons/25');

    userEvent.click(moreDetailsLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoriteCheck);

    const favoriteImage = screen.getByRole('img', {
      name: /Pikachu is marked as favorite/i,
    });

    expect(favoriteImage).toBeDefined();
    expect(favoriteImage.src).toContain('/star-icon.svg');
  });
});
