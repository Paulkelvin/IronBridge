export default function ServiceAreaMapBg({ className }: { className?: string }) {
  const mdHubs = [
    [760, 70], [900, 45], [1020, 90], [960, 150], [820, 130],
  ]
  const vaHubs = [
    [440, 330], [310, 355], [190, 310], [250, 250], [380, 270],
  ]
  const dc: [number, number] = [600, 200]

  return (
    <svg
      viewBox="0 0 1200 400"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {[...mdHubs, ...vaHubs].map(([x, y], i) => (
        <path
          key={i}
          d={`M${dc[0]} ${dc[1]} Q ${(dc[0] + x) / 2} ${Math.min(dc[1], y) - 30}, ${x} ${y}`}
          stroke="currentColor"
          strokeWidth="2.25"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      ))}

      {[...mdHubs, ...vaHubs].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="currentColor" />
      ))}

      <circle cx={dc[0]} cy={dc[1]} r="9" fill="currentColor" />
      <circle cx={dc[0]} cy={dc[1]} r="17" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  )
}
