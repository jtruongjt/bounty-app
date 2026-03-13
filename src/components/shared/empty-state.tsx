type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="panel empty-state">
      <h2 className="panel-section__title">{title}</h2>
      <p>{description}</p>
    </section>
  );
}
