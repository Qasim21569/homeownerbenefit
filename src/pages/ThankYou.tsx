export default function ThankYou() {
  const src = `${import.meta.env.BASE_URL}original/thank-you/index.html`
  return (
    <iframe
      src={src}
      title="Thank You"
      className="w-full h-screen border-0"
    />
  )
}


