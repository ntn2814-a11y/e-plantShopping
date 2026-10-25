import { describe, expect, it } from 'vitest';
import reducer, { addItem, removeItem, updateQuantity } from './CartSlice';

const plant = {
  id: 'snake-plant',
  name: 'Snake Plant',
  price: 18,
  image: 'snake-plant.jpg',
};

describe('cart reducer', () => {
  it('adds a plant and increases an existing plant quantity', () => {
    let state = reducer(undefined, addItem(plant));
    state = reducer(state, addItem(plant));

    expect(state.items).toEqual([{ ...plant, quantity: 2 }]);
  });

  it('updates quantity and removes a plant when quantity reaches zero', () => {
    let state = reducer(undefined, addItem(plant));
    state = reducer(state, updateQuantity({ id: plant.id, quantity: 3 }));
    expect(state.items[0].quantity).toBe(3);

    state = reducer(state, updateQuantity({ id: plant.id, quantity: 0 }));
    expect(state.items).toHaveLength(0);
  });

  it('removes a selected plant', () => {
    const state = reducer(
      reducer(undefined, addItem(plant)),
      removeItem(plant.id),
    );

    expect(state.items).toHaveLength(0);
  });
});
