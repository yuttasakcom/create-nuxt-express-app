import { mount } from "@vue/test-utils";
import Test from "../../../../components/Test.vue";

describe("Test", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(Test);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
