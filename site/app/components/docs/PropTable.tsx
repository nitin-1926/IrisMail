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
    <div className="overflow-hidden rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/50">
            <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Prop</th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Type</th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Default</th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-2.5">
                <code className="text-sm text-zinc-300">{prop.name}</code>
                {prop.required && (
                  <span className="ml-1 text-xs text-red-400">*</span>
                )}
              </td>
              <td className="px-4 py-2.5">
                <code className="text-xs text-zinc-500">{prop.type}</code>
              </td>
              <td className="px-4 py-2.5 text-zinc-600">
                {prop.default ? (
                  <code className="text-xs">{prop.default}</code>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-4 py-2.5 text-zinc-500">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
