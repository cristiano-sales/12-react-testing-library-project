// Ref.: Lucas Vilar on GitHub

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons.js', () => {
  test('É exibido "No favorite pokemon found", se não tiver pokémons favoritos.', () => {
    renderWithRouter(<App />);

    const FavotitePokemonsLink = screen.getByRole(
      'link', { name: /favorite pokémons/i },
    );
    userEvent.click(FavotitePokemonsLink);

    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const PokemonFavoritadoCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(PokemonFavoritadoCheckbox);

    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLink);

    const testIdCard = screen.getByTestId(/pokemon-name/i);
    expect(testIdCard).toBeInTheDocument();
  });
});

// Ref.: Lucas Vilar on GitHub
