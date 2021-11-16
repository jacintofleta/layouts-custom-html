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
      let prueba = settings.layouts_custom_prueba;

      const category = attrs.category;
      if (category && category.layouts_custom_html) {
        html = category.layouts_custom_html;
      }

      scheduleOnce("afterRender", this, function () {
        $("div.layouts-custom-html").append(
          `<div class='contents'><h3 style="margin-top: 42px;">${prueba}</h3>
          <p>Don’t be shy and ask the community!</p>
          <a href="/new-topic" style="color: #ffffff">
          <button aria-label="Themes" id="ember190" class="themes-tab tab btn-radical active btn full btn-text ember-view" type="button"><span class="d-button-label">Create new topic</span>
          </button>
          </a>
          
          <h3 style="margin-top: 56px;">Any suggestions for improvements?</h3>
          <p>Tell us any ideas, suggestions or possible ways to improve this community.</p>
          <a href="/c/sugerencias-sobre-el-sitio/2">Give us your feedback</a></div>`
        );
      });
      state.renderScheduled = true;
    }
    return "";
  },
});
