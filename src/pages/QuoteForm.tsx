export default function QuoteForm() {
  const cacheBust = `v=${Date.now()}`
  const src = `${import.meta.env.BASE_URL}original/roofing/index.html?${cacheBust}`
  return (
    <iframe
      src={src}
      title="Roofing Quote"
      className="w-full h-screen border-0"
    />
  )
}


