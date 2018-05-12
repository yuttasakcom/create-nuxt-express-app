import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  "../components",
  false,
  /[\w-]+\.vue$/
);

requireComponent.keys().forEach(filename => {
  const componentConfig = requireComponent(filename);
  const componentName = upperFirst(
    camelCase(filename.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
