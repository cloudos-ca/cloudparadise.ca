/**
 * Le JSON-LD fourni par BabyLoveGrowth avec chaque article (`Article`, et un
 * `FAQPage` s'il y a lieu), rendu tel quel.
 *
 * Le `<` est échappé : une valeur contenant `</script>` ne doit pas pouvoir
 * refermer la balise. La source est de confiance (notre propre compte), mais
 * l'échappement ne coûte rien et évite d'avoir à s'en souvenir.
 */
export function ArticleJsonLd({
  data,
}: Readonly<{ data: Record<string, unknown> | null }>) {
  if (!data) return null;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
