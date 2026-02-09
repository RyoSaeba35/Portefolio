// app/javascript/controllers/desktop_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { section: String };

  load(event) {
    event.preventDefault();
    const section = event.params.section;
    this.element.src = `/desktop/${section}`;
  }
}
