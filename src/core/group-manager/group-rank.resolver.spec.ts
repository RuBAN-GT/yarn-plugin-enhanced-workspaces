import { GroupRankResolver } from './group-rank.resolver';
import { SampleNode } from './__tests__/sample.node';

describe('GroupRankResolver', () => {
  const rankResolver = new GroupRankResolver();

  describe('#resolve', () => {
    it('returns empty map for empty nodes list', () => {
      const rankMap = rankResolver.resolve([]);
      expect(rankMap.size).toBe(0);
    });

    it('generates ranked map for a simple tree', () => {
      // Preset
      const a = new SampleNode('a');
      const b = new SampleNode('a.b', a);
      const c = new SampleNode('a.b.c', b);
      a.addChildren(b);
      b.addChildren(c);

      // Setup
      const nodes = [a, b, c];
      const rankMap = rankResolver.resolve(nodes);

      // Test it
      expect(rankMap.size).toBe(nodes.length);
      expect(rankMap.get(a)).toBe(0);
      expect(rankMap.get(b)).toBe(1);
      expect(rankMap.get(c)).toBe(2);
    });

    it('generates ranked map for sibling nodes', () => {
      // Preset
      const a = new SampleNode('a');
      const b = new SampleNode('a.b', a);
      const c = new SampleNode('a.c', a);
      a.addChildren(b).addChildren(c);

      // Setup
      const nodes = [a, b, c];
      const rankMap = rankResolver.resolve(nodes);

      // Test it
      expect(rankMap.size).toBe(nodes.length);
      expect(rankMap.get(a)).toBe(0);
      expect(rankMap.get(b)).toBe(1);
      expect(rankMap.get(c)).toBe(1);
    });

    it('generates ranked map for nodes with empties', () => {
      // Preset
      const a = new SampleNode('a');
      const b = new SampleNode('a.b', a);
      const c = new SampleNode('a.b.c', b);
      const d = new SampleNode('a.b.d', b);
      a.addChildren(b);
      b.addChildren(c).addChildren(d);

      // Setup
      const nodes = [a, c, d];
      const rankMap = rankResolver.resolve(nodes);

      // Test it
      expect(rankMap.size).toBe(nodes.length);
      expect(rankMap.get(a)).toBe(0);
      expect(rankMap.get(c)).toBe(1);
      expect(rankMap.get(d)).toBe(1);
    });

    it('generates ranked map with missing root', () => {
      // Preset
      const a = new SampleNode('a');
      const b = new SampleNode('a.b', a);
      const c = new SampleNode('a.b.c', b);
      const d = new SampleNode('a.b.c.d', c);
      const e = new SampleNode('a.b.c.e', c);
      a.addChildren(b);
      b.addChildren(c);
      c.addChildren(d).addChildren(e);

      // Setup
      const nodes = [b, d, e];
      const rankMap = rankResolver.resolve(nodes);

      // Test it
      expect(rankMap.size).toBe(nodes.length);
      expect(rankMap.get(b)).toBe(0);
      expect(rankMap.get(d)).toBe(1);
      expect(rankMap.get(e)).toBe(1);
    });
  });
});
