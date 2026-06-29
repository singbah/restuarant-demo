import ContactForm from "../forms/ContactForms";
import NewsLetter from "../forms/NewsLetters";
import LayoutScreen from "../layouts/Layout";

export default function ContactPage(){
    return(<div>
        <LayoutScreen compo={<ContactForm/>}/>
    </div>)
}