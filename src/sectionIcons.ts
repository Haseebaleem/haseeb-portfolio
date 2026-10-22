type XY = [number, number];
export type IconSegment = { start: XY; end: XY };

const circle = (x: number, y: number, radius: number): XY[] =>
  Array.from({ length: 33 }, (_, i) => [x + Math.cos(i * Math.PI / 16) * radius, y + Math.sin(i * Math.PI / 16) * radius]);

// All icons share a 24-unit grid and an outline style.
const outlines: Record<string, XY[][]> = {
  about: [circle(12, 7, 3.5), [[4, 21], [4, 18], [4.7, 15.8], [6.5, 14.4], [9, 14], [15, 14], [17.5, 14.4], [19.3, 15.8], [20, 18], [20, 21]]],
  skills: [[[7, 5], [2, 12], [7, 19]], [[17, 5], [22, 12], [17, 19]], [[14, 3], [10, 21]]],
  experience: [[[3, 7], [21, 7], [21, 21], [3, 21], [3, 7]], [[8, 7], [8, 3], [16, 3], [16, 7]], [[3, 12], [9, 15], [15, 15], [21, 12]], [[10, 13], [14, 13], [14, 17], [10, 17], [10, 13]]],
  projects: [[[2, 20], [2, 5], [9, 5], [12, 8], [20, 8], [20, 11]], [[2, 20], [6, 11], [22, 11], [18, 20], [2, 20]]],
  education: [[[1, 8], [12, 3], [23, 8], [12, 13], [1, 8]], [[5, 10], [5, 17], [8, 19], [12, 20], [16, 19], [19, 17], [19, 10]], [[23, 8], [23, 18]]],
  contact: [[[2, 5], [22, 5], [22, 19], [2, 19], [2, 5]], [[2, 5], [12, 13], [22, 5]]],
};

function sample(strokes: XY[][]): IconSegment[] {
  const lines = strokes.flatMap(stroke => stroke.slice(1).map((end, i) => ({ start: stroke[i], end, length: Math.hypot(end[0] - stroke[i][0], end[1] - stroke[i][1]) })));
  const total = lines.reduce((sum, line) => sum + line.length, 0);
  const normalize = (line: typeof lines[number], t: number): XY => [
    (line.start[0] + (line.end[0] - line.start[0]) * t - 12) / 12,
    (line.start[1] + (line.end[1] - line.start[1]) * t - 12) / 12,
  ];
  // Equal segment counts allow continuous shape interpolation, without connecting separate strokes.
  return Array.from({ length: 120 }, (_, i) => {
    const start = i / 120 * total, end = (i + 1) / 120 * total;
    let offset = 0;
    const line = lines.find(candidate => {
      if (offset + candidate.length >= (start + end) / 2) return true;
      offset += candidate.length;
      return false;
    })!;
    return {
      start: normalize(line, Math.max(0, (start - offset) / line.length)),
      end: normalize(line, Math.min(1, (end - offset) / line.length)),
    };
  });
}

export const sectionIcons = Object.fromEntries(Object.entries(outlines).map(([name, strokes]) => [name, sample(strokes)]));
