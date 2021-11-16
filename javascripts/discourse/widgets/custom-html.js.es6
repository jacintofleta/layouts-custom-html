import { scheduleOnce } from "@ember/runloop";
import { createWidget } from "discourse/widgets/widget";

let layoutsError;
let layouts;

try {
  layouts = requirejs(
    "discourse/plugins/discourse-layouts/discourse/lib/layouts"
  );
} catch (error) {
  layouts = { createLayoutsWidget: createWidget };
  console.error(error);
}

export default layouts.createLayoutsWidget("custom-html", {
  defaultState() {
    return {
      renderScheduled: false,
    };
  },

  html(attrs, state) {
    if (!state.renderScheduled) {
      let title_1 = settings.layouts_custom_title_1;
      let description_1 = settings.layouts_custom_description_1;
      let button_text_1 = settings.layouts_custom_button_text_1;
      let title_2 = settings.layouts_custom_title_2;
      let description_2 = settings.layouts_custom_description_2;
      let link_text_2 = settings.layouts_custom_link_text_2;
      let link_url_2 = settings.layouts_custom_link_url_2;

      const category = attrs.category;
      if (category && category.layouts_custom_html) {
        html = category.layouts_custom_html;
      }

      scheduleOnce("afterRender", this, function () {
        $("div.layouts-custom-html").append(
          `<div class='contents'><h3 style="margin-top: 42px;">${title_1}</h3>
          <p>${description_1}</p>
          <a href="/new-topic" style="color: #ffffff">
          <button aria-label="Themes" id="ember190" class="themes-tab tab btn-radical active btn full btn-text ember-view" type="button"><span class="d-button-label">${button_text_1}</span>
          </button>
          </a>
          
          <h3 style="margin-top: 56px;">${title_2}</h3>
          <p>${description_2}</p>
          <a style="display:flex;" href="${link_url_2}">${link_text_2} <div class="arrow_link"></div></a></div>`
        );
      });
      state.renderScheduled = true;
    }
    return "";
  },
});
