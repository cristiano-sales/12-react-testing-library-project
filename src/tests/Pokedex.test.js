// Ref. Vinicius Pacheco Franco on GitHub
// Ref. Leonardo Vogel on GitHub
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Testa o componente Pokedex.js', () => {
  test('A página contém um h2 com o texto Encountered pokémons', () => {
    const pokedexTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(pokedexTitle).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon quando o botão "Próximo pokémon" é clicado', () => {
    const proximoPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(proximoPokemonButton);

    const charmanderImage = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmanderImage).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });

    for (let i = 0; i < pokemons.length; i += 1) {
      userEvent.click(nextPokemonButton);
      const renderedPokemons = screen.getAllByTestId('pokemon-name');

      expect(renderedPokemons).toHaveLength(1);
    }
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const eletric = screen.getByRole('button', { name: 'Electric' });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const bug = screen.getByRole('button', { name: 'Bug' });
    const poison = screen.getByRole('button', { name: 'Poison' });
    const psychic = screen.getByRole('button', { name: 'Psychic' });
    const normal = screen.getByRole('button', { name: 'Normal' });
    const dragon = screen.getByRole('button', { name: 'Dragon' });
    const noFilter = screen.getByRole('button', { name: 'All' });

    const allFilterButtons = [
      eletric, fire, bug, poison, psychic, normal, dragon, noFilter,
    ];
    allFilterButtons.forEach((filter) => expect(filter).toBeDefined());

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const totalFilterButtons = 7;
    expect(allButtons).toHaveLength(totalFilterButtons);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const noFilter = screen.getByRole('button', { name: 'All' });
    expect(noFilter).toBeInTheDocument();
    userEvent.click(noFilter);
  });
});
