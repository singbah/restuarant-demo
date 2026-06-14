const mapLink = "https://maps.app.goo.gl/B1xmcqp3yPMs2sHU7"

export default function FindUs() {
  return (<div className="h-screen">
    <iframe
      src="https://maps.app.goo.gl/B1xmcqp3yPMs2sHU7"
      width="100%"
      height="100%"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Restaurant Location"
    ></iframe>
  </div>)
}