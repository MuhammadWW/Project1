'use client';

export default function PropertiesSection() {
  const cards = [
    ['Identity', 'x*δ=x', 'Use δ to quickly verify answers.'],
    ['Commutativity', 'x*h=h*x', 'Flip/shift whichever signal is easier.'],
    ['Distributivity', 'x*(h1+h2)=x*h1+x*h2', 'Split complicated h into simpler parts.'],
    ['Associativity', '(x*h1)*h2=x*(h1*h2)', 'Combine systems in cascade first.'],
    ['Support rule', 'L_y=L_x+L_h-1 (DT finite)', 'Predict where output can be nonzero.']
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map(([t, eq, tip]) => (
        <div key={t} className="panel">
          <h3 className="font-bold">{t}</h3>
          <p className="font-mono text-sm">{eq}</p>
          <p className="text-sm">Why: convolution sums overlap contributions linearly.</p>
          <p className="text-sm text-indigo-700">Use this to simplify: {tip}</p>
        </div>
      ))}
    </div>
  );
}
