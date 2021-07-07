import { GroupManager } from './group-manager';
import { SampleNode } from './__tests__/sample.node';

describe('GroupManager', () => {
  const groupManager = new GroupManager();

  describe('#flatGroups', () => {
    it('generates groups for simple tries', () => {
      // Preset
      const a = new SampleNode('a');
      const b = new SampleNode('a.b', a);
      const c = new SampleNode('a.b.c', b);
      const d = new SampleNode('a.b.c.d', c);
      const e = new SampleNode('a.b.c.e', c);
      a.addChildren(b);
      b.addChildren(c);
      c.addChildren(d).addChildren(e);

      const props = { groupBy: 2, input: [b, d, e] };
      const report = groupManager.flatGroups(props);

      expect(report.groupBy).toBe(props.groupBy);
      expect(report.groups.length).toBe(2);

      expect(report.groups[0]).toMatchObject([b]);
      expect(report.groups[1]).toMatchObject([d, e]);
    });

    it('generates groups for simple tries grouped by 1', () => {
      // Preset
      const a = new SampleNode('a');
      const b = new SampleNode('a.b', a);
      const c = new SampleNode('a.b.c', b);
      const d = new SampleNode('a.b.c.d', c);
      const e = new SampleNode('a.b.c.e', c);
      a.addChildren(b);
      b.addChildren(c);
      c.addChildren(d).addChildren(e);

      const props = { groupBy: 1, input: [b, d, e] };
      const report = groupManager.flatGroups(props);

      expect(report.groupBy).toBe(props.groupBy);
      expect(report.groups.length).toBe(3);

      expect(report.groups[0]).toMatchObject([b]);
      expect(report.groups[1]).toMatchObject([d]);
      expect(report.groups[2]).toMatchObject([e]);
    });
  });
});
