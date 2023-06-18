
export function Button({ onClick, children }: { onClick: () => void; children: JSX.Element | string }) {
  return <button className="btn-sm text-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group" onClick={onClick}>{children}</button>;
}