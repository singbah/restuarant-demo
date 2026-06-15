
export default function Footers() {
  return (<div>
    <footer className="bg-black text-white sticky bottom-0 flex justify-center items-center p-2 gap-3">
      <a
        className="text-green-500 font-bold p-3 active:text-green-900 transition"
        href="https://wa.me/0880868634"><FaWhatsapp className={iconStyle} /> WhatsApp</a>
      <a
        className="text-blue-500 font-bold p-3 active:text-blue-900 transition"
        href="#"><FaFacebook className={iconStyle} /> FaceBook</a>
      <a
        className="text-red-500 font-bold p-3 active:text-red-900 transition"
        href="#"><FaVoicemail className={iconStyle} /> Email</a>
    </footer>
  </div>)
}