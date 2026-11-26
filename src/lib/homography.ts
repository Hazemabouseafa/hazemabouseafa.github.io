export interface Point2D {
  x: number;
  y: number;
}

/**
 * Exact normalized laptop inner screen corners measured on portrait-desk (1024x576).
 * Order: Top-Left, Top-Right, Bottom-Right, Bottom-Left.
 */
export const LAPTOP_SCREEN_NORM: readonly [Point2D, Point2D, Point2D, Point2D] = [
  { x: 558 / 1024, y: 321 / 576 },
  { x: 697 / 1024, y: 325 / 576 },
  { x: 654 / 1024, y: 481 / 576 },
  { x: 525 / 1024, y: 454 / 576 },
];

function solveLinear8(A: number[][], b: number[]): number[] | null {
  const n = 8;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) {
        pivot = r;
      }
    }
    if (Math.abs(M[pivot][col]) < 1e-9) return null;
    [M[col], M[pivot]] = [M[pivot], M[col]];

    const div = M[col][col];
    for (let j = col; j <= n; j++) M[col][j] /= div;

    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = M[r][col];
      for (let j = col; j <= n; j++) {
        M[r][j] -= factor * M[col][j];
      }
    }
  }
  return M.map((row) => row[n]);
}

/**
 * Computes a CSS `matrix3d(...)` transforming a `(srcW x srcH)` rectangle (origin 0,0)
 * onto four arbitrary screen pixel corners `[TL, TR, BR, BL]`.
 */
export function computeCssMatrix3d(
  srcW: number,
  srcH: number,
  dst: readonly [Point2D, Point2D, Point2D, Point2D]
): string {
  if (srcW <= 0 || srcH <= 0) return "none";

  const src: Point2D[] = [
    { x: 0, y: 0 },
    { x: srcW, y: 0 },
    { x: srcW, y: srcH },
    { x: 0, y: srcH },
  ];

  const A: number[][] = [];
  const b: number[] = [];

  for (let i = 0; i < 4; i++) {
    const sx = src[i].x;
    const sy = src[i].y;
    const dx = dst[i].x;
    const dy = dst[i].y;

    A.push([sx, sy, 1, 0, 0, 0, -dx * sx, -dx * sy]);
    b.push(dx);

    A.push([0, 0, 0, sx, sy, 1, -dy * sx, -dy * sy]);
    b.push(dy);
  }

  const h = solveLinear8(A, b);
  if (!h) return "none";

  const [a11, a12, a13, a21, a22, a23, a31, a32] = h;
  // Column-major 4x4 CSS matrix3d mapping (x, y, 0, 1) -> (x', y', 0, w')
  const vals = [
    a11, a21, 0, a31,
    a12, a22, 0, a32,
    0,   0,   1, 0,
    a13, a23, 0, 1,
  ].map((v) => Number(v.toFixed(7)));

  return `matrix3d(${vals.join(",")})`;
}
