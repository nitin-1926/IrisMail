interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropTableProps {
  props: Prop[];
}

export function PropTable({ props }: PropTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="px-5 py-3.5 text-left font-medium text-white/70">Prop</th>
            <th className="px-5 py-3.5 text-left font-medium text-white/70">Type</th>
            <th className="px-5 py-3.5 text-left font-medium text-white/70">Default</th>
            <th className="px-5 py-3.5 text-left font-medium text-white/70">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-5 py-3.5">
                <code className="font-mono text-indigo-300">{prop.name}</code>
                {prop.required && (
                  <span className="ml-1.5 text-xs text-red-400">*</span>
                )}
              </td>
              <td className="px-5 py-3.5 text-white/60">{prop.type}</td>
              <td className="px-5 py-3.5 text-white/40">
                {prop.default ?? '—'}
              </td>
              <td className="px-5 py-3.5 text-white/60">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






