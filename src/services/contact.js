import {Contact} from "../API/contact";

const ContactService = {
  save(payload) {
    return Contact.save(payload);
  }
}

export default ContactService
