import { ListFilterPipe } from './list-filter.pipe';

describe('ListFilterPipe', () => {

  it('should not return values higher than the argument', () => {
    const pipe = new ListFilterPipe();
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arg = 5;
    const filtered = pipe.transform(list, arg);
    filtered.forEach(element => {
      expect(element).toBeLessThanOrEqual(arg);
    });
  });
});
