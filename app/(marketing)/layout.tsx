/**
 * Layout de la vitrine — volontairement minimal : pas de châssis OS ici.
 * La mise en scène du bureau appartient au hero, pas au cadre du site.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex flex-1 flex-col">{children}</main>;
}
