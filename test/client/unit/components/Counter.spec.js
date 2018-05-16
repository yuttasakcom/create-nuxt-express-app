import { shallowMount } from "@vue/test-utils";
import Counter from "../../../../components/Counter.vue";

describe("Counter.vue", () => {
  const wrapper = shallowMount(Counter);

  it("renders the correct markup", () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>');
  });

  it("has a button", () => {
    expect(wrapper.contains("button")).toBe(true);
  });

  it("button click should increment the count", () => {
    expect(wrapper.vm.count).toBe(0);
    const button = wrapper.find("button");
    button.trigger("click");
    expect(wrapper.vm.count).toBe(1);
  });
});
