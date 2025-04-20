import { describe, expect, it } from 'vitest';

describe('index', () => {
  it('should be ok', () => {
    expect(1 + 1).toBe(2);
  });

  it('should be not ok', () => {
    expect(1 + 1).toBe(2); 
  });
});

