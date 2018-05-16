import QuantityComponent from "../../../../components/QuantityComponent";
import { mount } from "@vue/test-utils";

describe("Key event tests", () => {
  it("Quantity is zero by default", () => {
    const wrapper = mount(QuantityComponent);
    expect(wrapper.vm.quantity).toBe(0);
  });

  it("Cursor up sets quantity to 1", () => {
    const wrapper = mount(QuantityComponent);
    wrapper.trigger("keydown.up");
    expect(wrapper.vm.quantity).toBe(1);
  });

  it("Cursor down reduce quantity by 1", () => {
    const wrapper = mount(QuantityComponent);
    wrapper.vm.quantity = 5;
    wrapper.trigger("keydown.down");
    expect(wrapper.vm.quantity).toBe(4);
  });

  it("Escape sets quantity to 0", () => {
    const wrapper = mount(QuantityComponent);
    wrapper.vm.quantity = 5;
    wrapper.trigger("keydown.esc");
    expect(wrapper.vm.quantity).toBe(0);
  });

  it('Magic character "a" sets quantity to 13', () => {
    const wrapper = mount(QuantityComponent);
    wrapper.trigger("keydown", {
      which: 65
    });
    expect(wrapper.vm.quantity).toBe(13);
  });
});
