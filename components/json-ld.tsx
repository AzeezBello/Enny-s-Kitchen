type JsonLdProps = {
  /** One or more schema.org nodes; they are emitted as a single @graph. */
  graph: unknown[];
};

export function JsonLd({ graph }: JsonLdProps) {
  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
